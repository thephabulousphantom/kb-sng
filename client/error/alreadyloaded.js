export default class AlreadyLoadedError extends Error {

    constructor(message = "Already loaded.") {

        super(message);
    }
}