//web3
if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else if (typeof Web3 !== 'undefined') {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
} else if(typeof web3 == 'undefined' && typeof Web3 == 'undefined') {
}
//testnet check
web3.version.getNetwork(function(err, version){
  //config
  var testnet = version == "2" ? true : false;

  //OVERRIDE:
  testnet = true;

  var contractAddr = testnet ? '0x0ade51d2e384dd40b6ef39057f280ac6b377a8f7' : '0x0000000000000000000000000000000000000000';
  var abi = [{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"testPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateBountyAndEcosystemTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"etherCap","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"changeFounder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateFounderTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"transferLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"presaleTokenSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"founderInput","type":"address"},{"name":"startBlockInput","type":"uint256"},{"name":"endBlockInput","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateFounderTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateBountyAndEcosystemTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

  //globals
  var contract = web3.eth.contract(abi).at(contractAddr);
  var address;
  var pk;
  var nonce = 0;
  var startBlock;
  var endBlock;

  //display:
  initDisplay(function(){
    updateDisplay();
    setInterval(updateDisplay, 10*1000);
  });

  function showError(msg) {
    alertify.alert('Error', msg, function(){});
  }
  function showInfo(msg) {
    alertify.alert('Message', msg, function(){});
  }

  function initDisplay(callback) {
    $('#buyButton').on("click", buy);
    $('#pkInput').on("change", inputPk);
    getStartBlock(function(err, result){
      startBlock = result;
      getEndBlock(function(err, result){
        endBlock = result;
        callback();
      });
    });
  }

  function updateDisplay() {
    var link = 'https://'+(testnet ? 'testnet.' : '')+'etherscan.io/token/'+contractAddr;
    $('.contractAddr').html('<a href="'+link+'" class="link" target="_blank">'+contractAddr+'</a>');
    $('#pkInput').val(pk);
    web3.eth.getAccounts(function(err, result){
      if (!result) {
        result = [];
      }
      if (address && result.indexOf(address)<0) {
        result.push(address);
      }
      $('#addressSelector').html('<select id="addressSelect" style="width: 300px" class="form-control"><option value="">Select address</option><option value="new">New address</option>'+(result.map(function(a){return '<option value="'+a+'"'+(a == address ? ' selected="selected"' : '')+'>'+a+'</option>'}).join(''))+'</select>');
      $('#addressSelect').on("change", selectAddress);
    });
    getBalance(address, function(err, result){
      $('.balance').html(numeral(web3.fromWei(result,'Ether')).format('0,0.000'));
    });
    getTokenBalance(address, function(err, result){
      $('.balanceToken').html(numeral(web3.fromWei(result,'Ether')).format('0,0.000'));
    });
    getBlockNumber(function(err, result){
      var blockNumber = result;
      if (blockNumber<startBlock-1) { //pre sale
        $('.preSale').show();
        $('.duringSale').hide();
        $('.postSale').hide();
        var startDate = new Date((new Date()).getTime() + (startBlock-blockNumber)*1000*14);
        $('.countdownDesc').html('Crowdsale starts in');
        $('.countdown').countdown(startDate.toString("yyyy/MM/dd HH:mm:ss"), function(event) {
          $(this).text(event.strftime('%D Days %Hh %Mm %Ss'));
        });
      } else if (blockNumber>=startBlock-1 && blockNumber<endBlock) { //during sale
        $('.preSale').hide();
        $('.duringSale').show();
        $('.postSale').hide();
        var blockLength = endBlock - startBlock;
        var priceChanges = [startBlock, startBlock+250, startBlock+1*blockLength/3, startBlock+2*blockLength/3, endBlock];
        var priceIncreases = priceChanges.map(function(x){return Math.round(x)}).filter(function(x){return x>blockNumber});
        console.log(priceChanges)
        console.log(priceIncreases)
        if (priceIncreases.length>0) {
          var priceIncrease = priceIncreases[0];
          $('.priceIncrease').html('.'+priceIncreases);
          var startDate = new Date((new Date()).getTime() + (priceIncrease-blockNumber)*1000*14);
          $('.countdownDesc').html('Next price increase');
          $('.countdown').countdown(startDate.toString("yyyy/MM/dd HH:mm:ss"), function(event) {
            $(this).text(event.strftime('%D Days %Hh %Mm %Ss'));
          });
        }
        getPrice(function(err, result){
          var nextPrices = [170, 150, 133, 117, 100];
          var nextPrice = nextPrices.filter(function(x){return x<result})[0];
          $('.currentPrice').html(numeral(result).format('0,0.000'));
          $('.nextPrice').html(numeral(nextPrice).format('0,0.000'));
        });
      } else { //post sale
        $('.preSale').hide();
        $('.duringSale').hide();
        $('.postSale').show();

      }
      var blockLength = endBlock - startBlock;
      $('.startBlock').html('#'+startBlock);
      $('.endBlock').html('#'+endBlock);
      $('.currentBlock').html('#'+blockNumber);
      getBalance(contractAddr, function(err, result){
        $('.ethRaised').html(numeral(web3.fromWei(result,'Ether')).format('0,0.000'));
      });
      getTotalSupply(function(err, result){
        $('.totalSupply').html(numeral(web3.fromWei(result,'Ether')).format('0,0.000'));
      });
    });
    loadLogs(function(err, result){
      var logs = result;
      console.log(logs)
      $('#myBuys').html('<tbody>'+logs.filter(function(x){return x.name=='Buy' && x.args.sender==address}).map(function(log){return '<tr><td><a href="http://'+(testnet ? 'testnet.' : '')+'etherscan.io/address/'+log.args.sender+'" class="link" target="_blank">'+log.args.sender+'</a> bought '+(numeral(web3.fromWei(log.args.fbt,'Ether')))+' FBT <a href="http://'+(testnet ? 'testnet.' : '')+'etherscan.io/tx/'+log.transactionHash+'" class="link" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></td></tr>'}).join('')+'</tbody>');
    });
  }

  function inputPk() {
    pk = $('#pkInput').val();
    if (pk.slice(0,2)=='0x') {
      pk = pk.slice(2);
    }
    try {
      if (pk.length>0) {
        var fixturekey = new EthJS.Buffer.Buffer(pk, 'hex');
        var fixturewallet = EthJS.Wallet.fromPrivateKey(fixturekey);
        address = '0x'+fixturewallet.getAddress().toString('hex');
      }
    } catch (err) {
      pk = undefined;
      address = undefined;
    }
    updateDisplay();
  }

  function selectAddress() {
    address = $('#addressSelect').val();
    pk = $('#pk').val();
    if (address=='new') {
      var fixturewallet = EthJS.Wallet.generate();
      address = '0x'+fixturewallet.getAddress().toString('hex');
      pk = fixturewallet.getPrivateKey().toString('hex');
    }
    updateDisplay();
  }

  function buy() {
    getBlockNumber(function(err, result){
      var blockNumber = result;
      if (blockNumber<startBlock){
        showError("The crowdsale has not started yet.");
      } else if(blockNumber>=endBlock) {
        showError("The crowdsale is over.");
      } else {
        var amount = $('#buyAmount').val();
        send(address, pk, 'buy', [], amount, 100000, function(err, result){
          if (err) {
            showError(err);
          } else {
            var txHash = result;
            var link = 'https://'+(testnet ? 'testnet.' : '')+'etherscan.io/tx/'+txHash;
            showInfo('You sent a transaction: <a href="'+link+'" class="link" target="_blank">'+txHash+'</a>');
            confirm(result, function(err, result){
              showInfo('Your transaction has been confirmed: <a href="'+link+'" class="link" target="_blank">'+txHash+'</a>');
              setTimeout(function(){updateDisplay()}, 1000);
            })
          }
        });
      }
    });
  }

  //API:

  function getBalance(addr, callback) {
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=account&action=balance&address='+addr+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, data.result);
      } else {
        callback(null, 0);
      }
    });
  }

  function getTokenBalance(addr, callback) {
    var data = contract['balanceOf'].getData.apply(null, [addr]);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, data.result);
      } else {
        callback(null, 0);
      }
    });
  }

  function getTotalSupply(callback) {
    var data = contract['totalSupply'].getData.apply(null, []);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, data.result);
      } else {
        callback(null, 0);
      }
    });
  }

  function getPrice(callback) {
    var data = contract['price'].getData.apply(null, []);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, data.result);
      } else {
        callback(null, 0);
      }
    });
  }

  function getStartBlock(callback) {
    var data = contract['startBlock'].getData.apply(null, []);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, web3.toDecimal(data.result));
      } else {
        callback(null, 0);
      }
    });
  }

  function getEndBlock(callback) {
    var data = contract['endBlock'].getData.apply(null, []);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, web3.toDecimal(data.result));
      } else {
        callback(null, 0);
      }
    });
  }

  function getBlockNumber(callback) {
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_blockNumber';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, web3.toDecimal(data.result));
      } else {
        callback(null, 0);
      }
    });
  }

  function getNextNonce(addr, callback) {
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_GetTransactionCount&address='+addr+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!') {
        callback(null, data.result);
      } else {
        callback(null, 0);
      }
    });
  }

  function loadLogs(callback) {
    var fromBlock = 0;
    var toBlock = 'latest';
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=logs&action=getLogs&address='+contractAddr+'&fromBlock='+fromBlock+'&toBlock='+toBlock;
    function decodeEvent(event) {
      event.blockNumber = web3.toDecimal(event.blockNumber);
      eventAbis = contract.abi.filter(function(eventAbi){return eventAbi.type=='event' && event.topics[0]==web3.sha3(eventAbi.name+'('+eventAbi.inputs.map(function(x) {return x.type}).join()+')')});
      if (eventAbis.length>0) {
        var eventAbi = eventAbis[0];
        event.name = eventAbi.name;
        event.args = {};
        var i = 1;
        var bytes = 0;
        eventAbi.inputs.forEach(function(x){
          if (x.indexed) {
            if (x.type=='address') event.args[x.name] = '0x'+event.topics[i++].slice(-40);
            else if (x.type=='uint256') event.args[x.name] = web3.toDecimal(event.topics[i++]);
          } else {
            if (x.type=='address') {
              event.args[x.name] = '0x'+event.data.slice(2).slice(bytes, bytes+40);
              bytes += 40;
            } else if (x.type=='uint256') {
              event.args[x.name] = web3.toDecimal('0x'+event.data.slice(2).slice(bytes, bytes+64));
              bytes += 64;
            }
          }
        });
        return event;
      }
    }
    $.get(url, function(data){
      var events = data.result.map(function(event){return decodeEvent(event)});
      events.sort(function(a,b){return b.blockNumber-a.blockNumber});
      callback(null, events);
    });
  }

  function send(addr, pk, functionName, args, amount, gas, callback) {

    if (!addr) {
      callback('Please select an Ethereum account.', undefined);
    } else {

      var gasLimit = web3.toHex(gas);
      var gasPrice = web3.toHex(20000000000);
      var value = web3.toHex(web3.toWei(amount,'Ether'));
      var data = contract[functionName].getData.apply(null, args);
      var to = contractAddr;

      getBalance(address, function(err, result){
        if (amount>result) {
          callback('You don\'t have enough funds in your Ethereum account.', undefined);
        } else {

          if (pk) {
            proxySend();
          } else {
            web3Send();
          }

          function web3Send() {
            try {
              web3.eth.sendTransaction({to: to, from: address, value: value, data: data, gas: gasLimit, gasPrice: gasPrice}, function(err, result){
                if (!err) {
                  callback(null, result);
                } else {
                  callback('Failed to send transaction through RPC.', result);
                }
              });
            } catch (err) {
              callback('Failed to send transaction through RPC.', undefined);
            }
          }

          function proxySend() {
            try {
              var privateKey = new EthJS.Buffer.Buffer(pk, 'hex');

              getNextNonce(addr, function(err, nextNonce){
                if (nextNonce>nonce){
                  nonce = nextNonce;
                }
                var rawTx = {
                  nonce: nonce,
                  gasPrice: gasPrice,
                  gasLimit: gasLimit,
                  to: contractAddr,
                  value: value,
                  data: data
                };
                var tx = new EthJS.Tx(rawTx);
                tx.sign(privateKey);
                var serializedTx = tx.serialize().toString('hex');
                var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api';
                $.post(url, {'module': 'proxy', 'action': 'eth_sendRawTransaction', hex: serializedTx}, function(data){
                  nonce++;
                  callback(null, data.result);
                });
              });
            } catch (err) {
              callback('Failed to send transaction through Etherscan.', undefined);
            }
          }

        }
      });
    }

  }

  function confirm(txHash, callback) {
    var url ='https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash='+txHash;
    var confirmed = false;
    async.until(
      function() {
        return confirmed;
      },
      function(callbackUntil) {
        $.get(url, function(data){
          if (data.result) {
            confirmed = true;
          }
          setTimeout(function(){
            callbackUntil(null);
          }, 1*1000);
        });
      },
      function(err){
        callback(null, txHash);
      }
    );
  }
});
