const xlsx = require("xlsx");
var sheet2arr = function (sheet) {
  var result = [];
  var row;
  var rowNum;
  var colNum;
  var range = xlsx.utils.decode_range(sheet['!ref']);
  for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    row = [];
    for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
      var nextCell = sheet[xlsx.utils.encode_cell({ r: rowNum, c: colNum })];
      if (typeof nextCell === 'undefined') {
        row.push(void 0);
      }
      else
        row.push(nextCell.w);
    }
    result.push(row);
  }
  return result;
};
exports.sheet2arr = sheet2arr;
