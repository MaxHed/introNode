const yargs = require('yargs/yargs');

const os = require('os');
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
    .option('workers', {
        demandOption: false,
        default: os.cpus().length,
        describe: 'Le nombre de workers',
        type: 'number'
    })


module.exports = { argv }