import * as Pong from "./pong/pong.js";
import Server from "./network/server.js";
import ServerConnectionLocal from "./network/serverConnectionLocal.js";
import Client from "./network/client.js";
import ClientConnectionLocal from "./network/clientConnectionLocal.js";
import Test from "./test/all.js";

Test();

/*let app = new Pong.PongApp();
app.run();*/

let server = new Server(new Pong.PongApp(), new ServerConnectionLocal());
let client = new Client(new Pong.PongApp(), new ClientConnectionLocal());

server.start(null); // source is not used by the local server connection, would be a local address / port to bind to normally.
client.join(server);

client.send("Hello");
