const { sheet2arr } = require("./sheet2arr");
const { download } = require("./download");
const  FileData  = require("./classes/FileData");
const { handleEpiKurve,handleAltersVerteilung,handleKantone,hanldeHospit,handleTod} = require("./dataHandler");

const express = require("express");
const xlsx = require("xlsx");
const level = require("level");
const fs = require('fs');

const url = "https://www.bag.admin.ch/dam/bag/de/dokumente/mt/k-und-i/aktuelle-ausbrueche-pandemien/2019-nCoV/covid-19-datengrundlage-lagebericht.xlsx.download.xlsx/200325_Datengrundlage_Grafiken_COVID-19-Bericht.xlsx";

let date = new Date();

let month = date.getMonth()+1;
month = month.toString.length = 1 ? "0"+month : ""+month;
let day = date.getDate();
day = day.toString.length = 1 ? "0"+day : ""+day;

const dest = `files/${date.getFullYear()}-${month}-${day}.xlsx`

var db = level("node-db");

//TODO -- Timebased, maybe at 12:00 each day?
download(url, dest, function(err){
  if (err) {console.log(err)}

  else {
    fs.readdir("files/", (err, filenames) => {    
      if (err) {console.log(err)}
      filenames.forEach(filename => {
        if(filename !== ".gitignore"){
          
          let filenameDate = filename.substr(0,10);
          let data ={};

          let workbook = xlsx.readFile("files/"+filename);
          workbook.SheetNames.forEach(sheetName => {
            let worksheet = workbook.Sheets[sheetName];
            let sheetData = {};
            switch (sheetName){
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
            data[sheetName]=sheetData;
          })
          let fileData = new FileData(filenameDate,data);
          saveToDB(fileData);
        }
    });
    
  });
}
});

const app = express();
const port = 3000;


app.use(express.json());
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api", (req, res) =>
  res.send(JSON.stringify({
    api: [
      {
        endpoint: "/data",
        requestType: "get",
        description: "get all data"
      }
    ]
  }))
  );
  
  
  app.get("/api/data/:date", (req, res) => {
        db.get(req.params.date, function(err, value) {
          if (err) {
            console.log(err);
            res.send({err});
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(value);
          }
        });
    });

  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
  function saveToDB(data){
    console.log(data.date);
    db.put(data.date, JSON.stringify(data), function(err) {
            if (err) console.log(err);
            else {
              
            }
        });
  }

  function sendStandardResponse(err, res) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  }
  