#!/usr/bin/env node
const program   = require('commander');
const data      = require('./models/data');

program
    .version('1.0.0')
    .description('Node JS CLI K-LINK');

program
    .command('transaksi <user> <bulan>')
    .alias('tr')
    .description('Lihat data Transaksi')
    .action((user, bulan) => {
        data.getTransaksi(user, bulan);
    });

program.parse(process.argv);