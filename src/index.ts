import * as http from "http";
import path from "path";
import fs from "fs";
import EventEmitter from "events";

import logEvent from "./utils/LogEvent";

const fsPromises = fs.promises;

class Emitter extends EventEmitter {}

//Initialise object

const _emitter = new Emitter();

// Adding listener for log events

const PORT = process.env.PORT || 8080;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(req.url, req.method);
    res.statusCode = 200;
  }
);

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
