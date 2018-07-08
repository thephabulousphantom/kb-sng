import log from "../app/log.js";
import Frame from "./frame.js";
import FrameBufferError from "../error/frameBufferError.js";
import Command from "../command/command.js";

export default class FrameBuffer {

    constructor(maxSize = 3600 ) { // default 1 min buffer @ 60 fps

        this.maxSize = maxSize;
        this.frames = new Array(this.maxSize);
        this.frames[0] = new Frame();
        this.size = 1;
        this._indexOldest = 0;
        this._indexNewest = 0;
    }

    oldest() {

        return this.frames[this._indexOldest];
    }

    newest() {

        return this.frames[this._indexNewest];
    }

    _add() {

        let frame = new Frame(this.newest());
        if (this.size < this.maxSize) {

            this._indexNewest = (this._indexNewest + 1) % this.maxSize;
            this.size++;
        }
        else {

            this._indexNewest = this._indexOldest;
            this._indexOldest = (this._indexOldest + 1) % this.maxSize;
            this.oldest().destroyPrevious();
        }

        this.frames[this._indexNewest] = frame;

        return frame;
    }

    /**
     * 
     * @param frameNumber {int} frameNumber of the frame to get.
     */
    get(frameNumber) {

        if (frameNumber < this.oldest().frameNumber) {

            throw new FrameBufferError(`Can't retrieve frame ${frameNumber} older than the oldest buffered one (${this.oldest().frameNumber}).`);
        }

        if (frameNumber <= this.newest().frameNumber) {

            return this.frames[(this._indexOldest + (frameNumber - this.oldest().frameNumber)) % this.maxSize];
        }

        while (frameNumber > this.newest().frameNumber) {

            this._add();
        }

        return this.newest();
    }

    /**
     * Executes command on a specified frame number.
     * 
     * @param frameNumber {int} frameNumber of the frame to issue the command to.
     * @param command {Command} command to issue to the frame identified by frameNumber.
     */
    execute(frameNumber, command) {

        if (log.level >= log.severity.debug) {

            log.debug(`Executing command: ${JSON.stringify(command)} @ frame ${frameNumber}`);
        }

        let frame = this.get(frameNumber);
        frame.execute(command);

        while (++frameNumber <= this.newest().frameNumber) {

            // ### TODO: if command is byAuthority, probably all subsequent commands
            // can safely be ignored too.

            // ### TODO: Also, duplicate commands (from local client and remote server)
            // might be sent for execution; this should be somehow taken into acoount.

            this.get(frameNumber).processed = false;
        }
    }

    /**
     * 
     * @param frameNumber {int} frameNumber of the frame to process and return state for.
     * @param processor {function (State, Command)} processor to use to process commands in order to determine state.
     */
    process(frameNumber, processor) {
        
        if (frameNumber < this.oldest().frameNumber) {

            throw new FrameBufferError(`Can't process frame ${frameNumber} older than the oldest buffered one (${this.oldest().frameNumber}).`);
        }

        let i = this.oldest().frameNumber; 
        while (i <= frameNumber) {

            let frame = this.get(i++);
            if (!frame.processed) {

                frame.process(processor);
            }

            if (frame.frameNumber == frameNumber) {

                return frame.state;
            }
        }
    }
}
