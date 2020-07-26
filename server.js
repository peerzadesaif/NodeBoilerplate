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

process.on("unhandledRejection", code => LoggingService.consoleLog(`SERVER_BACKEND_ERROR", "Uncaught error in ${String(code)}`));

process.on('beforeExit', code => LoggingService.consoleLog(`SERVER_BACKEND_ERROR", "Before server exit error in ${String(code)}`));

process.on('exit', (code) => LoggingService.consoleLog(`SERVER_BACKEND_ERROR", "On server exit error in ${String(code)}`));

server.listen(app.get("port") || 8001, "127.0.0.1");

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
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Server Listening on My custom port ' + bind);
};
server.on('error', onError);
server.on('listening', onListening);
