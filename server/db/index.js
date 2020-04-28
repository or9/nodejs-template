#!/usr/bin/env node
"use strict";

const {
	Pool,
	Client,
} = require("pg");

/**
 * pg default connection parameters (no args)
 * PGHOST="localhost"
 * PGUSER=process.env.USER
 * PGDATABASE=process.env.USER
 * PGPASSWORD=null
 * PGPORT=5432
 */

/**
 * Each schema is expected to have a corresponding environment property
 * This property should be uppercase, formatted as "APP_DB_[SCHEMANAME]"
 */

const pgPools = Object.keys(process.env)
	.filter((envKey) => {
		return envKey.startsWith(`APP_DB_`);
	})
	.map((dbEnvKey, index, arr) => {
		const connectionUri = process.env[dbEnvKey].split(":");
		//username:password@host.rds.amazonaws.com:5432/db1"


		const pool = new Pool(`postgresql:\/\/${connectionUri}`);

		return {
			schemaName: dbEnvKey.replace("APP_DB_", ""),
			pool
		};
	})
	.reduce((curr, acc) => {
		curr[acc.schemaName] = acc.pool;
		return curr;
	}, {});

module.exports = {
	pg,
	...pgPools
};
