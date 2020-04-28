#!/usr/bin/env node
"use strict";

const {
	version,
	config,
} = require(`${__dirname}/../package.json`);

module.exports = {
	getVersion,
	getConfig,
};

validateCommands()
	.then(runCommand)
	.catch(exitWithError);

function getVersion () {
	process.stdout.write(`${version}\n`);
}

function getConfig () {
	const str = JSON.stringify(config);
	process.stdout.write(`${str}\n`);
}

function runCommand (cmd, args) {
	module.exports[cmd](...args);
}

function validateCommands () {
	const cmd = process.argv[2];
	const args = process.argv.slice(3);
	const validCommands = Object.keys(module.exports);

	return new Promise((resolve, reject) => {
		if !validCommands.includes(cmd)) {
			return Promise.reject({ cmd, args, validCommands });
		}

		return resolve();

	});
}

function exitWithError ({ cmd, args, validCommands }) {
	console.error(`Invalid command received: ${cmd}`);
	console.error(`with args: ${JSON.stringify(args)}`);
	console.error(`Must provide one of [${validCommands.join(" | ")}]`);

	process.exit(1);
}
