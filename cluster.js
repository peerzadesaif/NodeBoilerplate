const cluster = require('cluster');
const numCPUs = require('os').cpus();

import LoggingService from "@/app/services/LoggingService";


const startCluster = (server, app) => {
    if (cluster.isMaster) {
        LoggingService.consoleLog("SERVER_PROCESS_ID", `This is the master process id: ${process.pid}`)
        numCPUs.map((x) => cluster.fork());
        cluster.on('exit', worker => { LoggingService.consoleLog("SERVER_PROCESS_DIED_ID", `Server Worker process ${process.pid} had died.`); cluster.fork() })
    } else {
        server.listen(app.get("port") || 8001, "127.0.0.1");
    }
}

export default startCluster
