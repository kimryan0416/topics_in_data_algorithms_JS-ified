# Finding Cycles in a Undirected Graphs using BFS Traversal

A **"Cycle"** in a graph is a special collection of edges between vertices of the graph where, starting from one vertex along that collection of edges, you are able to return to that vertex without re-traversing previous edges. In more basic terms, think of a "Cycle" such that you can start from and return to a starting node without going backwards or without using any previously-taken paths.

Detecting cycles in a graph can be done with multiple traversal and sorting methods, but for the sake of this topic we'll be discussing Breadth-First-Search, or BFS, traversal.

## Breadth-First-Search vs Depth-First-Search

**Breadth-First-Search**, or BFS, is a method of traversing through a graph such that upon reaching one vertex in the graph, you consider all of that vertex's descendants before moving to the next vertex (which would be one of that vertex's descendants).

This is in direct opposition to **Depth-First-Search**, or DFS, where when traversing through a graph you prioritize traveling to the deepest possible path through a list of unvisited vertices first.

Let us say that if you had vertices A, B, C, and D, and A was parent to B and C while B is parent to D. In this case, a BFS traversal would mean visiting the vertices in this order: ``A -> B -> C -> D``. In the case of DFS traversal, the vertices would be visited in this order: ``A -> B -> D -> C``. this is because in BFS, we search A and its descendants first, then move onto the descendants of B and C in that order; in DFS, we search A, then B, then D instead of C because we are attempting to reach the deepest point first.

## Method of Traversal

There are several important concepts to understand about BFS before we proceed. When we execute a BFS traversal, we need to keep track of the following:

* A "Queue" of vertices that contains the verticees the system needs to parse through - this "Queue" remembers which vertices entered first and prioritizes vertexes in the order that they are entered into the Queue.
* A "Visited" list of vertices that remembers which vertices we have visited so far.
* All vertices in the graph have a status of either -1, 0, or 1.
	* -1: The vertex has not been added to our "Queue"
	* 0: The vertex has been added to our "Queue" but has not been visited yet (aka is not in "Visited")
	* 1: The vertex has been visited (aka it is in "Visited")
	* All vertices, at the start of our BFS traversal, is given a status of "-1".

When reaching a vertex in a graph, we must perform the following steps:

1. Add that vertex "v" into our "Queue" if its status is -1, change its status to 0.
2. Perform any necessary operations concerning "v";
3. Add "v" into our "Visited" list, change its status to 1;
4. Add all of "v"'s descendants into our "Queue", changing their statuses to 0.
5. ... and so on.

Traversal ends when all of our vertices are within the "Visited" list or if a cycle is detected in the graph.

For a more formal definition of how our BFS algorithm detects a cycle:

> A cycle is present in a graph if, when checking the adjacent vertexes of a vertex, at least one of these adjacent vertexes has a status of 0 (aka it is in our "Queue");

## Example



## References:
* [Visual Description of Finding Cycles - Jenny's Lectures](https://www.youtube.com/watch?v=vXrv3kruvwE)
* [Formulaic Description of nBridges - CP Algorithms](https://cp-algorithms.com/graph/bridge-searching.html)