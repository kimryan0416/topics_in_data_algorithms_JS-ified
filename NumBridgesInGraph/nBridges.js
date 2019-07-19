// : Get a random integer
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

class nBridges {
	constructor(vertices = [], startVertex = null) {
		this.vertices = vertices;
		this.startVertex = startVertex;
		this.startingTime = 0;
		this.bridges = [];
	}
	start() {
		var _this = this;
		if (_this.vertices.length == 0 ) _this.vertices = _this.generateRandomGraph();
		_this.startingTime = 0;
		_this.bridges = [];
		console.log('This graph contains the following vertices:');
		console.log(_this.vertices);
		console.log('Starting Search...');
		if (!_this.startVertex) _this.startVertex = _this.vertices[Math.floor(Math.random()*_this.vertices.length)];
		_this.search(_this,_this.startVertex,null);
		console.log('The bridges present in this graph are:');
		console.log(_this.bridges)

	}
	search(_this, vertex, parent) {
		_this.startingTime += 1;	// update our controller's global starting time by 1 interval
		vertex.startingTime = _this.startingTime; // set our time of entry for this node
		vertex.tempStartingTime = _this.startingTime;

		vertex.parent = parent || null;	// create a reference to our parent if parent exists
		vertex.descendants = vertex.neighbors.filter(v=>{
			return v != vertex.parent && v.startingTime == null;
		});

		if (vertex.descendants.length == 0) {
			// No more descendants, we need to return to our parent and determine if (parent,vertex) is a bridge
			_this.findBridge(_this,parent,vertex);
			return;
		} else {
			for (let i = 0; i < vertex.descendants.length; i++) {
				var to = vertex.descendants[i];
				if (to.startingTime == null) {
					_this.search(_this,to,vertex);
				}
			}
			_this.findBridge(_this,parent,vertex);
			return;
		}
		return;
	}
	findBridge(_this,parent,vertex) {
		vertex.tempStartingTime = vertex.neighbors.reduce((filtered,v)=>{
			if (v != vertex.parent && v.tempStartingTime < filtered) filtered = v.tempStartingTime;
			return filtered;
		},vertex.tempStartingTime);
		if (parent != null && parent.startingTime != null && parent.startingTime < vertex.tempStartingTime) {
			// This is a case where the parent has a lower starting value than the lowest starting value associated with our current vertex
			// This means that (parent,vertex) is a bridge, so we add it to our global "bridges" array;
			_this.bridges.push(new Edge(parent,vertex));
		}
		return;
	}
	generateRandomGraph(n) {
		var size = (n) ? n : getRandomInt(18) + 2;
		var vertices = [];
		for (let i = 1; i < size; i++) {
			var v = new Vertex('Vertex #'+(i));
			if (i > 1) {
				var numNeighbors = getRandomInt(i)+1;
				for (let j = 0; j < numNeighbors; j++) {
					var tempNeighbor = vertices[Math.floor(Math.random()*vertices.length)];
					if (tempNeighbor.name != v.name) v.addNeighbor(tempNeighbor);
				}
			}
			vertices.push(v);
		}
		return vertices;
	}
}

class Vertex {
	constructor(name,neighbors=[]) {
		this.name = name;
		this.neighbors = neighbors;
		this.parent = null;
		this.descendants = [];
		this.startingTime = null;
		this.tempStartingTime = null;
	}
	addNeighbor(...args) {
		var _this = this;
		var neighbors = args;
		while(neighbors[0]) {
			var v = neighbors[0];
			if (!_this.neighbors.find(n=>n.name==v.name)) _this.neighbors.push(v);
			if (!v.neighbors.find(n=>n.name==_this.name)) v.neighbors.push(_this);
			neighbors.shift();
		}
		return;
	}
}

class Edge {
	constructor(from,to) {
		this.from = from;
		this.to = to;
	}
}

var A = new Vertex('A');
var B = new Vertex('B');
var C = new Vertex('C');
var D = new Vertex('D');
var E = new Vertex('E');
var F = new Vertex('F');
var G = new Vertex('G');
var H = new Vertex('H');
var I = new Vertex('I');
var J = new Vertex('J');
var K = new Vertex('K');
var L = new Vertex('L');
var M = new Vertex('M');
var N = new Vertex('N');
var O = new Vertex('0');

A.addNeighbor(B,C);
B.addNeighbor(C,E,F);
C.addNeighbor(D,G,H);
D.addNeighbor(E,F);
F.addNeighbor(G);
H.addNeighbor(I,J);
I.addNeighbor(J,K);
J.addNeighbor(L);
K.addNeighbor(L,M);
M.addNeighbor(N,O);
N.addNeighbor(O);

var vertices = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O];
var nb = new nBridges(vertices, D);
nb.start();

