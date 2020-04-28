#!/usr/bin/env node
"use strict";

const { Router } = require("express");
const apiRouter = require("./v1/");

module.exports = Router()
	.use("/v1", apiRouter);
