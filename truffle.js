var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = ""; //put your mnemonic for the account that will deploy the contract to rinkeby here

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/") //enter you API key here
      },
      network_id:4
    }
  }
};