'use strict';

// used to generate the two exported hook functions
function hookWrite(stream) {

    // return a hook function for the stream
    return function hook(callback, passthru) {
        var write = stream.write;

        // when `passthru` is true send the content to stream as well.
        if (passthru) {
            stream.write = function hookedWrite(data, encoding, cb) {
                write.call(stream, data, encoding, cb);
                return callback(data, encoding, cb);
            }
        }

        // when `passthru` is false use the callback directly
        else {
          stream.write = callback;
        }

        return function unhook() {
          stream.write = write;
        }
    }
}

module.exports = {
    // generate hook functions by providing the stream to hook
    stderr: hookWrite(process.stderr),
    stdout: hookWrite(process.stdout)
};
