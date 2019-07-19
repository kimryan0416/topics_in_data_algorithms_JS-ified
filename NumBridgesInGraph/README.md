# Finding the Number of Bridges in a Graph via DFS

In this scenario, we need to find the number of "bridges" in a given graph. A **bridge** is an edge in a graph that, when erased, will increase the number of components in a graph. In other words, erasing a "bridge" will disconnect the graph into parts.

The algorithm used is based on **"Depth-First Search"** (DFS) and has O(N+M) complexity. N = number of vertices, M = number of edges.

The concept is that if we are looking at a vertex "to" from some vertex "v" then the edge connecting "v" to "to" will be a bridge if and only if none of the vertices "to" and its descendants in the DFS traversal tree has a edge that goes back to "v" or any of its ancestors. In other words, there is no other way back to "v" except for (v,to)

## Example

An important concept to cover is time complexity. Let's say, for the sake of the idea, that we have a graph consisting of vertexes A, B, C, D, and E and our selected root is A:

* A is neighbors with B,C,D
* B is neighbors with A,C,D,E
* C is neighbors with A,B
* D is neighbors with A,B

We will attempt to traverse this graph as follows:

1. From "root", "root" has a starting time of 1. We can go to either "B", "C", or "D".
2. Let's say we traverse to "B". "B" now has a starting time of 2, and we can go to either "C", "D", or "E" - "B" has technically 4 neighbors (A, C, D, E), but since this is DFS we have to continue to one of "B"'s descendants, which are "C", "D', and "E".
3. We go to "D" - "D"'s starting time is 3, but this time "D" does not have any descendants. This is because "D" is connected with "A" and "B", all of whom were visited prior.
4. At D, we determine the neighbor (with the exception of its parent, "B") that has the minimum starting time. In this case, the only neighbor that fits this criteria is "A", which has a starting time of 1.
5. We compare "A"'s starting time of 1 with "D"'s parent's ("B"'s) starting time, which is 2. Notice that 1 < 2; this means that that the edge B-D is NOT a bridge. This is because we have determine that erasing B-D will not split the graph into separate components, as there is another way to arrive at "D" after erasing B-D.
6. Since "D" doesn't have any unvisited descendants, we return to "B". 
7. "B" has two unvisited descendants: "C" and "E". For the sake of argument, let's say that we enter "C".
8. "C"'s starting time is 4, and since "C" has no unvisited descendants left we do the same with with "C" that we did with "D" (Grab the minimum of either its own starting time or that of its neighbors excluding its parent, compare that value with its parent's starting value, if minimum < parent's starting time, edge is NOT a bridge). This means that B-C is NOT a bridge either.
9. Return to "B" and visit "B"'s last unvisited descendant, "E".
10. "E" has a starting value of 5, but unlike the other vertexes "E" does not have any descendants. We go through the comparison between "E"'s startng time and its parent's ("B"'s) starting time. Notice how "E" > "B" this time.
11. Because "E" > "B", that means that "E" does not connect with any vertex that comes earlier than "B" - because of this, we determine that B-E IS a bridge.

The graph we just traversed through now has a time complexity of O(5+6), or O(11). Recall that time complexity of a graph in this scenario is O(N+M), where N = number of vertices and M = number of edges. Time complexity works like this because: 

1. We've visited each vertex on this graph at least once
2. We've traveled through each edge on the graph at least once.

References:
* [Visual Description of nBridges - Jenny's Lectures](https://www.youtube.com/watch?v=CsGP_s_3GWg)
* [Formulaic Description of nBridges - CP Algorithms](https://cp-algorithms.com/graph/bridge-searching.html)