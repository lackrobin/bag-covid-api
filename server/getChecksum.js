const crypto = require("crypto");
function getChecksum(input) {
  return new Promise(function (resolve, reject) {
    const hash = crypto.createHash('sha256');
    input.on('error', reject);
    input.on('data', function (chunk) {
      hash.update(chunk);
    });
    input.on('close', function () {
      resolve(hash.digest('hex'));
    });
  });
}
exports.getChecksum = getChecksum;
