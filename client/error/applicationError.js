export default class ApplicationError extends Error {

    constructor(message = "Application error.") {

        super(message);
    }
}