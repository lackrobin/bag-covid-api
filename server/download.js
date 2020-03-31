const { getChecksum } = require("./getChecksum");
const https = require("https");
const fs = require('fs');
function download(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   https.get(url, function (response) {
//     response.pipe(file);
//     file.on('finish', function () {
//       getChecksum(file)
//         .then(function(hash){fs.rename("files/file.xlsx", `files/${hash}.xlsx`,function(err) {
//             if ( err ) console.log('ERROR: ' + err);
//             else file.close(cb);
//         })})
//         .catch(console.error);
//     });
//   }
//   ).on('error', function (err) {
//     fs.unlink(dest); 
//     if (cb)
//       cb(err.message);
//   });
cb();
}
exports.download = download;
;
