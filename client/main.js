import log from "./app/log.js";
import * as Pong from "./pong/pong.js";
import Server from "./network/server.js";
import ServerConnectionLocal from "./network/serverConnectionLocal.js";
import Client from "./network/client.js";
import ClientConnectionLocal from "./network/clientConnectionLocal.js";
import Test from "./test/all.js";

function main() {

    log.level = log.severity.debug;

    let server = new Server(new Pong.PongApp(), new ServerConnectionLocal());
    server.start("local");
    server.app.run();

    let client = new Client(new Pong.PongApp(), new ClientConnectionLocal());
    client.join(server);
    client.app.run();

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

    let sceneNameContainer = document.createElement("div");
    sceneNameContainer.id = "SceneNameContainer";
    sceneNameContainer.style.position = "absolute";
    sceneNameContainer.style.zIndex = 10000;
    sceneNameContainer.style.left = 0;
    sceneNameContainer.style.top = 0;
    sceneNameContainer.style.margin = "4px";
    sceneNameContainer.style.padding = "2px 6px 2px 6px";
    sceneNameContainer.style.border = "1px solid #0A0";
    sceneNameContainer.style.background = "#040";
    sceneNameContainer.style.color = "#0F0";
    sceneNameContainer.style.fontFamily = "monospace";
    
    document.body.appendChild(sceneNameContainer);

    client.app.event.on("SceneChanged", (data) => {

        sceneNameContainer.innerHTML = data.scene.name;
    });

    client.send("Hello");
}

Test();

main();