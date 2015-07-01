#!/usr/bin/env nodejs

var program = require('commander')
var packageJson = require('./package.json')
 
program
  .version(packageJson.version)
  .option('--http', 'Log validations to http service')
  .option('-p, --postgres', 'Log validations to postgres')
  .option('-b, --hbase', 'Log validations to HBase')
  .option('-g, --graphite', 'Log validations to Graphite')
  .option('-o, --stdout', 'Log validations to stdout')
  .parse(process.argv);

require('./build/monitor')(program)

