const { download } = require("./download");
const { handleEpiKurve,handleAltersVerteilung,handleKantone,hanldeHospit,handleTod} = require("./dataHandler");

const express = require("express");
const level = require("level");
const fs = require('fs');
const xlsxFile = require('read-excel-file/node');
//const validator = require("validator");
//const Node = require("./classes/Node.js");

const url = "https://www.bag.admin.ch/dam/bag/de/dokumente/mt/k-und-i/aktuelle-ausbrueche-pandemien/2019-nCoV/covid-19-datengrundlage-lagebericht.xlsx.download.xlsx/200325_Datengrundlage_Grafiken_COVID-19-Bericht.xlsx";
let date = new Date();
const dest = `files/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.xlsx`


//TODO -- Timebased, maybe at 12:00 each day?
download(url, dest, function(err){
  if (err) {console.log(err)}

  else {
    //After succesfully downloading, parse xml, and add to DB
    fs.readdir("files/", (err, filenames) => {    
      if (err) {console.log(err)}
      filenames.forEach(filename => {
        if(filename !== ".gitignore"){
          xlsxFile(`files/${filename}`, { getSheets: true }).then((sheets) => {sheets.forEach((obj)=>{
            switch (obj.name){
              case "COVID19 Epikurve": 
              handleEpiKurve(filename,obj.name);
              break;
              case "COVID19 Altersverteilung": 
              handleAltersVerteilung(filename,obj.name);
              break;
              case "COVID19 Kantone":
              handleKantone(filename,obj.name);
              break;
              case "COVID19 Altersverteilung Hospit":
              hanldeHospit(filename,obj.name);
              break;
              case "COVID19 Altersverteilung TodF":
              handleTod(filename,obj.name);
            }
          })
        })
      }
    });
    
  });
}
});



const app = express();
const port = 3000;
var db = level("node-db");

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
  
  
  
  // app.get("/api/node/:name", (req, res) => {
  //   if (validator.isAlphanumeric(req.params.name)) {
  //     db.get(req.params.name, function(err, value) {
  //       if (err) {
  //         console.log(err);
  //         res.send({});
  //       } else {
  //         console.log(value);
  //         res.send(JSON.stringify(value));
  //       }
  //     });
  //   } else {
  //     console.log("invalid name");
  //     res.send({});
  //   }
  // });
  
  // app.get("/api/node", (req, res) => {});
  
  // app.post("/api/node", (req, res) => {
  //   const node = new Node(req.body.name,req.body.ip);
  //   console.log(node);
  //   console.log(JSON.stringify(node));
  //   if (validator.isAlphanumeric(node.name) && validator.isIP(node.ip)) {
  //     db.put(node.name, JSON.stringify(node), function(err) {
  //       sendStandardResponse(err, res);
  //     });
  //   } else {
  //     console.log("invalid parameters");
  //     res.sendStatus(400);
  //   }
  // });
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
  function sendStandardResponse(err, res) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  }
  