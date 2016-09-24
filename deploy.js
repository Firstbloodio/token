var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
var async = require('async');
var ethabi = require('ethereumjs-abi');
var commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
	{ name: 'help', alias: 'h', type: Boolean },
	{ name: 'address', type: String },
	{ name: 'founder', type: String },
	{ name: 'signer', type: String },
  { name: 'start_block', type: Number},
	{ name: 'end_block', type: Number},
	{ name: 'send_immediately', type: Boolean, defaultValue: false},
]);
var cliOptions = cli.parse();

if (cliOptions.help) {
	console.log(cli.getUsage());
} else if (cliOptions.address && cliOptions.founder && cliOptions.signer && cliOptions.start_block && cliOptions.end_block) {

  var web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

  //Config
  var solidityFile = './smart_contract/FirstBloodToken.sol';
  var contractName = 'FirstBloodToken';
	var solcVersion = 'v0.3.6-nightly.2016.8.15+commit.868a167';
  var address = cliOptions.address;
  var founder = cliOptions.founder;
	var signer = cliOptions.signer;
  var constructTypes = ["address", "address", "uint256", "uint256"];
  var constructArguments = [ founder, signer, cliOptions.start_block, cliOptions.end_block ];

	solc.loadRemoteVersion(solcVersion, function(err, solcV) {
		console.log("Solc version:",solcV.version());

	  var abiEncoded = ethabi.rawEncode(constructTypes, constructArguments);
	  console.log('ABI encoded constructor arguments: '+abiEncoded.toString('hex'));

	  fs.readFile(solidityFile, function(err, result){
	    var source = result.toString();
	    var output = solcV.compile(source, 1); // 1 activates the optimiser
	    var abi = JSON.parse(output.contracts[contractName].interface);
	    var bytecode = output.contracts[contractName].bytecode;

	    var contract = web3.eth.contract(abi);
			if (cliOptions.send_immediately) {
				var contractInstance = contract.new(founder, signer, cliOptions.start_block, cliOptions.end_block, {from: address, gas: 4000000, data: bytecode}, function(err, myContract){
		      if(!err) {
						if (myContract.address) {
							console.log(myContract.address);
						}
		      }
		    });
			} else {
				var data = contract.new.getData(founder, signer, cliOptions.start_block, cliOptions.end_block, day_limit, {data: bytecode});
				console.log(data);
			}
	  });
	});
}
