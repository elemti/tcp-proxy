// tcp-proxy <from>,<to> <from>,<to>

let minimist = require('minimist');
let proxy = require('./proxy');

let argv = minimist(process.argv.slice(2));

let list = argv._;
list
  .map(pair => pair.split(','))
  .forEach(([_from, _to]) => proxy(_from, _to));

console.log(`forwarding ${list.length} ports`);
