import validaor from "validator";
import rest from "./rest-tools.js";

const hostname = "http://localhost:3000";

document.querySelector(".submit-node").addEventListener("click", function() {
  let data = {};
  data.name = document.querySelector(".input-node-name").value;
  data.ip = document.querySelector(".input-node-ip").value;
  if (validaor.isAlphanumeric(data.name) && validaor.isIP(data.ip)) {
    rest.post(`${hostname}/api/node`, data);
  } else {
    console.log("validation failed");
  }
});

document.querySelector(".submit-search").addEventListener("click", function() {
  let searchString = document.querySelector(".input-node-search").value;
  if (validaor.isAlphanumeric(searchString)) {
    rest.get(`${hostname}/api/node/${searchString}`).then(data => {
      document.querySelector(".search-output").innerHTML = `${searchString} ->> ${data[searchString]}`;
    });
  } else {
    console.log("validation failed");
  }
});
