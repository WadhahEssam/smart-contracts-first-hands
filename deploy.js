const HDWalledProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// you need to pass two arguments to the truffle hd wallet provider.
// first : your mneomnic 
// second : the link of which node you want to connect to
// you can get the link from infura wsbsite.
const provider = new HDWalledProvider(
  'interest route dry word remind argue dinner stomach rebel virtual travel subject',
  'https://rinkeby.infura.io/v3/eefad425f6784d09b0e483759b44d7a6'
);

// this web3 instance now is enabled to do anything with the network 
// exactly like the one we had previously with ganache
const web3 = new Web3(provider);

// there is no reason for making a whole function for this except 
// to use the async and await sayntax.
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Message On Rinkeby'] })
    .send({  from: accounts[0], gas: '2000000' });

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
  
};

deploy();
 