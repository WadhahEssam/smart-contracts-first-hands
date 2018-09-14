
// useful for making asserstions < already in the node modules.
const assert = require('assert'); 

// as long as you start using it , you will get what it does for us.
const ganache = require('ganache-cli');

// this starts with an upper case because it is a constructor that is used to make 
// web3 instances 
const Web3 = require('web3');

// creating a web3 instance and passing it a ganache provider 
// if you want to connect to other networks you will have to 
// change the provider
const web3 = new Web3(ganache.provider());

// use one of the ganache unlocked accounts 
beforeEach(() => {

  // get a list of all the ganache unlocked accouts 
  // web3 has many modules for accessing different types of 
  // networks in this case we used the ( eth ) cuz we are using the 
  // ethereum network module 
  // this is async function so it needs a then  
  web3.eth.getAccounts().then ( fetchedAccounts => {

    // this will print many accounts that can be use for testing 
    // console.log(fetchedAccounts);


  });
  
  // use one of those accounts to deploy the contract :

});

describe('Inbox Contract', () => {
  it('deploys a contract', () => {

  });
});