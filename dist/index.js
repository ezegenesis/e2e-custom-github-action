module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(63);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 63:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(898);
const github = __webpack_require__(654);
const exec = __webpack_require__(674);

try {
  const SLACK_CLIENT_ID = core.getInput('slack_client_id');
  const SLACK_CLIENT_SECRET	= core.getInput('slack_client_secret');
  const SLACK_VERIFICATION_TOKEN = core.getInput('slack_verification_token');
  const SLACK_AUTH_TOKEN = core.getInput('slack_auth_token');

  exec.exec(`yarn`)
    .then(() => exec.exec(`yarn global add expo-cli`))
    .then(() => exec.exec(`yarn global add firebase-tools`))
    .then(() => exec.exec(`yarn run expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}`))
    .then(() => exec.exec(`yarn build:android`))
    .then(() => exec.exec(`tail -n 2 ./output.txt | head -n 1 | cut -c47- | xargs wget -O build.apk`))
    .then(() => exec.exec(`firebase appdistribution:distribute ./build.apk --app ${FIREBASE_ANDROID_APP_ID} --groups internal --token ${FIREBASE_TOKEN}`))
    .catch(e => core.setFailed(e));
    
} catch (error) {
  core.setFailed(error.message);
}


/***/ }),

/***/ 654:
/***/ (function() {

eval("require")("@actions/github");


/***/ }),

/***/ 674:
/***/ (function() {

eval("require")("@actions/exec");


/***/ }),

/***/ 898:
/***/ (function() {

eval("require")("@actions/core");


/***/ })

/******/ });