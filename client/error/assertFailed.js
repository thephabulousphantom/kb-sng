export default class AssertFailedError extends Error {

    constructor(message = "Assertion failed.") {

        super(message);
    }
}