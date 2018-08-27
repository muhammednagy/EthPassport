# Design pattern decisions

I though about doing a passport project as a very tiny prototype of the fix or the idientites problem.
passports holds the data for each  address and no one can open the data because it'd require the correct key which is the transaction sender address.


Open-Zeppelin Ownable and Pausable libraries are linked to provide a layer of security and control to the smart contract. This allows a selfdestruct function in case it catastrophically goes wrong and needs to die (onlyOwner can run this), and a Pausable function so all contract functions can be paused, creating a circuit breaker function. 
