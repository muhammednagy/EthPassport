# Avoiding common attacks

## Exposed Functions

Contracts can be marked as public when meant to be internal. This can cause unexpected contract execution.

I have mitigated against this risk by:

- Creating tests for all game functions testing accessibility
- Audited contract functions to ensure they are marked correctly

## Logic Bugs

Simple programming bugs can cause unexpected results, especially for edge cases.

I have mitigated against this risk by:

- Creating tests for all game functions ensuring results are correctly returned
- Following Solidity coding standards and general coding best practices
- Avoided overly complex functions and phases

## Exposed secrets

All code and data on the blockchain is public, so data like user info are accessible by anyone. Any confidential data stored is accessible by any party.

I have mitigated against this risk by:

- storing confidential data in a mapping which won't allow anyone to access the data without having the address that owns the data


## Poison Data

If a user tried to access data he doesn't own by passing false arguments he won't be able to.

I have mitigated against this risk by:

- implementing  validations and reverting the transaction on failure

## Tx.origin

The use of `tx.origin` can be dangerous and should not be trusted.

I have mitigated against this risk by:

- using `msg.sender` in place of `tx.origin`

## Circuit breaker

Unexpected things can go wrong. We need to be ready for anything.  Passport informations  are so important so we need to protect them.


I have mitigated against this risk by:

- Implementing the Ownable and Pausable open-zeppelin libraries to provide a layer of control and security