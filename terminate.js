
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


module.exports = terminate