const express = require("express");
const level = require("level");
const path = require("path");
const validator = require("validator");

const app = express();
const port = 3000;
var db = level("node-db");

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) =>
  res.end({
    api: [
      {
        endpoint: "/node",
        requestType: "get",
        description: "get all registered nodes"
      }
    ]
  })
);
app.get("/api/node/:name", (req, res) => {
  if (validator.isAlphanumeric(req.params.name)) {
    db.get(req.params.name, function(err, value) {
      if (err) {
        console.log(err);
        res.send({});
      } else {
        let data = {};
        data[req.params.name] = value;
        res.send(data);
      }
    });
  } else {
    console.log("invalid name");
    res.send({});
  }
});

app.get("/api/node", (req, res) => {});

app.post("/api/node", (req, res) => {
  const nodeName = req.body.name;
  const nodeIp = req.body.ip;
  if (validator.isAlphanumeric(nodeName) && validator.isIP(nodeIp)) {
    db.put(nodeName, nodeIp, function(err) {
      sendStandardResponse(err, res);
    });
  } else {
    console.log("invalid parameters");
    res.sendStatus(400);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function sendStandardResponse(err, res) {
  if (err) {
    console.log(err);
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
}
