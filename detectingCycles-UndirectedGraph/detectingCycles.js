
class detectingCycles {
	constructor(vertices = [], startVertex = null) {
		this.vertices = vertices;
		this.startVertex = startVertex;
		this.queue = [];
		this.visited = [];
		this.cycleFound = false;
	}
	start() {
		var _this = this;
		if (_this.vertices.length == 0 ) _this.vertices = _this.generateRandomGraph();
		_this.vertices.map(v=>{
			var newV = v;
			newV.status = -1;
			return newV;
		});
		_this.queue = [];
		_this.visited = [];
		_this.cycleFound = false;
		if (!_this.startVertex) _this.startVertex = _this.vertices[Math.floor(Math.random()*_this.vertices.length)];
		console.log('This graph contains the following vertices:');
		_this.vertices.forEach(v=>{
			console.log(v);
		})
		console.log('Starting BFS...');
		_this.bfs();
		if (_this.cycleFound) {
			console.log("CYCLE DETECTED");
		} else {
			console.log("CYCLE NOT DETECTED");
		}

	}
	bfs() {
		var _this = this;
		_this.addToQueue(_this,_this.startVertex);
		while (_this.queue[0] && !_this.cycleFound) {
			_this.traverse(_this,_this.queue[0],_this.queue[0].parent);
		}
		return;
	}
	traverse(_this, vertex, parent = null) {
		if (vertex.status == -1) {
			_this.addToQueue(_this,vertex, parent);
			return;
		} else if (vertex.status == 0) {
			vertex.descendants = vertex.neighbors.filter(v=>parent==null || v.name != parent.name);
			vertex.descendants.forEach(v=>{
				if (v.status == 0) _this.cycleFound = true;
				else _this.addToQueue(_this,v,vertex);
			});
			_this.removeFromQueue(_this,vertex);
			return;
		}
		return;
	}
	addToQueue(_this,vertex,parent) {
		vertex.status = 0;
		vertex.parent = parent;
		_this.queue.push(vertex);
		return;
	}
	removeFromQueue(_this,vertex) {
		if (_this.queue[0].name !== vertex.name ) throw new Error('Error in queue - first item to pop out of queue is not correct vertex!');
		_this.queue.shift();
		vertex.status = 1;
		_this.visited.push(vertex);
		return;
	}
	generateRandomGraph(n) {
		var _this = this;
		var size = (n) ? n : _this.getRandomInt(18) + 2;
		var vertices = [];
		for (let i = 1; i < size; i++) {
			var v = new Vertex('Vertex #'+(i));
			if (i > 1) {
				var numNeighbors = _this.getRandomInt(i)+1;
				for (let j = 0; j < numNeighbors; j++) {
					var tempNeighbor = vertices[Math.floor(Math.random()*vertices.length)];
					if (tempNeighbor.name != v.name) v.addNeighbor(tempNeighbor);
				}
			}
			vertices.push(v);
		}
		return vertices;
	}
	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
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

/*
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
var nb = new detectingCycles(vertices, D);
nb.start();
*/
var nb = new detectingCycles();
nb.start();
