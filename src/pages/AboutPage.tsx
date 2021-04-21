import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { StockOutlined, FundOutlined } from '@ant-design/icons';

type LinkItem = {
	url: string,
	text: string,
	isProgressive?: boolean,
	isEdgeCase?: boolean
};

export function AboutPage() {
	const description = (isProgressive = true, isEdgeCase = false) => {
		const icon = isProgressive ? <StockOutlined /> : <FundOutlined />;
		return(
			<>
				{icon}{' '}
				{isProgressive ? 'Asynchronous gradual' : 'Synchronous immediate'} execution;<br />
				<span style={{whiteSpace: 'nowrap'}}>
					<span className="circle is-target" />
					{isEdgeCase
						? 'Target node is fixed (to spotlight the edge case)'
						: 'Target node is random'};
				</span>
				<br />
				<span style={{whiteSpace: 'nowrap'}}>
					<span className="circle is-obstacle" />
					{isEdgeCase
						? 'No obstacle nodes'
						: 'Obstacle nodes are random'}.
				</span>
			</>
		);
	};

	const linkItemsRaw: LinkItem[] = [
		{ url: '/dfs/progressive', text: 'Depth-first search (progressive)' },
		{ url: '/dfs/static', text: 'Depth-first search (static)', isProgressive: false },
		{ url: '/bfs/progressive', text: 'Breadth-first search (progressive)' },
		{ url: '/bfs/static', text: 'Breadth-first search (static)', isProgressive: false },
		// competition pages
		{ url: '/dfs-vs-bfs/progressive', text: 'Dfs versus Bfs (progressive)' },
		{ url: '/dfs-vs-bfs/static', text: 'Dfs versus Bfs (static)', isProgressive: false },
		{ url: '/dfs-vs-bfs/edge-case-a', text: 'Dfs versus Bfs (edge case 1)', isEdgeCase: true },
		{ url: '/dfs-vs-bfs/edge-case-b', text: 'Dfs versus Bfs (edge case 2)', isEdgeCase: true }
	];

	const linkItems: ReactNode[] = linkItemsRaw.map<ReactNode>((linkItem: LinkItem, i) => {
		const { url, text, isProgressive = true, isEdgeCase = false } = linkItem;
		return(
			<li key={i} className="article-list-item">
				{'- '}
				<Link to={{ pathname: url, state: { scrollToTop: true } }} className="article-list-item-link">
					{text}
				</Link>
				<br />
				{description(isProgressive, isEdgeCase)}
			</li>
		);
	});

	return (
		<section className="about-section">
			<h2 className="title">Onboarding</h2>
			<article className="article">
				<p>
					Depth-first search and breadth-first search are the fundamental algorithms used for graphs search.
					They can be applied either by themselves or as building blocks for more complicated algorithms.
					Understanding how they work adds to your overall programming knowledge,
					helps to sharpen coding skills and gives food for inspiration to create fascinating visualizations.
				</p>
				<p>
					It is a fact that to better understand a big concept, it is wise to break it into smaller pieces, or subconcepts.
					And then after you comprehend all of them, you can combine this knowledge puzzle together
					and get the gist of the whole concept. Similarly like recursion works.
				</p>
				<p>
					So to really familiarize myself with Dfs and Bfs, I decided to implement the browser visualization
					of these algorithms with an accent on their progress. I wanted to focus on showing “live” how they flow
					through the steps, apart from just getting the final result. This way it is much easier
					to grasp the essence of an algorithm as a whole. I also think that graph search algorithms
					are very welcoming to such kind of visual approach because of their nature.
				</p>
				<p>
					For the main graphic system I've chosen svg and D3.js library,
					because I wanted to experiment with D3.js force-graphs and
					use them as a ground for the algorithms action.
				</p>
				<p>
					Apart from D3.js, it happened that during the course of this work I had gathered many of the
					seemingly intimidating (but core, and{' '}
					<a href="https://github.com/getify/You-Dont-Know-JS" target="_blank" rel="noreferrer noopener">
						understandable
					</a>)
					parts and patterns of JavaScript in one project, that included closures, prototypes, generators,
					recursions and object mutations. As well as they were just the right tools for the job,
					it was an opportunity to refresh the basics and discover some new tricky nuances.
					For the host environment I chose React, that also pushed me to dig deeper into
					its core concepts as well (components as functions, hooks).
				</p>
				<br />
				<p><b>D3.js + React</b></p>
				<p>
					Because svg-graphs are generated here by pure D3.js,
					there have been few challenges integrating them with React.
					Firstly, to enjoy D3.js native features, such as physical force simulation,
					it was necessary to append the svgs into the DOM via React ref prop,
					so that their internal state would be independent of React and managed solely by D3.js.
				</p>
				<p>
					Secondly, due to that, updates of svg-graphs on every tick
					are implemented without triggering React rerenders
					via useState, but are done inside component’s initial useEffect
					by mutating nodes and links objects and then applying this renewed data to the svg on every tick
					(for static examples, data is being modified synchronously in one step before applying changes to the svg).
				</p>
				<p>
					Though mutating state objects is generally recommended avoiding,
					or at least using responsibly and mindfully in JavaScript to prevent unexpected bugs
					(especially in the realm of React), in this project it was intentional
					due to the need to modify svg-graphs' state that lacked direct React participation.
					React here only controls the initial mounting, unmounting of the svg-graphs
					(clearing all the intervals and removing svg-elements from the DOM)
					as well as reinserting new svg-graphs via ref prop
					(on page change, on theme change or just on graph reload).
				</p>
				<p>
					Thirdly, in competition pages where two identical sets of data are being used
					(to highlight the differences between Dfs and Bfs),
					there have been a need to create two separate copies of nodes and links objects array
					via JSON.parse(JSON.stringify(data)) to prevent "race condition".
					Despite looking hacky, this way of cloning objects ensures
					that the copies are saved separately in memory,
					and when two algorithms start execution in parallel (UI-wise)
					on the same page, the data sets can be modified independently of each other.
				</p>
				<br />
				<p><b>Generators</b></p>
				<p>
					Gradual asynchronous execution of depth-first search and breadth-first search algorithms was implemented
					with the help of one of the trickiest features of JavaScript, that is generators,
					which turned out to be a perfect fit for such kind of task (requiring non-blocking the event-loop
					and demanding the browser rerender on every interval tick as algorithms move forward).
				</p>
				<p>
					I was glad to dig deeper into generators, because they come up quite rarely
					on a day-to-day basis, thereby definitely leaving room for mastering them.
					So, after exercising my troubleshooting and debugging skills intensely a few times
					(especially when combining generators with recursion - for depth-first search),
					I could eventually harness their powerful features.
				</p>
				<p>
					Now generators look much more friendly to me,
					thus becoming just one of the useful tools under the belt
					that a certain task can be solved with.
				</p>
				<br />
				<p>That being said, here is a map of all the pages with different depth-first search and breadth-first search examples:</p>
				<ul className="article-list has-links">
					{linkItems.slice(0, 4)}
				</ul>
				<br />
				<p>
					Competition pages. To comprehend the differences between Dfs and Bfs,
					it is really helpful to observe how they flow side by side:
				</p>
				<ul className="article-list has-links">
					{linkItems.slice(4)}
				</ul>
			</article>
		</section>
	);
}
