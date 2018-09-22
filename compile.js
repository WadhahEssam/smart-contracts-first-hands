const path = require('path');
const fs = require('fs');
const solc = require('solc');

// generating the cross platform path ...
// __dirname is the current directory 
const inboxPath = path.resolve(__dirname, 'contracts' , 'inbox.sol');

// reading the contents of the file using the file system library 
const source = fs.readFileSync(inboxPath , 'utf8');

// compile the ( source ) file > that will output the bytecode and the ABI and 
// many other stuff that we don't care about right now ,
// and in order to make them available to the 
// the rest of the code 
// we will use the module.exports
// in this case we made the moudle.exports exporting 
// only the inbox contract cuz we don't have others
module.exports = solc.compile(source,1).contracts[':Inbox'];


