export default class AssertionFailedError extends Error {

    constructor(message = "Assertion failed.") {

        super(message);
    }
}