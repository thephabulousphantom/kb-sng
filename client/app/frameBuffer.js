import Frame from "./frame.js";
import NotImplementedError from "../error/notimplemented.js";

export default class FrameBuffer {

    constructor() {

    }

    enqueueCommand(frame, command) {

        throw new NotImplementedError();
    }

    processFrames(targetFrame, processCallback) {

        throw new NotImplementedError();
    }
}