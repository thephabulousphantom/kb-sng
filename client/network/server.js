import log from "../app/log.js";
import App from "../app/app.js";

import Command from "../command/command.js";
import ChangeControl from "../command/changeControl.js";

import ServerConnection from "./serverConnection.js";

import ApplicationError from "../error/applicationError.js";
import NotImplementedError from "../error/notImplementedError.js";

export default class Server {

    /**
     * Constructs the application server.
     * 
     * @param app {App} The app that this server serves. 
     * @param connection {ServerConnection} Connection to use to communicate with clients. 
     */
    constructor(app, connection) {

        this.app = app;
        this.connection = connection;
    }

    /**
     * Starts the game.
     * 
     * @param source {*} Source from which to listen for new client connections. 
     */
    start(source) {

        if (this.connection.listening) {

            throw new ApplicationError("Can't start, already running.");
        }
        
        this.connection.listen(source, this.onClient, this.receive, this);

        log.info(`Started listening to the ${source}.`);
    }

    /**
     * Stops the game.
     */
    stop() {

        if (!this.connection.listening) {

            throw new ApplicationError("Can't stop, not runnong.");
        }

        this.connection.stopListening();

        log.info("Stopped listening.");
    }

    /**
     * Called when a new client connects to the server.
     * 
     * @param clientInfo {*} Information about the client that has connected.
     */
    onClient(clientInfo) {

        log.info(`Client connected: ${JSON.stringify(clientInfo)}`);
    }

    /**
     * Sends a message to a connected client.
     * 
     * @param clientId {*} Identifier of the client to send the message to.
     * @param message {*} Message to send to the client.
     */
    send(clientId, message) {

        this.connection.send(clientId, message);
    }

    /**
     * Broadcasts a message to all connected clients.
     * 
     * @param message {*} Message to broadcast.
     */
    broadcast(message) {

        this.connection.broadcast(message);
    }

    /**
     * Called when a message is received from one from one of the connected clients.
     * 
     * @param clientId {*} Identifier of the client that sent the message.
     * @param message {*} Message that was sent by the client. 
     */
    receive(clientId, message) {

        log.debug(`Message received from the client ${clientId}: ${message}`);

        switch (message.type) {

            case "ControlChanged":
                let frame = message.frame;
                let control = this.app.controls[message.data.name];
                control.value = message.data.value;
                let command = new ChangeControl(control, true);
                this.app.frames.issueCommand(frame, command);
                this.connection.broadcast(message);
                break;
        }
    }

    toString() {

        return `${this.constructor.name} using ${this.connection.constructor.name}`;
    }
}