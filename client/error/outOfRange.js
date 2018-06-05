export default class OutOfRangeError extends Error {

    constructor(message = "Out of range.") {

        super(message);
    }
}