export default class NotLoadedError extends Error {

    constructor(message = "Not loaded.") {

        super(message);
    }
}