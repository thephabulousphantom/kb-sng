import Frame from "./frame.js";
import Command from "../command/command.js";
import OutOfRangeError from "../error/outOfRange.js";
import NotImplementedError from "../error/notImplemented.js";

export default class FrameBuffer {

    constructor(maxSize = 3600 ) { // default 1 min buffer @ 60 fps

        this.maxSize = maxSize;
        this.frames = new Array(this.maxSize);
        this._indexOldest = 0;
        this._indexNewest = 0;
        this.frames[0] = new Frame();
        this.size = 1;
    }

    _getOldest() {

        return this.frames[this._indexOldest];
    }

    _getNewest() {

        return this.frames[this._indexNewest];
    }

    _add() {

        let frame = new Frame(this._getNewest());
        if (this.size < this.maxSize) {

            this._indexNewest = (this._indexNewest + 1) % this.maxSize;
            this.size++;
        }
        else {

            this._indexNewest = this._indexOldest;
            this._indexOldest = (this._indexOldest + 1) % this.maxSize;
            this._getOldest().destroyPrevious();
        }

        this.frames[this._indexNewest] = frame;

        return frame;
    }

    /**
     * 
     * @param frameNumber {int} frameNumber of the frame to get.
     */
    get(frameNumber) {

        if (frameNumber < this._getOldest().frameNumber) {

            throw new OutOfRangeError(`Can't retrieve frame ${frameNumber} older than the oldest buffered one (${this._getOldest().frameNumber}).`);
        }

        if (frameNumber <= this._getNewest().frameNumber) {

            return this.frames[(this._indexOldest + (frameNumber - this._getOldest().frameNumber)) % this.maxSize];
        }

        while (frameNumber > this._getNewest().frameNumber) {

            this._add();
        }

        return this._getNewest();
    }

    /**
     * 
     * @param frameNumber {int} frameNumber of the frame to issue the command to.
     * @param command {Command} command to issue to the frame identified by frameNumber.
     */
    issueCommand(frameNumber, command) {

        let frame = this.get(frameNumber);
        frame.issueCommand(command);

        while (++frameNumber <= this._getNewest().frameNumber) {

            this.get(frameNumber).processed = false;
        }
    }

    /**
     * 
     * @param frameNumber {int} frameNumber of the frame to process and return.
     * @param processor {function (Map, Command)} processor to use to process commands.
     */
    process(frameNumber, processor) {
        
        if (frameNumber < this._getOldest().frameNumber) {

            throw new OutOfRangeError(`Can't process frame ${frameNumber} older than the oldest buffered one (${this._getOldest().frameNumber}).`);
        }

        let i = this._getOldest().frameNumber; 
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
