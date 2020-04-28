import { cpus } from "os";

export default {
	files: [
		"!dist/**/*",
		"!node_modules/**/*",
	],
	cache: true,
	concurrency: cpus.length,
	failFast: true,
	failWithoutAssertions: true,
	environmentVariables: {},
	tap: false,
	verbose: false,
	compileEnhancements: true,
	require: [],
	babel: {
		extensions: [
			"js",
			"jsx",
			"vue",
		],
		testOptions: {
			babelrc: false,
		}
	}
};
