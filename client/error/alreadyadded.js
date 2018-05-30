export default class AlreadyAddedError extends Error {

    constructor(message = "Already added.") {

        super(message);
    }
}