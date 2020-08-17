const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const device = require('express-device');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const storeClient = redis.createClient({ host: constant.config.host, port: 6379, ttl: 260, prefix: 'local:Session' })

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
import deviceUserAgentMiddleware from "@/middleware/deviceUserAgentMiddleware";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || port);
// Static folder
app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));
// view engine
app.set('view engine', 'ejs');
app.use(cors());
app.set('trust proxy', 1); // trust first proxy
storeClient.on("end", (error) => {
    console.log('error :>> ', error);
});
storeClient.on("error", error => {
    console.error('Error :>> ', `Redis connection to ${error.address}:${error.port} failed - connect ${error.code} ${error.address}:${error.port}`);
    app.use(session({ secret: 'Secret_LOL', resave: false, saveUninitialized: true, cookie: { secure: true, maxAge: 60000 } }));
    storeClient.end(true);
});


storeClient.on("ready", async () => {
    app.use(session({
        secret: 'Secret_LOL',
        // create new redis store.
        store: new redisStore({ client: storeClient }),
        saveUninitialized: true,
        resave: false,
        cookie: { secure: true, maxAge: 60000 }
    }));
})

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser('Secret_LOL'));
app.use(device.capture({ parseUserAgent: true }));
morgan.token("process-ip", function (req) { return req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || "" });

app.use(morgan(':process-ip - :date - ":method :url HTTP/:http-version" - :status - :res[content-length] - :response-time ms', { stream: { write: function (msg) { return LoggingService.consoleLog("MORGAN", msg) } } }));

app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, safeFileNames: true, abortOnLimit: true }));

app.use(function (req, res, next) {
    req.app.set('title', 'working')
    console.log('object :>> ');
    next()
});

console.log('deviceUserAgentMiddleware :>> ', deviceUserAgentMiddleware);
app.use(deviceUserAgentMiddleware.setRequestUserDevice)

// ENABLE OR INITIATE ROUTES
require('@/routes').default(app);
app.get("/", function (req, res) {
    // console.log('req.device', req.device)
    // console.log('app.get() :>> ', req.app.get('title'));
    throw new ErrorService(202, 'Successfully')
});

app.use(ResponseService.handleError)

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
!constant.config.runClusterServer ? server.listen(app.get("port") || 8001, constant.config.host) : require("@/root/cluster").default(server, app);

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
    console.log(`Server Listening on ${bind} process id: ${process.pid}`);
};
server.on('error', onError);
server.on('listening', onListening);
