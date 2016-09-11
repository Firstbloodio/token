var request = require('request');

var startDate = new Date('2016-09-26 00:00:00');
var endDate = new Date('2016-10-24 00:00:00');
var currentDate = new Date();
var averageBlockTime = 14;

request('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber', function( err, response, body ) {
  var result = JSON.parse(body).result;
  var currentBlockNumber = parseInt(result, 16);
  var startBlock = currentBlockNumber + (startDate-currentDate)/1000/averageBlockTime;
  var endBlock = currentBlockNumber + (endDate-currentDate)/1000/averageBlockTime;
  console.log('Start block', Math.round(startBlock))
  console.log('End block', Math.round(endBlock));
});
