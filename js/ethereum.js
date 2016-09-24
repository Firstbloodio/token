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
  var testnet = false;
  var contractAddr = testnet ? '0xee7f50b87b12138679263f323014e21b9b99cad2' : '0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7';
  var contractQR = testnet ? '' : 'data:image/png;base64,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';
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
            var r = '0x'+responseData.data.signature_payload.r_hex;
            var s = '0x'+responseData.data.signature_payload.s_hex;
            var v = responseData.data.signature_payload.v;
            console.log(r,s,v)
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
