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
  var contractQR = testnet ? 'data:image/png;base64,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' : '';
  var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"}],"name":"buyRecipient","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"testPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateBountyAndEcosystemTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"etherCap","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"changeFounder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateFounderTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"transferLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"presaleTokenSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"founderInput","type":"address"},{"name":"startBlockInput","type":"uint256"},{"name":"endBlockInput","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateFounderTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateBountyAndEcosystemTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

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
    $('#addressInput').on("change", inputAddress);
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
    $('.contractAddr').val(contractAddr);
    $('.contractAddrLink').attr('href', link);
    $('.contractQR').html('<img src="'+contractQR+'" />');
    $('#pkInput').val(pk);
    $('#addressInput').val(address);
    new Clipboard('.btn');
    web3.eth.getAccounts(function(err, result){
      if (!result) {
        result = [];
      }
      if (address && result.indexOf(address)<0) {
        result.push(address);
      }
      $('#addressSelector').html('<li><a href="javascript:;" class="addressSelect">New address</a></li><li role="separator" class="divider"></li>'+(result.map(function(a){return '<li><a href="javascript:;" class="addressSelect">'+a+'</a></li>'}).join('')));
      $('.addressSelect').click(function(){
        selectAddress($(this).text());
      });
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

  function inputAddress() {
    address = $('#addressInput').val();
    pk = $('#pkInput').val();
    if (pk.slice(0,2)=='0x') {
      pk = pk.slice(2);
    }
    try {
      if (pk.length>0) {
        var fixturekey = new EthJS.Buffer.Buffer(pk, 'hex');
        var fixturewallet = EthJS.Wallet.fromPrivateKey(fixturekey);
        testAddress = '0x'+fixturewallet.getAddress().toString('hex');
        if (testAddress != address) {
          pk = undefined;
        }
      }
    } catch (err) {
    }
    updateDisplay();
  }

  function selectAddress(addressInput) {
    address = addressInput;
    pk = $('#pk').val();
    if (address=='New address') {
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
