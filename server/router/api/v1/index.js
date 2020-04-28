#!/usr/bin/env node
"use strict";

const { Router } = require("express");
const exampleRouter = require("./example.js");
const otherRouter = require("./other.js");

module.exports = Router()
	// .use(validateBearerToken)
	.use("/example", exampleRouter)
	.use("/other", otherRouter);

function validateBearerToken (req, res, next) {
	// TODO: validate token
	
	return next();
}
