var EthPassport = artifacts.require("EthPassport");

module.exports = function(deployer) {
  deployer.deploy(EthPassport);
};