# EthPassport

## Intro
This is part of ConsenSys Academy's 2018 Developer Program.

## What does the project do?
This project solves the problem of  identites by having **everyone** identity stored on the ethereum  blockchain.

# Getting started
## Setup the local environment

Clone the git repository and change to its directory and initialize npm with the following command:
```
git clone https://github.com/muhammednagy/EthPassport.git
cd EthPassport && npm init -y
```
Ensure the following node packages are installed by running the following commands:

- lite-server: `npm install lite-server`
- truffle: `npm install -g truffle`
- truffle-hdwallet-provider: `npm install truffle-hdwallet-provider` - Windows users may need `npm install -g windows-build-tools` if they are experiencing errors
- openzeppelin-solidity: `npm install -E openzeppelin-solidity`

If you are testing the contracts locally start your test RPC client on port 8545, then compile, migrate and test the contracts with: 
```
truffle compile
truffle migrate
truffle test
```
## Running the web interface

The front end interface is run with lite-server for local testing purposes. Use the following command from within the EthPassport directory to run:

`npm run dev`

A browser window should pop up automagically after the command is run pointing to http://localhost:3000, otherwise manually type this address in your preferred browser. Metamask is required to send transactions.


## Remix deployment

If you'd like to play around with the contract head on over to https://remix.ethereum.org/ and paste the code in, ensure you have 0.1 eth in the value when you register.

## We are live on Rinkenby!


Deploy the contract with `truffle migrate --network rinkeby` after configuring the correct mnenomic and API key within truffle.js if you'd like to deploy the contract yourself on the rinkeby test network. This is not required to play on rinkeby. Currently the EthPassport contract is deployed at `0x5679051C3381ea527a71D454593f784b4A67f8A6`

##  How to deploy on Rinkenby

### How to Get an infura key
To get an infura rinkenby api key please head to `https://infura.io/register` then signup then generate a key for rinkeby network

### How to get rinkenby ether

Please post  your address on the social media publicly then  head to `https://faucet.rinkeby.io` and submit the link of  your post/tweet.

### Final step

open `truffle.js` file then update `mnemonic` var with your mnemonic wallet and add your infura Rinkenby key after `https://rinkeby.infura.io/v3/`
then run `truffle migrate --network rinkeby`.
