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

    setTimeout((function(server, client1) {

        server.start("local");
        server.app.run();

    }).bind(undefined, server), 0);

    let client1 = new Client(new Pong.PongApp(), new ClientConnectionLocal());
    client1.app.event.on("Initializing", () => {
        client1.bindControls({
            "$-Key-Space": client1.app.controls.Enter,
            "$-Key-W": client1.app.controls.PlayerLeftUp,
            "$-Key-S": client1.app.controls.PlayerLeftDown
        });
    });

    let scene1Container = document.createElement("div");
    scene1Container.style.display = "inline-block";
    scene1Container.style.backgroundColor = "#000";
    scene1Container.style.border = "solid 1px #040";
    scene1Container.style.margin = "4px";
    scene1Container.style.width = "320px";
    scene1Container.style.height = "240px";

    document.body.appendChild(scene1Container);

    let scene1NameContainer = document.createElement("div");
    scene1NameContainer.id = "Scene1NameContainer";
    scene1NameContainer.style.display = "inline-block";
    scene1NameContainer.style.position = "relative";
    scene1NameContainer.style.zIndex = 10000;
    scene1NameContainer.style.left = 0;
    scene1NameContainer.style.top = 0;
    scene1NameContainer.style.margin = "4px";
    scene1NameContainer.style.padding = "2px 6px 2px 6px";
    scene1NameContainer.style.border = "1px solid #0A0";
    scene1NameContainer.style.background = "#040";
    scene1NameContainer.style.color = "#0F0";
    scene1NameContainer.style.fontFamily = "monospace";
    
    scene1Container.appendChild(scene1NameContainer);

    client1.app.event.on("SceneChanged", (data) => {

        scene1NameContainer.innerHTML = data.scene.name;
    });

    setTimeout((function(server, client1) {

        client1.join(server);
        client1.send("Hello");
        client1.app.run();

    }).bind(undefined, server, client1), 100);

    // let client2 = new Client(new Pong.PongApp(), new ClientConnectionLocal());
    // client2.app.event.on("Initializing", () => {
    //     client2.bindControls({
    //         "$-Key-Enter": client2.app.controls.Enter,
    //         "$-Key-I": client2.app.controls.PlayerRightUp,
    //         "$-Key-K": client2.app.controls.PlayerRightDown
    //     });
    // });

    // let scene2Container = document.createElement("div");
    // scene2Container.style.display = "inline-block";
    // scene2Container.style.backgroundColor = "#000";
    // scene2Container.style.border = "solid 1px #040";
    // scene2Container.style.margin = "4px";
    // scene2Container.style.width = "320px";
    // scene2Container.style.height = "240px";

    // document.body.appendChild(scene2Container);

    // let scene2NameContainer = document.createElement("div");
    // scene2NameContainer.id = "Scene2NameContainer";
    // scene2NameContainer.style.display = "inline-block";
    // scene2NameContainer.style.position = "relative";
    // scene2NameContainer.style.zIndex = 10000;
    // scene2NameContainer.style.left = 0;
    // scene2NameContainer.style.top = 0;
    // scene2NameContainer.style.margin = "4px";
    // scene2NameContainer.style.padding = "2px 6px 2px 6px";
    // scene2NameContainer.style.border = "1px solid #0A0";
    // scene2NameContainer.style.background = "#040";
    // scene2NameContainer.style.color = "#0F0";
    // scene2NameContainer.style.fontFamily = "monospace";
    
    // scene2Container.appendChild(scene2NameContainer);

    // client2.app.event.on("SceneChanged", (data) => {

    //     scene2NameContainer.innerHTML = data.scene.name;
    // });

    // setTimeout((function(server, client2) {
    
    //     client2.join(server);
    //     client2.app.run();

    // }).bind(undefined, server, client2), 500);
}

Test();

main();