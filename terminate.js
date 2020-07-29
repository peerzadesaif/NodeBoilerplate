
import LoggingService from "@/app/services/LoggingService";
const terminate = (server, options = { coredump: false, timeout: 500 }) => {
    // Exit Function
    const exit = code => (options.coredump ? process.abort() : process.exit());
    return (code, reason) => (error, promise) => {
        LoggingService.consoleLog("SERVER_PROCESS_ERROR", `Process exited with code: ${String(code)}, reason: ${reason}`);
        if (error && error instanceof Error) LoggingService.consoleLog("SERVER_PROCESS_ERROR", `Uncaught Exception: ${String(error.message)}`);
        // if (error && error instanceof Error) console.log(error.message, 'SAIF', error.stack)
        server.close(exit);
        setTimeout(() => exit, options.timeout).unref()
    }
};

// const exitHandler = terminate(server, { coredump: false, timeout: 500 });
// process.on("unhandledRejection", exitHandler(1, 'Unhandled Promise'))
// process.on("uncaughtException", exitHandler(1, 'Unexcepted Error'))
// process.on("SIGTERM", exitHandler(0, 'SIGTERM'))
// process.on("SIGINT", exitHandler(0, 'USIGINT'))

// SAMPLE
// process.on('exit', code => { LoggingService.consoleLog("SERVER_PROCESS_ERROR", `Process exited with code ${String(code)}`) });
// /**
//  * unhandledRejection: Emitted when a Promises rejected and no handler is attached to the promise
//  */
// process.on("unhandledRejection", (reason, promise) => { LoggingService.consoleLog("SERVER_BACKEND_ERROR", `Unhandled rejection at promise: ${promise} reason: ${String(reason)}`); process.exit(1) });
// /**
//  * uncaughtException: Emitted when a Javascript error isn't properly handled
//  */
// process.on("uncaughtException", (error) => { LoggingService.consoleLog("SERVER_BACKEND_ERROR", `Uncaught Exception: ${String(error.message)}`); process.exit(1) });
// /**
//  * SIGTERM: A process monitor will send a SIGTERM signal to successfully terminate a process
//  */
// process.on('SIGTERM', signal => { LoggingService.consoleLog("SERVER_PROCESS_SIGTERM", `SIGTERM: Process ${process.pid} received a SIGTERM signal`); process.exit(0) });
// /**
//  * SIGINT: It's emitted when the process is interrupted (^C)
//  */
// process.on('SIGINT', signal => { LoggingService.consoleLog("SERVER_PROCESS_SIGINT", `SIGINT: Process ${process.pid} has been interrupted`); process.exit(0) });


module.exports = terminate