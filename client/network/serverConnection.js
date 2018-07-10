import ApplicationError from "../error/applicationError.js";

let nextClientId = 0;

export default class ServerConnection {

    /**
     * Constructs server connection.
     */
    constructor() {

        this.source = null;
        this.clientHandler = null;
        this.messageHandler = null;
        this.listening = false;
        this.clients = new Map();
    }

    /**
     * Starts listening for new client connections.
     * 
     * @param source {*} Source to start listening for the connections from.
     * @param clientHandler {function} Callback to be called once a new client connects.
     * @param messageHandler {function} Callback to be called once a new message is received from one of the connected clients.
     * @param context {*} context to set "this" to when invoking callbacks.
     */
    listen(source, clientHandler, messageHandler, context) {

        if (this.listening) {

            throw new ApplicationError("Already listening.");
        }

        this.source = source;
        this.clientHandler = clientHandler;
        this.messageHandler = messageHandler;
        this.context = context;
        this.listening = true;
    }

    /**
     * Stops listening for new client connections.
     */
    stopListening() {

        if (!this.listening) {

            throw new ApplicationError("Can't stop, not listening.");
        }

        this.source = null;
        this.clientHandler = null;
        this.messageHandler = null;
        this.context = null;
        this.listening = false;
    }

    /**
     * Sends a message to a connected client.
     * 
     * @param clientId {*} Identifier of the client to send the message to.
     * @param message {*} Message to send to the client.
     */
    send(clientId, message) {

        throw new NotImplementedError();
    }

    /**
     * Sends a message to all connecte clients.
     * 
     * @param message {*} Message to broadcast.
     */
    broadcast(message) {

        let clientIterator = this.clients.values();
        let clientInfo = null;
        while (clientInfo = clientIterator.next().value) {

            this.send(clientInfo.id, message);
        }
    }

    /**
     * Generates next client identifier, to be assigned to a newly connected client.
     */
    generateClientId() {

        // Dumb, replace with GUID or similar, that can't be guessed.
        return nextClientId++;
    }
}