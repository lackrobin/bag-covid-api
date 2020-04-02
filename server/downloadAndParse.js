const { db } = require("./db");

const { sheet2arr } = require("./sheet2arr");
const { download } = require("./download");
const FileData = require("./classes/FileData");
const { handleEpiKurve, handleAltersVerteilung, handleKantone, hanldeHospit, handleTod } = require("./dataHandler");
const xlsx = require("xlsx");
const fs = require('fs');
function downloadAndParse() {
  const url = "https://www.bag.admin.ch/dam/bag/de/dokumente/mt/k-und-i/aktuelle-ausbrueche-pandemien/2019-nCoV/covid-19-datengrundlage-lagebericht.xlsx.download.xlsx/200325_Datengrundlage_Grafiken_COVID-19-Bericht.xlsx";
  let date = new Date();
  let month = date.getMonth() + 1;
  month = month.toString.length = 1 ? "0" + month : "" + month;
  let day = date.getDate();
  day = day.toString.length = 1 ? "0" + day : "" + day;
  const dest = `files/${date.getFullYear()}-${month}-${day}.xlsx`;
  console.log("starting download...");

  download(url, dest, function (err) {
    if (err) {
      console.log(err);
    }
    else {
        console.log("download complete!");
        console.log("read files...");
      fs.readdir("files/", (err, filenames) => {
        if (err) {
          console.log(err);
        }
        filenames.forEach(filename => {
            if (filename !== ".gitignore") {
            console.log("processing file: "+ filename);
            let filenameDate = filename.substr(0, 10);
            let data = {};
            let workbook = xlsx.readFile("files/" + filename);
            workbook.SheetNames.forEach(sheetName => {
              let worksheet = workbook.Sheets[sheetName];
              let sheetData = {};
              switch (sheetName) {
                case "COVID19 Epikurve":
                  sheetData = handleEpiKurve(sheet2arr(worksheet));
                  break;
                case "COVID19 Altersverteilung":
                  sheetData = handleAltersVerteilung(sheet2arr(worksheet));
                  break;
                case "COVID19 Kantone":
                  sheetData = handleKantone(sheet2arr(worksheet));
                  break;
                case "COVID19 Altersverteilung Hospit":
                  sheetData = hanldeHospit(sheet2arr(worksheet));
                  break;
                case "COVID19 Altersverteilung TodF":
                  sheetData = handleTod(sheet2arr(worksheet));
                  break;
              }
              data[sheetName] = sheetData;
            });
            let fileData = new FileData(filenameDate, data);
            console.log("processed file: " + filename);
            console.log("saving data from file: " + filename);
            saveToDB(fileData);
          }
        });
      });
    }
  });
}
exports.downloadAndParse = downloadAndParse;

function saveToDB(data) {
  db.put(data.date, JSON.stringify(data), function (err) {
    if (err)
      console.log(err);
    else {
        console.log("saved to db:" + JSON.stringify(data));
    }
  });
}
