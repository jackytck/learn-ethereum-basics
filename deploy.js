require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const INITIAL_STRING = ['Hi there!']

const provider = new HDWalletProvider(
  process.env.MEONIC,
  process.env.RINKEBY
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface)) // init contract
    .deploy({ data: bytecode, arguments: INITIAL_STRING }) // create deploy object
    .send({ from: accounts[0], gas: 1000000 }) // send to network

  console.log('Contract deployed to', result.options.address)
  // Contract deployed to 0xFaa2774B6D579b986a47C97b2E881175a5ae1760
}
deploy()
