const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const path = require("path");
// Powering realtime experiences
// const pusher = require("pusher");

// ENABLE MODULE ALIAS
import "module-alias/register"
// require("./moduleAliases"); // Testing

// USE CUSTOM MODULES
import * as constant from "@/app/helpers/constant";
const port = constant.config.port || 8001;
import LoggingService from "@/app/services/LoggingService";
import ResponseService from "@/app/services/ResponseService";
import ErrorService from "@/app/services/ErrorService";
import terminate from "@/root/terminate";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || port);
// Static folder
app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));
// view engine
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser());
morgan.token("process-ip", function (req) { return req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || "" });

app.use(morgan(':process-ip - :date - ":method :url HTTP/:http-version" - :status - :res[content-length] - :response-time ms', { stream: { write: function (msg) { return LoggingService.consoleLog("MORGAN", msg) } } }));


app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, safeFileNames: true, abortOnLimit: true }));

app.get("/", function (req, res) {
    throw new ErrorService(404, 'Nothing')
});
app.use(ResponseService.handleError)
app.use(ResponseService.handleError)

// ENABLE OR INITIATE ROUTES
require('@/routes').default(app);

const exitHandler = terminate(server, { coredump: false, timeout: 500 });
/**
 * unhandledRejection: Emitted when a Promises rejected and no handler is attached to the promise
 * uncaughtException: Emitted when a Javascript error isn't properly handled
 * SIGTERM: A process monitor will send a SIGTERM signal to successfully terminate a process
 * SIGINT: It's emitted when the process is interrupted (^C)
 */
process.on('beforeExit', code => { LoggingService.consoleLog("SERVER_PROCESS_ERROR", `Process will exit with code ${String(code)}`); setTimeout(() => process.exit(code), 100) });
process.on("unhandledRejection", exitHandler(1, 'Unhandled Promise'))
process.on("uncaughtException", exitHandler(1, 'Unexcepted Error'))
process.on("SIGTERM", exitHandler(0, 'SIGTERM'))
process.on("SIGINT", exitHandler(0, 'USIGINT'))

// YOUR SERVER IS LISTENING HERE
/**
 * ENABLE IF YOU NEED TO RUN SERVER WITH CLUSTER
 */
!constant.config.runClusterServer ? server.listen(app.get("port") || 8001, "127.0.0.1") : require("@/root/cluster").default(server, app);

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    };
};
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe: ' + addr : 'port: ' + addr.port;
    console.log('process.argv', process.argv)
    console.log(`Server Listening on ${bind} process id: ${process.pid}`);
};
server.on('error', onError);
server.on('listening', onListening);
