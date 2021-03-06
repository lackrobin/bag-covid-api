const { downloadAndParse, parseAllFiles,copyFilesToFolder } = require("./util/downloadAndParse");
const express = require("express");
const { db } = require("./util/db");
const  schedule =  require('node-schedule');

const dirname = "files/";

const app = express();
let portSwitch = 3000;
process.argv.forEach(function (val, index, array) {
  if(index===2 && val==="prod"){
    portSwitch = 80;
  }
});
const port = process.env.PORT || portSwitch;


app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    repo: "https://github.com/lackrobin/bag-covid-api",
    api: [
      {
        endpoint: "/data",
        requestType: "get",
        description: "get all available date values",
        "/": [
          {
            endpoint : "/{YYYY-MM-DD}",
            requestType : "get",
            description : "get official data from specific date",
            example: "/data/2020-04-02"
          },
          {
            endpoint : "/latest",
            requestType : "get",
            description : "get official data from latest date available",
            example: "/data/latest"
          }
        ]
      }
      ,
      {
        endpoint : "/hospit",
        requestType : "get",
        description : "get TOTAL number of hospitalized patients for age groups as of date",
        example: "/data/latest"
      }
      ,
      {
        endpoint : "/death",
        requestType : "get",
        description : "get TOTAL number of deaths for age groups as of date",
        example: "/data/latest"
      }
      ,
      {
        endpoint : "/infection",
        requestType : "get",
        description : "get TOTAL number of infected patients for age groups as of date",
        example: "/data/latest"
      }
    ]
  }))
});
  
app.get("/api/data/", (req, res) => {
  let obj = {dates: []};
  db.createKeyStream()
.on('data', function (data) {
  console.log(data);
  obj.dates.push(data);
}).on('end', function(){
  res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(obj));
});
});

app.get("/api/data/latest", (req, res) => {
  let latestDate;
  db.createKeyStream()
.on('data', function (data) {
  if(!latestDate){
    latestDate=data;
  }
  else{
    latestDate = Date.parse(data) > Date.parse(latestDate) ? data : latestDate;
  }
}).on('end', function(){
  db.get(latestDate, function(err, value) {
    if (err) {
      console.log(err);
      res.send({err});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(value);
    }
  });
});
});
  
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

app.get("/api/hospit", (req, res) => {
  const subsetName = "COVID19 Altersverteilung Hospit";
  const valueName = "TotalHospitalized";
  getSingleElementFromAllOldDataSets(res, subsetName, valueName);
});

app.get("/api/death", (req, res) => {
  const subsetName = "COVID19 Altersverteilung TodF";
  const valueName = "TotalDeaths";
  getSingleElementFromAllOldDataSets(res, subsetName, valueName);
});

app.get("/api/infection", (req, res) => {
  const subsetName = "COVID19 Altersverteilung";
  const valueName = "totalInfectionCount";
  getSingleElementFromAllOldDataSets(res, subsetName, valueName);
});

app.get("/download", (req, res) => {
  downloadAndParse();
  return "[]";
});

app.listen(port, () => console.log(`BAG COVID API listening on port ${port}!`));

function getSingleElementFromAllOldDataSets(res, subsetName, valueName) {
  let responseData = [];
  let dataObject = {};
  db.createKeyStream().on('data', function (key) {
    let fileDate = new Date(key);
      let breakingDate = new Date("2020-04-16");
      if(fileDate.getTime() < breakingDate.getTime()){
    db.get(key, function (err, data) {
      dataObject = { date: key };
      if (err) {
        console.log(err);
        res.send({ err });
      }
      else {
        data = JSON.parse(data);
        data = data.data[subsetName];
        data.forEach(element => {
        dataObject[element.age] = element[valueName];
        });
        responseData.push(dataObject);
      }
    
    });
  }
  }).on('close', function () {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
  });
}

copyFilesToFolder("filesarchive/",dirname, function(){parseAllFiles(dirname)});
parseAllFiles(dirname);
downloadAndParse();
schedule.scheduleJob('0 18 * * *', downloadAndParse);