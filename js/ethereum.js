//web3
if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else if (typeof Web3 !== 'undefined') {
  // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  web3 = new Web3();
} else if(typeof web3 == 'undefined' && typeof Web3 == 'undefined') {
}
//testnet check
web3.version.getNetwork(function(err, version){
  //config
  var testnet = version == "2" ? true : false;
  //OVERRIDE:
  testnet = true;
  var contractAddr = testnet ? '0xfb9d5a1b40a7051afd5860d5a584eb26e13e07a5' : '0x0000000000000000000000000000000000000000';
  var contractQR = testnet ? '' : '';
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
        showError('Please generate data first. &#10;请先生成阅读免责条款的数字签名！');
      } else if (!amount || amount<=0) {
        showError('Please specify an amount to buy. '+'<br>'+ ' 请填写您需要兑换的数量！');
      } else if (blockNumber<startBlock){
        showError('The crowdsale has not started yet. ' +'<br>'+ '第一滴血的众筹还未开始。');
      } else if(blockNumber>=endBlock) {
        showError('The crowdsale is over. '+'<br>'+ '对不起，本次众筹已经结束。');
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
      showError('Please select an Ethereum account first. '+'<br>'+ '请在［我的地址］一栏填写一个以太坊的钱包地址！');
    } else {
      $('#clickwrapModal').modal('show');
      var top = $("#right-side").scrollTop();
      $("#right-side").css('position','fixed');
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
    if (((area1.scrollTop() + area1.height()) < area1[0].scrollHeight-4) || ((area2.scrollTop() + area2.height()) < area2[0].scrollHeight-4)) {
      $('#clickwrap_submit').prop('disabled', true);
    } else if ($('#clickwrap_agree1').val()=='false' || $('#clickwrap_agree2').val()=='false' || $('#clickwrap_agree3').val()=='false') {
      $('#clickwrap_submit').prop('disabled', true);
    } else {
      $('#clickwrap_submit').prop('disabled', false);
    }
  }

  $('body').on('click', '#clickwrap_submit', function (e) {
      e.preventDefault();
      var area1 = $('#clickwrap_body1');
      var area2 = $('#clickwrap_body2');
      if (((area1.scrollTop() + area1.height()) < area1[0].scrollHeight-4) || ((area2.scrollTop() + area2.height()) < area2[0].scrollHeight-4)) {
        showError('Please scroll through and read both agreements.');
      } else if ($('#clickwrap_agree1').val()=='false' || $('#clickwrap_agree2').val()=='false' || $('#clickwrap_agree3').val()=='false') {
        showError('Please tick all checkboxes.');
      } else {

        $.ajax({
          type: 'POST',
          url: 'https://termsofservice.tokenmarket.net/sign',
          crossDomain: true,
          data: {"input_address": address},
          dataType: 'json',
          success: function(responseData, textStatus, jqXHR) {
            var sig = '0x'+responseData.data.signature_payload.payload;
            var r = responseData.data.signature_payload.r;
            var s = responseData.data.signature_payload.s;
            var v = responseData.data.signature_payload.v;
            var functionName = 'buy';
            var args = [v, r, s];
            var data = contract[functionName].getData.apply(null, args);
            // $('#buyDataGenerate').hide();
            // $('#buyDataText').show();
            $('#buyData').val(data);
            $('#clickwrapModal').modal('hide');
            var top = $("body").position().top;
            $("#right-side").css('position','relative');
          },
          error: function (responseData, textStatus, errorThrown) {
            console.log("Failed", responseData);
          }
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
