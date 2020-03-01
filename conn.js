var ref = require("ref");
var ffi = require("ffi");
var Struct = require("ref-struct");

var GoString = Struct({
    p: "string",
    n: "longlong"
});

ext = ".so"
if (process.platform == "darwin") {
    ext = ".dylib"
} else if (process.platform == "win32") {
    ext = ".dll"
}

var conn = ffi.Library("./conn.dylib", {
    Query: [GoString, [GoString]]
});

function goString(jsStr) {
    goStr = new GoString();
    goStr["p"] = jsStr;
    goStr["n"] = jsStr.length;
    return goStr
}

export default function query() {
    return conn.Query(goString("i:ls"))["p"]
}