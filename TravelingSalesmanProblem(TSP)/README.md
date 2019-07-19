
# Traveling Salesman Problem

The **Traveling Salesman Problem**, or **TSP**, is an idea in data algorithms that concerns the idea of visiting every node in a grid only once starting from a specific starting point and finding the path with the lowest weight or cost.

For example, if we have nodes A, B, C, and D, we would have to find the path through all these nodes that would cost the least.
There are several caveats to this idea:

1. you must visit each node ONLY ONCE. The only exception is the starting node, because...
2. you must return to the starting node upon reaching every node in a graph
3. A node must have at least two vertices to allow for the TSP to apply - a node cannot have only one vertex because doing so would force you to revisit one node you've already touched previously, rendering the problem moot
4. If there are two vertices between two nodes representing going forward and backward, they MAY have different weights attributed to them

The solution of TSP has several applications, such as planning, scheduling, logistics and packing. In general - complex optimization problems. In many applications, additional constraints such as  limited resources or time windows may be imposed.

To execute this function, type "node tsp.js" into the terminal after changing your working directory to this folder.

References:
* [Visual Description of TSP - Jenny's Lectures](https://www.youtube.com/watch?v=hh-uFQ-MGfw)
* [Practical Applications of the TSP](https://www.quora.com/What-are-practical-applications-of-the-travelling-salesman-problem)

## Example Graphs:

* Row = the destination node
* Column = the starting node

### Example 1:

| Start | A | B | C | D |
|:--|:--|:--|:--|:--|
| A | 0 | 99| 44| 88|
| B | 1 | 0 | 89| 4 |
| C | 8 | 31| 0 | 99|
| D | 21| 82| 51| 0 |

For example, A -> B costs 99, and B -> A costs 1

* DABCD = 21+99+89+99 = 308
* DACBD = 21+44+31+4 = 100
* DBACD = 82+1+44+99 = 226
* DBCAD = 82+89+8+88 = 267
* DCABD = 51+8+99+4 = 162
* DCBAD = 51+31+1+88 = 171

* projected answer = 100
* calculated answer = 100

---

### Example #2:

| Start | A | B | C | D |
|:--|:--|:--|:--|:--|
| A | 0 | 8 | 49| 80|
| B | 90| 0 | 21| 44|
| C | 98| 67| 0 | 56|
| D | 62| 52| 42| 0 |

* ABCDA = 8+21+56+62 = 147
* ABDCA = 8+44+42+98 = 192
* ACBDA = 49+67+44+62 = 222
* ACDBA = 49+56+52+90 = 247
* ADBCA = 80+52+21+98 = 251
* ADCBA = 80+42+67+90 = 279

* projectd answer = 147
* calculated answer = 147

---

### Example #3:

| Start | A | B | C | D |
|:--|:--|:--|:--|:--|
| A | 0 | 64| 85| 7 |
| B | 97| 0 | 73| 96|
| C | 57| 40| 0 | 48|
| D | 61| 32| 83| 0 |

* ABCDA = 64+73+48+61 = 246
* ABDCA = 64+96+83+57 = 300
* ACBDA = 85+40+96+61 = 282
* ACDBA = 85+48+32+97 = 262
* ADBCA = 7+32+73+57 = 169
* ADCBA = 7+83+40+97 = 227

* projected answer = 169
* calculated answer = 169