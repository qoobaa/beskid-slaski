#!/usr/bin/env node

/*global require*/

var exec = require("child_process").exec;

function installPlugin(name) {
    console.log("\033[36m[MO-BILLING]\033[37m Installing plugin: \033[33m" + name + "\033[37m");

    exec("cordova plugin add " + name);
};

var pluginList = [
    "org.apache.cordova.console",
    "org.apache.cordova.device",
    "org.apache.cordova.dialogs",
    "org.apache.cordova.inappbrowser",
    "org.apache.cordova.statusbar",
    "org.apache.cordova.device-orientation",
    "org.apache.cordova.geolocation"
];

console.log("\033[36m[MO-BILLING]\033[37m Install plugins: \033[32mSTART\033[37m");

pluginList.forEach(installPlugin);

console.log("\033[36m[MO-BILLING]\033[37m Install plugins: \033[32mEND\033[37m");
