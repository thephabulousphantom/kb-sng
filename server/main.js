var config = require("config");
var log = require("winston");
var http = require("http");
var httpShutdown = require("http-shutdown");
var url = require("url");
var path = require("path");
var express = require("express");
var ws = require("ws");
var assert = require("assert");
var commandLineParser = require("minimist");

class ServerApp {

    initLogging() {

        var commandLine = commandLineParser(process.argv.slice(2));
        var loggingLevel =  typeof(commandLine.severity) != "undefined" ? commandLine.severity : "info";
        log.info("Logging " + loggingLevel + " severity and above...");

        var transports = {
            console: new log.transports.Console({ level: loggingLevel }),
            file: new log.transports.File({ filename: 'server.log', level: loggingLevel })
        };

        log.configure({
            transports: [
                transports.console
                //, transports.file
            ]
        });
    }

    initConfig() {

        log.info("Configuring...");
        
        this.port = config.get("server.port");

        log.info("Configuration done.");
    }

    initAnyKeyToQuit() {

        log.info("Binding console input to server quit...");

        var stdin = process.openStdin();

        try {

            stdin.setRawMode( true );

            log.info("Console input bound to server quit.")
        }
        catch (ex) {

            log.info("Console input not bound to server quit.")
            log.debug(`Unable to set raw standard input mode: ${ex}`);
        }

        stdin.resume();
        stdin.setEncoding("utf8");

        stdin.on("data", (key) => {

            log.info("Keypress detected...");

            this.stop(() => {

                log.info("Quitting...")
                process.exit();
            });
        });
    }

    initWebServer() {

        log.info("Initializing web server...");
        
        this.express = express();
        this.httpServer = http.createServer(this.express);
        httpShutdown(this.httpServer);

        this.express.all("/*", this.onHttpRequest);
        this.express.get("/", function rootRedirect(request, response, next) { response.redirect("/client/"); next(); });
        this.express.get("/client/", express.static(path.join(__dirname, "../client/index.html")));
        this.express.use("/client", express.static(path.join(__dirname, "../client")));

        log.info("Web server initialized.")
    }

    initWebSockets() {

        log.info("Initializing web sockets...");

        this.webSocketServer = new ws.Server({ server: this.httpServer, path: "/websocket" });
        this.webSocketServer.on("connection", this.onWebSocketConnection);

        log.info("Web sockets initialized.");
    }

    constructor() {

        this.initLogging();
        this.initConfig();
        this.initAnyKeyToQuit();
        this.initWebServer();
        this.initWebSockets();
    
        log.info("Server constructed.")
    }

    start() {

        log.info("Server starting...");

        this.httpServer.listen(this.port, (error) => {

            if (error) {

                log.warn(`An error ocurred while attempting to listen to port ${this.port}: ${error}`);
                log.error("Server not started.")

                return;
            }

            log.info(`Listening for HTTP requests on port ${this.port}...`);

            log.info("Server started.")
            
        });
    }

    stop(callback) {

        log.info("Server stopping...");

        this.httpServer.shutdown(callback);

        // TODO: shutdown web socket server and accompanying messaging sessions.

        log.info("Server stoped.");
    }

    onHttpRequest(request, response, next) {

        log.debug(`Incoming request: ${request.url}`);

        next();
    }

    onWebSocketConnection(webSocketConnection, request) {

        try {

            log.debug(`Incoming web socket connection: ${request.url} ...`);

            let query = url.parse(request.url, true).query;
            //var sessionId = query.sessionId;

            webSocketConnection.on("message", this.onWebSocketMessage);
            webSocketConnection.on("close", this.onWebSocketClosed);     
        }
        catch (ex) {

            log.warn(`An error ocurred while accepting web socket connection: ${ex}`);

            webSocketConnection.close();
        }
    }

    onWebSocketMessage(message) {

        log.debug("Incoming web socket message...");
    }

    onWebSocketClosed() {

        log.debug("Web socket closed...");
    }
};

var _server = new ServerApp();
_server.start();