const https = require("https");
const fs = require('fs');
function download(url, dest, cb) {
    // var file = fs.createWriteStream(dest);
    // https.get(url, function (response) {
    //     response.pipe(file);
    //     file.on('finish', function () {
    //         file.close(cb);
    //     })}).on('error', function (err) {
    //         fs.unlink(dest); 
    //         if (cb)
    //         cb(err.message);
    //     });
    cb();
    }
    exports.download = download;
    ;
    