export default class AlreadyRegisteredError extends Error {

    constructor(message = "Already registered.") {

        super(message);
    }
}