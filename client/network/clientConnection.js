import log from "../app/log.js";
import ApplicationError from "../error/applicationError.js";
import NotImplementedError from "../error/notImplementedError.js";

export default class ClientConnection {

    /**
     * Constructs a new client connection.
     */
    constructor() {

        this.connected = false;
        this.clientId = null;
        this.messageHandler = null;
        this.target = null;
    }

    /**
     * Connects to a server.
     * 
     * @param target {*} Server to connect to.
     * @param messageHandler {function} Callback to be invoked one a message is received from the server.
     */
    connect(target, messageHandler) {

        if (this.connected) {

            throw new ApplicationError("Can't connected, already connected. Please disconnect first.");
        }

        this.target = target;
        this.messageHandler = messageHandler;
        this.connected = true;

        return undefined;
    }

    /**
     * Disconnects from the server.
     */
    disconnect() {

        if (!this.connected) {

            throw new ApplicationError("Con't disconnect, not connected. Please connect first.");
        }

        this.target = null;
        this.messageHandler = null;
        this.connected = false;
    }

    /**
     * Sends a message to the server. Requires a successfull connect first.
     * 
     * @param message {*} Message to send to the server.
     */
    send(message) {

        if (!this.connected) {

            throw new ApplicationError("Can't sent when not connected.");
        }

        throw new NotImplementedError();
    }
}
