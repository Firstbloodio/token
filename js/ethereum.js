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
  var contractAddr = testnet ? '0xebb4bdb0075a54d41acd3c819ca67c4b6ee3f276' : '0x0000000000000000000000000000000000000000';
  var contractQR = testnet ? 'data:image/png;base64,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' : '';
  var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"signer","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"testPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"presaleEtherRaised","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateBountyAndEcosystemTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"etherCap","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"changeFounder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"allocateFounderTokens","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ecosystemAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"transferLockup","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"presaleTokenSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"buyRecipient","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"buy","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocation","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"founderInput","type":"address"},{"name":"signerInput","type":"address"},{"name":"startBlockInput","type":"uint256"},{"name":"endBlockInput","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateFounderTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateBountyAndEcosystemTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

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
    $("[data-toggle='tooltip']").tooltip();
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
      // $('#addressSelector').html('<li><a href="javascript:;" class="addressSelect">New address</a></li><li role="separator" class="divider"></li>'+(result.map(function(a){return '<li><a href="javascript:;" class="addressSelect">'+a+'</a></li>'}).join('')));
      $('#addressSelector').html(''+(result.map(function(a){return '<li><a href="javascript:;" class="addressSelect">'+a+'</a></li>'}).join('')));
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
      getEtherRaised(function(err, result){
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
    if (address.slice(0,2)!='0x') {
      address = '0x'+address;
    }
    if (address.length!=42) {
      address = undefined;
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
      var amount = $('#buyAmount').val();
      var data = $('#buyData').val();
      if (!data || data=='') {
        showError('Please generate data first.');
      } else if (!amount || amount<=0) {
        showError("Please specify an amount to buy.");
      } else if (blockNumber<startBlock){
        showError("The crowdsale has not started yet.");
      } else if(blockNumber>=endBlock) {
        showError("The crowdsale is over.");
      } else {
        send(address, pk, undefined, undefined, data, amount, 300000, function(err, result){
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

  $('body').on('click', '#showClickwrap', function (e) {
    if (!address) {
      showError('Please select an Ethereum account first.');
    } else {
      $('#clickwrapModal').modal('show');
    }
  });

  $( "#clickwrap_body1" ).scroll(function() {
    clickwrapWatch();
  });
  $( "#clickwrap_body2" ).scroll(function() {
    clickwrapWatch();
  });
  $( "#clickwrap_agree1" ).change(function() {
    clickwrapWatch();
  });
  $( "#clickwrap_agree2" ).change(function() {
    clickwrapWatch();
  });

  function clickwrapWatch() {
    var area1 = $('#clickwrap_body1');
    var area2 = $('#clickwrap_body2');
    if (((area1.scrollTop() + area1.height()) < area1[0].scrollHeight-4)) {
      $('#clickwrap_submit').prop('disabled', true);
    } else if (((area2.scrollTop() + area2.height()) < area2[0].scrollHeight-4)) {
      $('#clickwrap_submit').prop('disabled', true);
    } else if ($('#clickwrap_agree1').val()=='false') {
      $('#clickwrap_submit').prop('disabled', true);
    } else if ($('#clickwrap_agree2').val()=='false') {
      $('#clickwrap_submit').prop('disabled', true);
    } else {
      $('#clickwrap_submit').prop('disabled', false);
    }
  }

  $('body').on('click', '#clickwrap_submit', function (e) {
      e.preventDefault();
      var area1 = $('#clickwrap_body1');
      var area2 = $('#clickwrap_body2');
      if (((area1.scrollTop() + area1.height()) < area1[0].scrollHeight-4)) {
        showError('Please scroll through and read both agreements.');
      } else if (((area2.scrollTop() + area2.height()) < area2[0].scrollHeight-4)) {
        showError('Please scroll through and read both agreements.');
      } else if ($('#clickwrap_agree1').val()=='false') {
        showError('Please tick both checkboxes.');
      } else if ($('#clickwrap_agree2').val()=='false') {
        showError('Please tick both checkboxes.');
      } else {
        // var signer = '0x76a43315b5e2b16111d1cc8c9fbc377efd432dff';
        // var hash = sha256(new EthJS.Buffer.Buffer(address.slice(2),'hex')).toString();
        // sign(web3, signer, hash, function(err, sig) {
        //   console.log(signer)
        //   console.log(hash)
        //   console.log(sig)
        //   var functionName = 'buy';
        //   var args = [sig.v,sig.r,sig.s];
        //   var data = contract[functionName].getData.apply(null, args);
        //   $('#buyDataGenerate').hide();
        //   $('#buyDataText').show();
        //   $('#buyData').val(data);
        //   $('#clickwrapModal').modal('hide');
        // });
        //TODO: make it work
        var url = 'https://termsofservice.tokenmarket.net/sign';
        var formData = {input_address: address};
        $.post(url, formData, function(data) {
          var sig = '0x'+data.signature;
          var r = sig.slice(0, 66);
          var s = '0x' + sig.slice(66, 130);
          var v = web3.toDecimal('0x' + sig.slice(130, 132));
          if (v!=27 && v!=28) v+=27;
          var functionName = 'buy';
          var args = [sig.v,sig.r,sig.s];
          var data = contract[functionName].getData.apply(null, args);
          $('#buyDataGenerate').hide();
          $('#buyDataText').show();
          $('#buyData').val(data);
          $('#clickwrapModal').modal('hide');
        });
      }
  });

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

  function getEtherRaised(callback) {
    var data = contract['presaleEtherRaised'].getData.apply(null, []);
    var url = 'https://'+(testnet ? 'testnet' : 'api')+'.etherscan.io/api?module=proxy&action=eth_call&to='+contractAddr+'&data='+data+'&tag=latest';
    $.get(url, function(data){
      if (data.result!='Error!' && data.result!='0x') {
        callback(null, web3.toDecimal(data.result));
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

  function sign(web3, address, value, callback) {
    web3.eth.sign(address, value, function(err, sig) {
      if (!err) {
        try {
          var r = sig.slice(0, 66);
          var s = '0x' + sig.slice(66, 130);
          var v = web3.toDecimal('0x' + sig.slice(130, 132));
          if (v!=27 && v!=28) v+=27;
          callback(undefined, {r: r, s: s, v: v});
        } catch (err) {
          callback(err, undefined);
        }
      } else {
        callback(err, undefined);
      }
    });
  }

  function send(addr, pk, functionName, args, dataOverride, amount, gas, callback) {

    if (!addr) {
      callback('Please select an Ethereum account.', undefined);
    } else {

      var gasLimit = web3.toHex(gas);
      var gasPrice = web3.toHex(20000000000);
      var value = web3.toHex(web3.toWei(amount,'Ether'));
      var data = '0x0';
      if (dataOverride) {
        data = dataOverride;
      } else if (functionName && args) {
        data = contract[functionName].getData.apply(null, args);
      }
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
