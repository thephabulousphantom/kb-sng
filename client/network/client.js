import log from "../app/log.js";
import App from "../app/app.js";
import ClientConnection from "./clientConnection.js";
import ApplicationError from "../error/applicationError.js";
import NotImplementedError from "../error/notImplementedError.js";

export default class Client {

    /**
     * Constructs the application client.
     * 
     * @param app {App} The application client connects to.
     * @param connection {ClientConnection} The connection to use to communicate with server.
     */
    constructor(app, connection) {

        this.app = app;
        this.connection = connection;
        this.clientId = null;
    }

    /**
     * Joins a running server.
     * 
     * @param target {*} Target server to join.
     */
    join(target) {

        if (this.connection.connected) {

            throw new ApplicationError("Can't join, already in a game. Leave the current game first.")
        }

        this.clientId = this.connection.connect(target, this.receive);

        log.info(`Joined ${target} server as ${this.clientId}`);
    }

    /**
     * Leaves the server.
     */
    leave() {

        if (!this.connection.connected) {

            throw new ApplicationError("Con't leave, not in a game.");
        }

        this.connection.disconnect();

        log.info("Left the server.");
    }

    /**
     * Sends a message to the server. Requires a successful join.
     * 
     * @param messag {*} Message to send to the server. 
     */
    send(message) {

        log.debug(`Sending message to server: ${message}`);
        
        this.connection.send(message);
    }

    /**
     * Called when a message is recevied from the server.
     * 
     * @param message {*} Message received from the server
     */
    receive(message) {

        log.debug(`Received message from server: ${message}`);
    }
}