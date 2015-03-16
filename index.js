'use strict';

module.exports = {
    stderr: function hookStderr(callback, addl) {
        var oldstderr = process.stderr.write;

        process.stderr.write = function hookedStderrWrite(string, encoding, fd) {
			if (addl) {
				oldstderr.apply(process.stderr, arguments);
			}
			callback(string, encoding, fd);
		};

		return function () {
			process.stderr.write = oldstderr;
		};
    },

    stdout: function hookStdout(callback, addl) {
        var oldstdout = process.stdout.write;

        process.stdout.write = function hookedStdoutWrite(string, encoding, fd) {
			if (addl) {
				oldstdout.apply(process.stdout, arguments);
			}
			callback(string, encoding, fd);
		};

		return function () {
			process.stdout.write = oldstdout;
		};
    }
};
