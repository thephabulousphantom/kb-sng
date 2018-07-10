import ApplicationError from "../error/applicationError.js";
import ClientConnection from "./clientConnection.js";
import Server from "./server.js";
import ServerConnectionLocal from "./serverConnectionLocal.js";

export default class ClientConnectionLocal extends ClientConnection {

    constructor() {

        super();
    }

    /**
     * Connects to a local server connection.
     * 
     * @param target {ServerConnectionLocal} Server to connect to. 
     * @param messageHandler {function} Callback to be called once a message is received from the server.
     */
    connect(target, messageHandler, context) {

        if (!(target instanceof Server) || !(target.connection instanceof ServerConnectionLocal)) {

            throw new ApplicationError("Local client connection can only connect to a local server connection.");
        }

        this.clientId = target.connection.connect(this);
        this.target = target;

        super.connect(target, messageHandler, context);

        return this.clientId;
    }

    /**
     * Sends a message to local server connection, by directly invoking its receive method.
     * 
     * @param message {*} Message to send.
     */
    send(message) {

        setTimeout(() => {

            this.target.connection.receive(this.clientId, message);
        }, 0);
    }

    /**
     * Called by local server connection to "send" message to this client.
     * 
     * @param message {*} message 
     */
    receive(message) {

        if (this.messageHandler) {

            this.messageHandler.call(this.context, message);
        }
    }
}