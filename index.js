#!/usr/local/bin/node

require('babel/register')

var program = require('commander');
var packageJson = require('./package.json')
 
program
  .version(packageJson.version)
  .option('-p, --postgres', 'Log validations to postgres')
  .option('-b, --hbase', 'Log validations to HBase')
  .option('-g, --graphite', 'Log validations to Graphite')
  .option('-o, --stdout', 'Log validations to stdout')
  .parse(process.argv);

require('./monitor')(program)

