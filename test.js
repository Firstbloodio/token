var TestRPC = require("ethereumjs-testrpc");
var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
var async = require('async');
var assert = require('assert');
var BigNumber = require('bignumber.js');

//Config
var solidityFile = 'FirstBloodToken_test.sol';
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

  // it('Increment the block number', function(done) {
  //   //This is stupid but we need testrpc to have the same block number as Ethereum...
  //   var blockNumber = 0;
  //   async.until(
  //     function() { blockNumber>=1000 },
  //     function(callbackUntil) {
  //       console.log('here')
  //       web3.eth.getBlockNumber(function(err, result){
  //         console.log("current block:",err, result);
  //         blockNumber = result;
  //         setTimeout(function(){
  //           callbackUntil();
  //         }, 1*1000);
  //       });
  //     },
  //     function(err) {
  //       console.log('Done');
  //       done();
  //     }
  //   );
  //   // for (var i=0; i<startBlock; i++) {
  //   //   if (i % 10000 == 0) console.log(i);
  //   //   web3.eth.sendTransaction({from: accounts[0], to: accounts[1], value: web3.toWei(1, "ether")}, function(err, result){
  //   //   });
  //   // }
  // });

  it('Set up test cases', function(done){
    var blockNumber = startBlock;
    testCases = [];
    var numBlocks = 10;
    for (i=0; i<numBlocks; i++) {
      var blockNumber = Math.round(startBlock + (endBlock-startBlock)*i/(numBlocks-1));
      var expectedPrice;
      if (blockNumber>endBlock || blockNumber<startBlock) {
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
    async.eachSeries(testCases,
      function(testCase, callbackEach) {
        contract.setBlockNumber(testCase.blockNumber, {from: testCase.account, value: 0}, function(err, result){
          assert.equal(err, null);
          contract.buy({from: testCase.account, value: web3.toWei(amountToBuy, "ether")}, function(err, result){
            assert.equal(err, null);
            contract.balanceOf(testCase.account, function(err, result){
              assert.equal(err, null);
              assert.equal(result.equals(unit.times(new BigNumber(testCase.expectedPrice)).times(new BigNumber(amountToBuy))), true);
              callbackEach();
            });
          });
        });
      },
      function(err) {
        done();
      }
    );
  });

  it('Test buy lock', function(done) {
    contract.buyLock({from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.buyLocked(function(err, result){
        assert.equal(result, true);
        contract.buyUnlock({from: founder, value: 0}, function(err, result){
          contract.buyLocked(function(err, result){
            assert.equal(result, false);
            assert.equal(err, null);
            done();
          });
        });
      });
    });
  });

  it('Test buying when buy locked', function(done) {
    contract.buyLock({from: founder, value: 0}, function(err, result){
      assert.equal(err, null);
      contract.buy({from: accounts[1], value: web3.toWei(1, "ether")}, function(err, result){
        assert.equal(err!=undefined, true);
        done();
      });
    });
  });

  it('Test founder withdraw by hacker', function(done) {
    var hacker = accounts[12];
    var withdrawTo = accounts[12];
    contract.withdraw(withdrawTo, {from: hacker, value: 0}, function(err, result){
      assert.equal(err!=undefined, true);
      done();
    });
  });

  it('Test founder withdraw', function(done) {
    var withdrawTo = accounts[11];
    web3.eth.getBalance(contractAddress, function(err, balance){
      var initialContractEtherBalance = balance;
      web3.eth.getBalance(withdrawTo, function(err, balance){
        var initialBalance = balance;
        contract.withdraw(withdrawTo, {from: founder, value: 0}, function(err, result){
          web3.eth.getBalance(withdrawTo, function(err, balance){
            var finalBalance = balance;
            web3.eth.getBalance(contractAddress, function(err, balance){
              var finalContractEtherBalance = balance;
              assert.equal(err, null);
              assert.equal(finalBalance.minus(initialBalance).equals(initialContractEtherBalance), true);
              assert.equal(finalContractEtherBalance.equals(new BigNumber(0)), true);
              done();
            });
          });
        });
      });
    });
  });

  it('Test founder token allocation too early', function(done) {
    var blockNumber = endBlock + 86400/14 * 366;
    contract.allocateFounderTokens({from: founder, value: 0}, function(err, result){
      assert.equal(err!=undefined, true);
      done();
    });
  });

  it('Test founder token allocation on time', function(done) {
    var expectedFounderAllocation = 7500000;
    var blockNumber = endBlock + 86400/14 * 366;
    contract.balanceOf(founder, function(err, balance){
      var initialFounderBalance = balance;
      contract.setBlockNumber(blockNumber, {from: founder, value: 0}, function(err, result){
        assert.equal(err, null);
        contract.allocateFounderTokens({from: founder, value: 0}, function(err, result){
          contract.balanceOf(founder, function(err, balance){
            var finalFounderBalance = balance;
            assert.equal(err, null);
            assert.equal(finalFounderBalance.minus(initialFounderBalance).equals(unit.times(new BigNumber(expectedFounderAllocation))), true);
            done();
          });
        });
      });
    });
  });

  it('Test founder change by hacker', function(done) {
    var newFounder = accounts[1];
    var hacker = accounts[1];
    contract.changeFounder(newFounder, {from: hacker, value: 0}, function(err, result){
      assert.equal(err!=undefined, true);
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

});
