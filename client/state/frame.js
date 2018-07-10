import State from "./state.js";

export default class Frame {

    constructor(previousFrame = null) {
        
        this.frameNumber = previousFrame === null ? 0 : previousFrame.frameNumber + 1;
        this.commands = new Array();
        this.processed = false;
        this.state = new State();
        this.previousFrame = previousFrame;
    }

    execute(command) {

        // ### TODO: think about completely separating
        // authority and local state. For now, keep just one
        // and maintain byAuthority flag to separate commands
        // that we've issued but server hasn't yet confirmed
        // them and the ones that have come from the server.
        // 
        // if executing a command from the authority (server),
        // check if we're the ones who've issued it - in which
        // case old command should just be marked as validated
        // by the authority instead of processed - otherwise,
        // process command normally.
        //
        // ### TODO: make sure that commands are always processed
        // in the right order. 

        if (command.byAuthority) {

            for (let i = 0; i < this.commands.length; i++) {

                let existingCommand = this.commands[i];
                if (existingCommand.name == command.name && existingCommand.byAuthority == false) {

                    let theSame = true;
                    for (let property in existingCommand) {

                        if (property == "name" || property == "byAuthority") {

                            continue;
                        }

                        theSame = theSame & existingCommand[property].toString() == command[property].toString();
                        if (!theSame) {

                            break;
                        }
                    }

                    if (theSame) {

                        existingCommand.byAuthority = true;
                        return;
                    }
                }
            }
        }

        this.commands.push(command);

        this.processed = false;
    }

    process(processor) {

        if (this.processed) {

            return;
        }

        if (this.previousFrame) {

            this.state = new State(this.previousFrame.state);
            this.state.int("frame", this.frameNumber);
        }

        for (let i = 0; i < this.commands.length; i++) {

            processor.call(this, this.state, this.commands[i]);
        }

        this.processed = true;
    }

    destroyPrevious() {

        if (this.previousFrame === null) {

            return;
        }

        this.previousFrame.frameNumber = null;
        this.previousFrame.commands = null;
        this.previousFrame.processed = null;
        this.previousFrame.state = null;
        this.previousFrame.previousFrame = null;
        
        this.previousFrame = null;
   }
}