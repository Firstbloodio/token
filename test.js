var TestRPC = require("ethereumjs-testrpc");
var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
var async = require('async');
var assert = require('assert');
var BigNumber = require('bignumber.js');

//Config
var solidityFile = './smart_contract/FirstBloodToken_test.sol';
var contractName = 'FirstBloodToken';
var startBlock = 2326762; //9-26-2016 midnight UTC assuming 14 second blocks
var endBlock = 2499819; //10-23-2016 midnight UTC assuming 14 second blocks

describe('Smart contract token test ', function() {
  this.timeout(240*1000);
  //globals
  var web3 = new Web3();
  var contract;
  var contractAddress;
  var accounts;
  var testCases;
  var unit = new BigNumber(Math.pow(10,18));
  var founder;

  before("Initialize TestRPC server", function(done) {
    web3.setProvider(TestRPC.provider({"total_accounts": 20}));
    done();
  });

  before('Get accounts', function(done) {
    web3.eth.getAccounts(function(err, accs) {
      accounts = accs;
      assert.equal(accounts.length, 20);
      done();
    });
  });

  it('Deploy smart contract', function(done) {
    fs.readFile(solidityFile, function(err, result){
      var source = result.toString();
      var output = solc.compile(source, 1); // 1 activates the optimiser
      var abi = JSON.parse(output.contracts[contractName].interface);
      var bytecode = output.contracts[contractName].bytecode;

      contract = web3.eth.contract(abi);
      var hasAddress = false;
      //Put constructor arguments here:
      founder = accounts[0];
      var contractInstance = contract.new(founder, startBlock, endBlock, {from: accounts[0], gas: 4000000, data: bytecode}, function(err, myContract){
        assert.equal(err, null);
        web3.eth.getTransactionReceipt(myContract.transactionHash, function(err, result){
          assert.equal(err, null);
          assert.equal(result!=undefined, true);
          contractAddress = result.contractAddress;
          contract = web3.eth.contract(abi).at(contractAddress);
          if (!hasAddress) done();
          hasAddress = true;
        });
      });
    });
  });

  it('Set up test cases', function(done){
    var blockNumber = startBlock;
    testCases = [];
    var numBlocks = 10;
    for (i=0; i<numBlocks; i++) {
      var blockNumber = Math.round(startBlock + (endBlock-startBlock)*i/(numBlocks-1));
      var expectedPrice;
      if (blockNumber>=startBlock && blockNumber<startBlock+250) {
        expectedPrice = 170;
      } else if (blockNumber>endBlock || blockNumber<startBlock) {
        expectedPrice = 100;
      } else {
        //must use Math.floor to simulate Solidity's integer division
        expectedPrice = 100 + Math.floor(Math.floor(4*(endBlock - blockNumber)/(endBlock - startBlock + 1))*67/4);
      }
      expectedPrice = Math.round(expectedPrice);
      testCases.push(
        {
          blockNumber: blockNumber,
          expectedPrice: expectedPrice,
          account: accounts[i+1]
        }
      );
    }
    console.log(testCases);
    done();
  });

  it('Test price', function(done) {
    async.each(testCases,
      function(testCase, callbackEach) {
        contract.testPrice(testCase.blockNumber, function(err, result){
          assert.equal(err, null);
          assert.equal(result.toNumber(), testCase.expectedPrice);
          callbackEach();
        });
      },
      function(err) {
        done();
      }
    );
  });

  it('Test buy', function(done) {
    var amountToBuy = 3;
    var amountBought = 0;
    web3.eth.getBalance(founder, function(err, result){
      var initialBalance = result;
      async.eachSeries(testCases,
        function(testCase, callbackEach) {
          contract.setBlockNumber(testCase.blockNumber, {from: testCase.account, value: 0}, function(err, result){
            assert.equal(err, null);
            contract.buy({from: testCase.account, value: web3.toWei(amountToBuy, "ether")}, function(err, result){
              assert.equal(err, null);
              amountBought += amountToBuy;
              contract.balanceOf(testCase.account, function(err, result){
                assert.equal(err, null);
                assert.equal(result.equals(unit.times(new BigNumber(testCase.expectedPrice)).times(new BigNumber(amountToBuy))), true);
                callbackEach();
              });
            });
          });
        },
        function(err) {
          web3.eth.getBalance(founder, function(err, result){
            var finalBalance = result;
            assert.equal(finalBalance.minus(initialBalance).equals(unit.times(new BigNumber(amountBought))), true);
            done();
          });
        }
      );
    });
  });

  it('Test buying on behalf of a recipient', function(done) {
    var amountToBuy = web3.toWei(1, "ether");
    contract.setBlockNumber(endBlock-10, {from: accounts[0], value: 0}, function(err, result){
      assert.equal(err, null);
      contract.balanceOf(accounts[2], function(err, result){
        var initialBalance = result;
        contract.buyRecipient(accounts[2], {from: accounts[1], value: amountToBuy}, function(err, result){
          assert.equal(err, null);
          contract.price(function(err, result){
            var price = result;
            contract.balanceOf(accounts[2], function(err, result){
              var finalBalance = result;
              assert.equal(finalBalance.sub(initialBalance).equals((new BigNumber(amountToBuy)).times(price)), true);
              done();
            });
          });
        });
      });
    });
  });

  it('Test halting, buying, and failing', function(done) {
    contract.halt({from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.buy({from: accounts[1], value: web3.toWei(1, "ether")}, function(err, result){
        assert.equal(!err, false);
        done();
      });
    });
  });

  it('Test unhalting, buying, and succeeding', function(done) {
    contract.unhalt({from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.buy({from: accounts[1], value: web3.toWei(1, "ether")}, function(err, result){
        assert.equal(!err, true);
        done();
      });
    });
  });

  it('Test buying after the sale ends', function(done) {
    contract.setBlockNumber(endBlock+1, {from: accounts[0], value: 0}, function(err, result){
      assert.equal(err, null);
      contract.buy({from: accounts[1], value: web3.toWei(1, "ether")}, function(err, result){
        assert.equal(!err, false);
        done();
      });
    });
  });

  it('Test contract balance is zero', function(done){
    web3.eth.getBalance(contractAddress, function(err, balance){
      assert.equal(balance.equals(new BigNumber(0)), true);
      done();
    });
  });

  it('Test bounty and ecosystem allocation', function(done) {
    contract.totalSupply(function(err, result){
      var totalSupply = result;
      var expectedChange = new BigNumber(totalSupply).div(20).add((new BigNumber(2500000)).times(unit));
      var blockNumber = endBlock + 1;
      contract.balanceOf(founder, function(err, balance){
        var initialFounderBalance = balance;
        contract.setBlockNumber(blockNumber, {from: founder, value: 0}, function(err, result){
          assert.equal(err, null);
          contract.allocateBountyAndEcosystemTokens({from: founder, value: 0}, function(err, result){
            contract.balanceOf(founder, function(err, balance){
              var finalFounderBalance = balance;
              assert.equal(err, null);
              assert.equal(finalFounderBalance.minus(initialFounderBalance).equals(new BigNumber(expectedChange)), true);
              done();
            });
          });
        });
      });
    });
  });

  it('Test bounty and ecosystem allocation twice', function(done) {
    contract.allocateBountyAndEcosystemTokens({from: founder, value: 0}, function(err, result){
      assert.equal(!err, false);
      done();
    });
  });

  it('Test founder token allocation too early', function(done) {
    var blockNumber = endBlock + 86400/14 * 366;
    contract.allocateFounderTokens({from: founder, value: 0}, function(err, result){
      assert.equal(!err, false);
      done();
    });
  });

  it('Test founder token allocation on time', function(done) {
    contract.presaleTokenSupply(function(err, result){
      var totalSupply = result;
      var expectedFounderAllocation = new BigNumber(totalSupply).div(10);
      var blockNumber = endBlock + 86400/14 * 366;
      contract.balanceOf(founder, function(err, balance){
        var initialFounderBalance = balance;
        contract.setBlockNumber(blockNumber, {from: founder, value: 0}, function(err, result){
          assert.equal(err, null);
          contract.allocateFounderTokens({from: founder, value: 0}, function(err, result){
            contract.balanceOf(founder, function(err, balance){
              var finalFounderBalance = balance;
              assert.equal(err, null);
              assert.equal(finalFounderBalance.minus(initialFounderBalance).equals(expectedFounderAllocation), true);
              done();
            });
          });
        });
      });
    });
  });

  it('Test founder token allocation twice', function(done) {
    contract.allocateFounderTokens({from: founder, value: 0}, function(err, result){
      assert.equal(!err, false);
      done();
    });
  });

  it('Test founder change by hacker', function(done) {
    var newFounder = accounts[1];
    var hacker = accounts[1];
    contract.changeFounder(newFounder, {from: hacker, value: 0}, function(err, result){
      assert.equal(!err, false);
      done();
    });
  });

  it('Test founder change', function(done) {
    var newFounder = accounts[1];
    contract.changeFounder(newFounder, {from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.founder(function(err, result){
        assert.equal(err, null);
        assert.equal(result, newFounder);
        done();
      });
    });
  });

  it('Test restricted early transfer', function(done) {
    var account3 = accounts[3];
    var account4 = accounts[4];
    var amount = web3.toWei(1, "ether");
    var blockNumber = endBlock + 100;
    contract.setBlockNumber(blockNumber, {from: founder, value: 0}, function(err, result){
      contract.transfer(account3, amount, {from: account4, value: 0}, function(err, result){
        assert.equal(!err, false);
        done();
      });
    });
  });

  it('Test transfer after restricted period', function(done) {
    var account3 = accounts[3];
    var account4 = accounts[4];
    var amount = web3.toWei(1, "ether");
    var blockNumber = Math.round(endBlock + 61*86400/14);
    contract.setBlockNumber(blockNumber, {from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.transfer(account3, amount, {from: account4, value: 0}, function(err, result){
        assert.equal(err, null);
        done();
      });
    });
  });

});
