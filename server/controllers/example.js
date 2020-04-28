#!/usr/bin/env node
"use strict";

module.exports = {
	ok
};

async function ok () {
	return Promise.resolve("OK");
}
