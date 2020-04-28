#!/usr/bin/env node
"use strict";

const { Router } = require("express");
const apiRouter = require("./api/");

module.exports = Router()
	.use("/api", apiRouter);
