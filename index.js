'use strict';

var elegantSpinner = require('elegant-spinner');
var logUpdate      = require('log-update');
var chalk          = require('chalk');
var OS             = require('os-family');

module.exports = function createElegantStatus (text) {
    var frame = elegantSpinner();
    var successSymbol = OS.win ? '√' : '✓';
    var errorSymbol = OS.win ? '×' : '✖';
    var animation = setInterval(function () {
        logUpdate(chalk.yellow(frame()) + ' ' + text);
    }, 50);

    animation.unref();

    function done (success) {
        var status = success ?
                     chalk.green(successSymbol) :
                     chalk.red(errorSymbol);

        clearInterval(animation);
        logUpdate(status + ' ' + text);
        console.log();
    }

    done.updateSymbols = function (success, error) {
        if (success) successSymbol = success;
        if (error) errorSymbol = error;
    };

    done.stop = function (clearText) {
        clearInterval(animation);
        if (clearText) logUpdate('');
        console.log();
    };

    done.updateText = function (newText) {
        text = newText;
    };

    return done;
};
