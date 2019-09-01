module.exports = class Node {
    constructor(name, ip) {
      this.name = name;
      this.ip = ip;
      this.connections = [];
    }

    connect(Node){
        //todo connect the nodes 
        this.connections.push(Node);
    }
  };