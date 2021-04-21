# [Visualgos](https://msknv.github.io/visualgos)

### Experimental browser visualization of depth-first search and breadth-first search pathfinding algorithms based on D3.js + React + generators

Depth-first search and breadth-first search are the fundamental algorithms used for graphs search.
They can be applied either by themselves or as building blocks for more complicated algorithms.
Understanding how they work adds to your overall programming knowledge,
helps to sharpen coding skills and gives food for inspiration to create fascinating visualizations.

It is a fact that to better understand a big concept, it is wise to break it into smaller pieces, or subconcepts.
And then after you comprehend all of them, you can combine this knowledge puzzle together
and get the gist of the whole concept. Similarly like recursion works.

So to really familiarize myself with Dfs and Bfs, I decided to implement the browser visualization
of these algorithms with an accent on their progress. I wanted to focus on showing “live” how they flow
through the steps, apart from just getting the final result. This way it is much easier
to grasp the essence of an algorithm as a whole. I also think that graph search algorithms
are very welcoming to such kind of visual approach because of their nature.

For the main graphic system I've chosen svg and D3.js library,
because I wanted to experiment with D3.js force-graphs and
use them as a ground for the algorithms action.

Apart from D3.js, it happened that during the course of this work I had gathered many of the
seemingly intimidating (but core, and [understandable](https://github.com/getify/You-Dont-Know-JS)) 
parts and patterns of JavaScript in one project,
that included closures, prototypes, generators, recursions and object mutations.
As well as they were just the right tools for the job,
it was an opportunity to refresh the basics and discover some new tricky nuances.
For the host environment I chose React, that also pushed me to dig deeper into
its core concepts as well (components as functions, hooks).

## D3.js + React

Because svg-graphs are generated here by pure D3.js,
there have been few challenges integrating them with React.
Firstly, to enjoy D3.js native features, such as physical force simulation,
it was necessary to append the svgs into the DOM via React ref prop,
so that their internal state would be independent of React and managed solely by D3.js.

Secondly, due to that, updates of svg-graphs on every tick
are implemented without triggering React rerenders
via useState, but are done inside component’s initial useEffect
by mutating nodes and links objects and then applying this renewed data to the svg on every tick
(for static examples, data is being modified synchronously in one step before applying changes to the svg).

Though mutating state objects is generally recommended avoiding,
or at least using responsibly and mindfully in JavaScript to prevent unexpected bugs
(especially in the realm of React), in this project it was intentional
due to the need to modify svg-graphs' state that lacked direct React participation.
React here only controls the initial mounting, unmounting of the svg-graphs
(clearing all the intervals and removing svg-elements from the DOM)
as well as reinserting new svg-graphs via ref prop
(on page change, on theme change or just on graph reload).

Thirdly, in competition pages where two identical sets of data are being used
(to highlight the differences between Dfs and Bfs),
there have been a need to create two separate copies of nodes and links objects array
via `JSON.parse(JSON.stringify(data))` to prevent "race condition".
Despite looking hacky, this way of cloning objects ensures
that the copies are saved separately in memory,
and when two algorithms start execution in parallel (UI-wise)
on the same page, the data sets can be modified independently of each other.

## Generators

Gradual asynchronous execution of depth-first search and breadth-first search algorithms was implemented
with the help of one of the trickiest features of JavaScript, that is generators,
which turned out to be a perfect fit for such kind of task (requiring non-blocking the event-loop
and demanding the browser rerender on every interval tick as algorithms move forward).

I was glad to dig deeper into generators, because they come up quite rarely
on a day-to-day basis, thereby definitely leaving room for mastering them.
So, after exercising my troubleshooting and debugging skills intensely a few times
(especially when combining generators with recursion - for depth-first search),
I could eventually harness their powerful features.

Now generators look much more friendly to me,
thus becoming just one of the useful tools under the belt
that a certain task can be solved with.


That being said, here is a map of all the pages with different depth-first search and breadth-first search examples:

* [Depth-first search (progressive)](https://msknv.github.io/visualgos/#/dfs/progressive). Asynchronous gradual execution. Random target and obstacles;
* [Depth-first search (static)](https://msknv.github.io/visualgos/#/dfs/static). Synchronous immediate execution. Random target and obstacles;
* [Breadth-first search (progressive)](https://msknv.github.io/visualgos/#/bfs/progressive). Asynchronous gradual execution. Random target and obstacles;
* [Breadth-first search (progressive)](https://msknv.github.io/visualgos/#/bfs/static). Synchronous immediate execution. Random target and obstacles;

Competition pages. To comprehend the differences between Dfs and Bfs,
it is really helpful to observe how they flow side by side:

* [Dfs versus Bfs (progressive)](https://msknv.github.io/visualgos/#/dfs-vs-bfs/progressive). Asynchronous gradual execution. Random target and obstacles;
* [Dfs versus Bfs (static)](https://msknv.github.io/visualgos/#/dfs-vs-bfs/static). Synchronous immediate execution. Random target and obstacles;
* [Dfs versus Bfs (edge case 1)](https://msknv.github.io/visualgos/#/dfs-vs-bfs/edge-case-a). Asynchronous gradual execution. Fixed target and no obstacles;
* [Dfs versus Bfs (edge case 2)](https://msknv.github.io/visualgos/#/dfs-vs-bfs/edge-case-b). Asynchronous gradual execution. Fixed target and no obstacles.
