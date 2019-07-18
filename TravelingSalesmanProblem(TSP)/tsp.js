"use strict";

/* 
// : URL TO CONCEPT: https://www.youtube.com/watch?time_continue=1243&v=hh-uFQ-MGfw
// The traveling salesman problem, or TSP, is an idea in data algorithms that concerns the idea of 
// 		visiting every node in a grid only once starting from a specific starting point and finding the path with the lowest weight
//		For example, if we have nodes A, B, C, and D, we would have to find the path through all these nodes that would cost the least
// 		There are several caveats to this idea:
//		1. you must visit each node ONLY ONCE. The only exception is the starting node, because...
// 		2. you must return to the starting node upon reaching every node in a graph
//		3. A node must have at least two vertices to allow for the TSP to apply - a node cannot have only one vertex because 
//			doing so would force you to revisit one node you've already touched previously, rendering the problem moot
//		4. If there are two vertices between two nodes representing going forward and backward, they MAY have different weights attributed to them
//
// To execute this function, type "node tsp.js" into the terminal after changing your working directory.
*/

const util = require('util');

// : Pretty prints error responses
function prettyPrintResponse(response) {
  console.log(util.inspect(response, {colors: true, depth: 4}));
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function generateRandomMatrix(n) {
	var size = n || getRandomInt(5) + 1;
	var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678910';
	var matrix = {}
	for (let x = 0; x < size; x++) {
		matrix[map.charAt(x)] = {};
		for (let y = 0; y < size; y++) {
			matrix[map.charAt(x)][map.charAt(y)] = (x == y) ? null : getRandomInt(100); 
		}
	}
	return matrix;
}

class TSP {
	constructor(matrix) {
		this.matrix = matrix;		// A 2D representation of all possible vectors
		this.nodes = [];
		console.log(this.matrix);
	}
	start() {
		prettyPrintResponse('Starting TSP attempt')
		var _this = this;
		_this.nodes = _this.convertToNodes();
		prettyPrintResponse('All nodes within our matrix:');
		prettyPrintResponse(_this.nodes);
		var {start,targets} = _this.determineStart(_this.nodes);
		prettyPrintResponse('Starting Node:');
		prettyPrintResponse(start);
		prettyPrintResponse('Target Nodes From Start:');
		prettyPrintResponse(targets);
		prettyPrintResponse('Initializing tsp() function...');
		var result = _this.tsp(_this,start,start,targets);
		prettyPrintResponse('Our shortest path is...!')
		prettyPrintResponse(result);
	}
	convertToNodes() {
		var _this = this;
		var results = [];
		Object.keys(_this.matrix).forEach(origin=>{
			var originNode = new Node(origin, Object.keys(_this.matrix[origin]).reduce((filtered,t)=>{
				if (_this.matrix[origin][t] != null) filtered[t] = _this.matrix[origin][t];
				return filtered;
			},{}));
			results.push(originNode);
		});
		return results;
	}
	determineStart(nodes) {
		var startingNode = nodes[Math.floor(Math.random()*nodes.length)];
		var targetNodes = nodes.filter(n=>n.name!=startingNode.name);
		return {
			start: startingNode,
			targets: targetNodes
		}
	}
	tsp(_this,parentNode,startNode,targetNodes) {
		// we want to return the minimum of the distances between the 
		//		starting node and the target nodes
		// parentNode = the original start of everything, passed down between recursions
		// startNode = where we are starting in this iteration of the recursion function
		// targetNodes = an array of the targets...
		var to = (targetNodes.length > 0) ? targetNodes : new Array(parentNode);
		var distances = to.map(t=>{
 			var w = startNode.getWeight(t.name);
 			if (targetNodes.length > 0) {
 				var start = t;
 				var targets = targetNodes.filter(tempTarget=>tempTarget.name!=t.name);
 				w += _this.tsp(_this,parentNode,start,targets);
 			}
 			return w;
		});
		var min = Math.min(...distances);
		return min;
	}
}

// A node is comprised of different vectors. In this case, a node doesn't 
// 		have a value tied to it itself.
// 		Rather, the node takes in vectors to other nodes. 
//		This is reprsented by a Vector(origin:Node,target:Node,weight:[int])
class Node {
	constructor(name, targets) {
		this.name = name;
		this.targets = (targets && Object.keys(targets).length > 0) ? targets : {};
	}
	setTargets(targets) {
		this.targets = targets;
		return this.targets;
	}
	addTarget(target) {
		this.targets.push(target);
		return this.targets;
	}
	getWeight(targetName) {
		var t = this.targets[targetName];
		if (!t) throw new Error(`Target "${targetName}" of Node "${this.name}" could not be found!`);
		return t;
	}
}

var matrix = generateRandomMatrix(4);
var tsp = new TSP(matrix);
tsp.start();