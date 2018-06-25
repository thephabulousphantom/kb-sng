import * as Pong from "./pong/pong.js";
import Server from "./network/server.js";
import ServerConnectionLocal from "./network/serverConnectionLocal.js";
import Client from "./network/client.js";
import ClientConnectionLocal from "./network/clientConnectionLocal.js";
import Test from "./test/all.js";

function main() {

    let server = new Server(new Pong.PongApp(), new ServerConnectionLocal());
    server.start(null); // source is not used by the local server connection, would be a local address / port to bind to normally.
    server.app.run();

    let client = new Client(new Pong.PongApp(), new ClientConnectionLocal());
    client.app.event.on("Initializing", () => {
        client.bindControls({
            "$-Key-Space": client.app.controls.Enter,
            "$-Key-Enter": client.app.controls.Enter,
            "$-Key-W": client.app.controls.PlayerLeftUp,
            "$-Key-S": client.app.controls.PlayerLeftDown,
            "$-Key-I": client.app.controls.PlayerRightUp,
            "$-Key-K": client.app.controls.PlayerRightDown
        });
    });
    client.join(server);
    client.app.run();

    client.send("Hello");
}

Test();

main();