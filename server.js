const { downloadAndParse } = require("./util/downloadAndParse");
const express = require("express");
const { db } = require("./util/db");
const  schedule =  require('node-schedule');

downloadAndParse();
schedule.scheduleJob('0 18 * * *', downloadAndParse); 

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
            endpoint : "{YYYY-MM-DD}",
            requestType : "get",
            description : "get official data from specific date",
            example: "/data/2020-04-02"
          },
          {
            endpoint : "latest",
            requestType : "get",
            description : "get official data from latest date available",
            example: "/data/latest"
          }
        ]
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

  
  app.listen(port, () => console.log(`BAG COVID API listening on port ${port}!`));