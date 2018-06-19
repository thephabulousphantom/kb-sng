import State from "./state.js";

export default class Frame {

    constructor(previousFrame = null) {
        
        this.frameNumber = previousFrame === null ? 0 : previousFrame.frameNumber + 1;
        this.commands = new Array();
        this.processed = false;
        this.state = new State();
        this.previousFrame = previousFrame;
    }

    issueCommand(command) {

        this.commands.push(command);

        this.processed = false;
    }

    process(processor) {

        if (this.processed) {

            return;
        }

        if (this.previousFrame) {

            this.state = new State(this.previousFrame.state);
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