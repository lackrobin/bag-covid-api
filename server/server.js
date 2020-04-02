const { downloadAndParse } = require("./downloadAndParse");
const express = require("express");
const { db } = require("./db");
const  schedule =  require('node-schedule');

//downloadAndParse();
schedule.scheduleJob('0 18 * * *', downloadAndParse); 

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