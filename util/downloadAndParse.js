const fs = require('fs');
const xlsx = require("xlsx");

const { db } = require("./db");
const { sheet2arr } = require("./sheet2arr");
const { download } = require("./download");
const { handleEpiKurve, handleAltersVerteilung, handleKantone, hanldeHospit, handleTod } = require("./dataHandler");

const FileData = require("../classes/FileData");

function downloadAndParse() {
  const url = "https://www.bag.admin.ch/dam/bag/de/dokumente/mt/k-und-i/aktuelle-ausbrueche-pandemien/2019-nCoV/covid-19-datengrundlage-lagebericht.xlsx.download.xlsx/200325_Datengrundlage_Grafiken_COVID-19-Bericht.xlsx";
  let date = new Date();
  let month = date.getMonth() + 1;
  month = month.toString().length === 1 ? "0" + month : "" + month;
  let day = date.getDate();
  day = day.toString().length === 1 ? "0" + day : "" + day;
  const filename = `${date.getFullYear()}-${month}-${day}.xlsx`;
  const dirname = "files/";
  const dest = `${dirname}${filename}`;
  console.log("starting download...");
  download(url, dest, function (err) {
    if (err) {
      console.log(err);
    }
    else {
        console.log("download complete!");
        parseFile(filename);
    }
  });
}

function copyFilesToFolder(srcDir, targetDir, cb){
  console.log(`copy files from ${srcDir} ro ${targetDir}`);
  fs.readdir(targetDir, (err, filenames) => {
    if (err) {
      console.log(err);
    }
    else{
      if(filenames.length<=1){
        fs.readdir(srcDir, (err, filenames) => {
          filenames.forEach((filename) => {fs.copyFile(srcDir+filename,targetDir+filename, (err) => {
            if (err) console.log(err);
          });
        });
        cb();
        });
      }
    }    
  })
    
  
}

function parseAllFiles(dirname) {
  console.log("processing dir: "+ dirname);
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      console.log(err);
    }
    else {
      filenames.forEach(parseFile);
    }
  });
}

function parseFile(filename) {
    if (filename !== ".gitignore") {
      console.log("processing file: " + filename);
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
  }


function saveToDB(data) {
  db.put(data.date, JSON.stringify(data), function (err) {
    if (err)
      console.log(err);
    else {
      console.log("saved to db:" + JSON.stringify(data.date));
    }
  });
}

module.exports = {
  downloadAndParse,
  parseAllFiles,
  copyFilesToFolder
}