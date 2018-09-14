
// useful for making asserstions < already in the node modules.
const assert = require('assert'); 

// as long as you start using it , you will get what it does for us.
const ganache = require('ganache-cli');

// this starts with an upper case because it is a constructor that is used to make 
// web3 instances 
const Web3 = require('web3');

// getting the ABI and the bytecode from the compile.js that we made to comile our contract
const { interface, bytecode } = require('../compile');
  
// this message will be passed to the constructor of the contract.
const INITIAL_MESSAGE = 'Hi there!';

// this message will be passed to the setMessage() function for testing  
const NEW_MESSAGE = 'bye!';

// creating a web3 instance and passing it a ganache provider 
// if you want to connect to other networks you will have to 
// change the provider
const web3 = new Web3(ganache.provider());

// use one of the ganache unlocked accounts 
let accounts; 
let inbox ;
beforeEach( async () => {

  // get a list of all the ganache unlocked accouts 
  // web3 has many modules for accessing different types of 
  // networks in this case we used the ( eth ) cuz we are using the 
  // ethereum network module 
  // this is async function so it needs a then  
  accounts = await web3.eth.getAccounts()
 
  // this will print many accounts that can be use for testing 
  // console.log(accounts);

  // use one of those accounts to deploy the contract 
  // FIRST LINE >>>>>
  // Contract > constructor to create and deploy new contracts 
  // you pass it the ABI ( JSON.parse > to convert from JSON to javascript object )
  // this line tells nothing but that there is a contract with this ABI
  // SECOND LINE >>>>
  // deploy > this is what tells web3 that you want to deploy this contract 
  // and it takes a an object that has the byte code as a data , 
  // and the arguments that will be passesd to the constructor as an array 
  // with the 'arguments' attibute ( one to one mapping ) 
  // calling deploy doesn't actually deploy anything 
  // but it prepares the contract to be deployed
  // THIRD LINE >>>>
  // send > this is the function that well actually deploy the contract to the 
  // network that was supplied by the provider 
  // MORE >>>>
  // the inbox object that we just created represents the object that is deployed 
  // and we can call functions on it 
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send( { from: accounts[0], gas: '1000000', });

});

describe('Inbox Contract', () => {
  it('deploys a contract', () => {

    // printing the inbox contract that we just deployed 
    // console.log(inbox);

    // in order to make sure that our contract is depolyed correctly
    // we should make sure that the contract has an address that is 
    // assigned to it , so this test will fail if the value of address
    // i null or undefined
    assert.ok(inbox.options.address);
 
  });

  it('has a default message', async () => {
    // methods > contains all the public functions that 
    // our contract contains 
    // message() > this function takes the arguments that the 
    // message function of the inbox contract requires.
    // call() > this function takes costumization of the function 
    // call , so if for example this was a transaction and not a
    // function call , we will have to specify how much gas to use ,
    // and who is going to pay for this transaction 
    const message = await inbox.methods.message().call(); 
    assert.equal(message, INITIAL_MESSAGE);
  });

  it('can set a new message', async () => {
    // since what we are going now is not a function call but 
    // sending a transaction , that is why we use the .send() 
    // make sure that you don't confuse between and between the one 
    // we used when deploying the contract 
    // send takes the account which is making the transaction as the from 
    // attribute , and also this account will be paying the fees 
    // if this line of code didn't work for any reason it is going to throw
    // an error which is going to lead to the failure of the test
    // so we don't have to assert it. 
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });

    // checking that contract has the new message by calling message() function 
    const newMessage = await inbox.methods.message().call(); 
    assert.equal(newMessage, NEW_MESSAGE);

  });

}); 