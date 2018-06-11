export default class CallbackMissingError extends Error {

    constructor(message = "Callback missing.") {

        super(message);
    }
}