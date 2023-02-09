// require('dotenv').config()


const yargs = require('yargs/yargs');
const { argv } = yargs(process.argv.slice(2))
    .option('port', {
        demandOption: false,
        default: 8000,
        describe: 'Le port sur lequel le serveur écoute',
        type: 'number'
    })
    .option('address', {
        demandOption: false,
        default: '127.0.0.1',
        describe: 'L\'adresse sur laquelle le serveur écoute',
        type: 'string'

    })


const { port, address } = argv;

const cluster = require('cluster');
const os = require('os');
const { log } = require('console');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        
    }
    cluster.on('exit', (slave, code, signal) => {
        console.log(`Worker ${slave.process.pid} died`);
    }
    );
} else {
    const app = require('./app');
    console.log(`Worker ${process.pid} started`);
    app.listen(port, address, () => {
        console.log(`Serveur en écoute sur le ${address}:${port}`)
    })
}


