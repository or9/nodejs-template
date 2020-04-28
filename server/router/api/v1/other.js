#!/usr/bin/env node
"use strict";

const { basename } = require("path");
const { Router } = require("express");
const ctrl = require(`${process.env.PWD}/server/controllers/other.js`);

const BASE_FILE_NAME = basename(process.argv[0]);

module.exports = Router()
	.use(restrictAccess)

	/**
	 * @api /api/v1/other/ooo Get example response via POST
	 * @apiName ooother
	 * @apiGroup Example
	 */
	.post(`/ooo`, (req, res) => {
		res.status(200).send("OK ooo");
	})

function restrictAccess (req, res, next) {
	// TODO: route specific access restrictions
	
	return next();
}
