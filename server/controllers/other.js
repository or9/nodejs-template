#!/usr/bin/env node
"use strict";

module.exports = {
	ok,
};

function ok () {
	return new Promise((resolve, reject) => {
		setTimeout(resolve("OK"), 100);
	});
}
