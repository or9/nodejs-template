#!/usr/bin/env node
"use strict";

const { basename } = require("path");
const { Router } = require("express");
const ctrl = require(`${process.env.PWD}/server/controllers/example.js`);

const BASE_FILE_NAME = basename(process.argv[0]);

module.exports = Router()
	.use(restrictAccess)

	/**
	 * @api /api/v1/example/ex Get example response
	 * @apiName example
	 * @apiGroup Example
	 */
	.get(`/ex`, (req, res) => {
		res.status(200).send("OK example");
	})

function restrictAccess (req, res, next) {
	// TODO: route specific access restrictions
	
	return next();
}
