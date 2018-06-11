export default class FrameBufferError extends Error {

    constructor(message = "Frame or FrameBuffer error.") {

        super(message);
    }
}