import ApplicationError from "../error/applicationError.js";
import ServerConnection from "./serverConnection.js";
import ClientConnectionLocal from "./clientConnectionLocal.js";

export default class ServerConnectionLocal extends ServerConnection {

    constructor() {

        super();
    }

    listen(source, clientHandler, messageHandler, context) {

        if (source != "local") {

            throw new ApplicationError("Local server connection can only listen to \"local\".");
        }

        super.listen(source, clientHandler, messageHandler, context);
    }

    /**
     * Called by local client connection to connect to this server.
     * 
     * @param clientConnectionLocal {ClientConnectionLocal} Local client connection connecting to this local server.
     */
    connect(clientConnectionLocal) {

        let clientInfo = {
            id: this.generateClientId(),
            info: clientConnectionLocal
        };

        this.clients.set(clientInfo.id, clientInfo);
        this.clientHandler.call(this.context, clientInfo);

        return clientInfo.id;
    }

    /**
     * Sends a message to local client connection by directly invoking it's receive method.
     * 
     * @param clientId {*} Id of the client to send the message to.
     * @param message {*} Message to be sent to the client.
     */
    send(clientId, message) {

        if (!this.clients.has(clientId)) {

            throw new ApplicationError(`Can't send to non connected client ${clientId}.`)
        }

        let clientInfo = this.clients.get(clientId);

        setTimeout(() => {

            clientInfo.info.receive(message);
        }, 0);
    }

    /**
     * Called by local client connection to send a message to this server.
     * 
     * @param clientId {*} Id of the client sending the message.
     * @param message {*} Message sent by the client.
     */
    receive(clientId, message) {

        if (!this.clients.has(clientId)) {

            throw new ApplicationError(`Can't receive from a non connected client ${clientId}.`)
        }

        this.messageHandler.call(this.context, clientId, message);
    }
}