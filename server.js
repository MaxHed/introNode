// require('dotenv').config()

const cluster = require('cluster');

const os = require('os');
const logger = require('./logger');
 
const { 
    argv: { port, address, workers },
} = require('./cli')

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < workers; i++) {
        cluster.fork();

    }
    cluster.on('exit', (slave, code, signal) => {
        logger.info(`Worker ${slave.process.pid} died`);
    }
    );
} else {
    const app = require('./app');
    console.log(`Worker ${process.pid} started`);
    app.listen(port, address, () => {
        logger.info(`Serveur en écoute sur le ${address}:${port}`)
    })
}


