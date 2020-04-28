#!/usr/bin/env node
"use strict";

const server = require("./server/index.js");
const isRunningFromShell = require.main === module;

if (isRunningFromShell) {
	const func = process.argv[2];
	const args = process.argv.slice(3);

	server[func](...args);
}

module.exports = server;

