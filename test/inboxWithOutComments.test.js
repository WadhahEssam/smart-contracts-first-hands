const Web3 = require('web3');
const ganache = require('ganache-cli');
const assert = require('assert');
const { interface, bytecode } = require('../compile');

const INITIAL_MESSAGE = 'HEY';
const NEW_MESSAGE = 'BYE';

const web3 = new Web3(ganache.provider());

let accounts, inbox;
beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE], })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox Widthout Comments Contract', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has an initial message', async () => {
    const initialMessage = await inbox.methods.message().call();
    assert.equal(initialMessage, INITIAL_MESSAGE);
  });

  it('can change message', async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
    const newMessage = await inbox.methods.message().call();
    assert.equal(newMessage, NEW_MESSAGE);
  });
});
