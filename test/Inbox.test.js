const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const provider = ganache.provider()
const web3 = new Web3(provider)

const { interface, bytecode } = require('../compile')

let accounts
let inbox
const INITIAL_STRING = ['Hi there!']

beforeEach (async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // init contract
    .deploy({ data: bytecode, arguments: INITIAL_STRING }) // create deploy object
    .send({ from: accounts[0], gas: 1000000 }) // send to network

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_STRING)
  })

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})
