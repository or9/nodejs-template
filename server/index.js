#!/usr/bin/env node
"use strict";

const { createServer } = require("http");
const pkg = require("../package.json");
const express = require("express");
const bearerToken = require("express-bearer-token");
const bodyParser = require("body-parser");
const compression = require("compression");
const rid = require("connect-rid");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const csurf = require("csurf");
const errorhandler = require("errorhandler");
const morgan = require("morgan");
//const multer = require("multer"); // if you need uploads...
const responseTime = require("response-time");
const serveIndex = require("serve-index");

const router = require("./router/");

const port = process.env.APP_HTTP_PORT;

var httpServer;

const app = express()
	.set(`trust proxy`, true)
	.set(`json spaces`, 0)
	.use(bearerToken())
	.use(bodyParser.json())
	.use(bodyParser.raw())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(responseTime())
	.use(compression())
	.use(rid())
	.use(cookieParser(process.env.APP_SESSION_KEY))
	.use(cookieSession({
		name: `${pkg.name}-{pkg.version}.cookie.session`,
		keys: [process.env.APP_SESSION_KEY],
		secret: process.env.APP_SESSION_KEY,
		maxAge: 12 * 60 * 60 * 1000, // 12 hours
		secure: true,
	}))
	.use(cors({
		origin (origin, callback) {
			// TODO: determine whitelist.
			// // const whitelist = process.env.APP_CORS_WHITELIST.split(",")
			return callback(null, true);
			// if (whitelist.indexOf(origin) !== -1 || !origin) {
			// 	return callback(null, true);
			// } else {
			// 	return callback(new Error("Not allowed by CORS policy");
			// }
		},
		optionsSuccessStatus: 200,
	}))
	//.use(csurf())
	.use("/favicon.ico", (req, res) => res.status(200).end())
	.use(morgan(`combined`, {
		skip: (req, res) => res.statusCode < 400,
	}))
	.use(morgan(`dev`, {
		skip: (req, rse) => res.statusCode > 399,
	}))
	//.use(errorhandler())
	//.options(`*`, cors())
	.use("/doc",
		express.static(`${__dirname}/../doc`),
		serveIndex(`${__dirname}/../doc`))
	.use(`/`, router)

module.exports = {
	app,
	start,
	stop,
};

process.on(`exit`, shutdown);
process.on(`uncaughtException`, shutdown);
process.on(`SIGTERM`, shutdown);

function start () {
	return new Promise((resolve, reject) => {
		console.info("starting server at port", port);

		httpServer = createServer(app)
		.listen(port, `0.0.0.0`, () => {
			console.table({
				Application: [
					pkg.name,
					pkg.version
				],
				Server: [
					httpServer.address().address,
					httpServer.address().port
				]
			});
		})
		.on(`exit`, shutdown)
		.on(`SIGTERM`, shutdown)
	});
}

function stop () {
	return new Promise((resolve, reject) => {
		console.info("Stopping server");

		httpServer.on("close", resolve);
		httpServer.close();
	});
}

function shutdown () {
	if (httpServer) {
		httpServer.close();
	}

	if (arguments[1] === "uncaughtException") {
		console.error("@app~shutdown error", arguments);
		process.exit(1);
	} else {
		console.info("@app~shutdown", arguments);
		process.exit(0);
	}
}
