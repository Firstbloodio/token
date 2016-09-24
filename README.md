# FirstBlood Initial Coin Offering Ethereum smartcontract

This is the code for the Ethereum smartcontract responsible for [FirstBlood](https://firstblood.io) crowdsale.

## Tests

To run tests, first install mocha and Ethereum test dependencies:

    npm install

Then, launch a testrpc client:

    node_modules/.bin/testrpc --port 12345

Then, run the test framework:

    node_modules/.bin/mocha test

## Contract and security analysis

You can [read through commented contract Solidity source code](https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol).

## Security analysis notes

[Price curve test](https://github.com/Firstbloodio/token/issues/2)

[Found issues](https://github.com/Firstbloodio/token/issues/7)

[Final acceptance process](https://github.com/Firstbloodio/token/issues/3)
