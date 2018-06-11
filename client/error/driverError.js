export default class DriverError extends Error {

    constructor(message = "Driver error.") {

        super(message);
    }
}