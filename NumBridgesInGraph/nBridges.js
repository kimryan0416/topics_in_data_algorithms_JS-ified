/*
// : Finding the number of bridges in a graph
// Video: https://www.youtube.com/watch?v=CsGP_s_3GWg
// Text: https://cp-algorithms.com/graph/bridge-searching.html
// In this scenario, we need to find the number of "bridges" in a given graph
// 		A "bridge" is an edge in a graph that, when erased, will increase the number of components in a graph.
//		In other words, erasing a "bridge" will disconnect the graph into parts.
// The algorithm used is based on "Depth-First Search" (DFS) and has O(N+M) complexity - N = number of vertices, M = number of edges
// 		The concept is that if we are looking at a vertex "to" from some vertex "v" then 
//		the edge connecting "v" to "to" will be a bridge if and only if none of the vertices "to" and its descendants in the 
//		DFS traversal tree has a edge that goes back to "v" or any of its ancestors. 
//		In other words, there is no other way back to "v" except for (v,to)
//
// An important concept to cover is time complexity. Let's say that at our selected root, we have time of 1.
//		Let's say from "root", we can go to either "A" or "B". If we go to "A", "A"'s discovery time is 2.
//		Let's say from "A", we can go to either "C" or "D". If we got to "D", "D"'s discovery time is 3. And so on
//		For the sake of argument, let's say that "D" loops back to "A" and nothing else.
//		Our graph would look somethign like this: root - A - C - D - A
//		Our graph, with discovery time, would look like this: 0 - 1 - 2 - 3 - 1
//		Pay close attention to how C is a parent of D and how D is a parent of A who just happens to be a parent of C.
// 		If D has any descendants (in this, A) who already has a discovery time that is less than D's ancestor, then we know (C,D) is NOT a bridge
*/

const util = require('util');

// : Pretty prints error responses
function prettyPrintResponse(response) {
  console.log(util.inspect(response, {colors: true, depth: 4}));
}
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
		prettyPrintResponse('This graph contains the following vertices:');
		prettyPrintResponse(_this.vertices);
		prettyPrintResponse('Starting Search...');
		if (!_this.startVertex) _this.startVertex = _this.vertices[Math.floor(Math.random()*_this.vertices.length)];
		_this.search(_this,_this.startVertex,null);
		prettyPrintResponse('The bridges present in this graph are:');
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

