import * as React from 'react';
import { useState, useEffect, useRef, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, message } from 'antd';
import { ReloadOutlined, CheckOutlined, SubnodeOutlined, SisternodeOutlined } from '@ant-design/icons';
import { renderGraph } from '../graph/render-graph-d3';
import { START_TIMEOUT, START_TIMEOUT_COMPETITION, SPEED } from '../configs/parameters';
import { Navigation } from './Navigation';
import { texts } from '../configs/texts';
import { graphNotification } from '../graph/graph-notification';
import { ThemeContext } from '../configs/context';
import { Graph } from '../graph/Graph.class';
import { generateLinksMap } from '../graph/generate-links-map';
import { SearchType } from '../common-types/SearchType.enum';
import { GraphNode } from '../graph/interfaces/GraphNode.interface';
import { GraphData } from '../graph/interfaces/GraphData.interface';
import { AppRoute } from '../common-types/AppRoute.type';
import { FindPathSignature } from '../algos/signatures/FindPathSignature';

type GraphSectionProps = {
	title: string;
	graphData?: GraphData;
	isCompetition?: boolean;
	routes: AppRoute[];
	searchType: SearchType,
	searchFunction: FindPathSignature,
	isProgressive?: boolean,
	isDfsGenerator?: boolean,
	speed?: number
};

type LocationCustomState = {
	scrollToTop: boolean
};

export function GraphSection(props: GraphSectionProps) {
	const location = useLocation<LocationCustomState>();
	const ref = useRef<HTMLDivElement>(null);
	const [ triggerRerender, setTriggerRerender ] = useState(0);
	const { isDark } = useContext(ThemeContext);

	const {
		isDfsGenerator,
		graphData,
		isCompetition = false,
		title,
		isProgressive = true,
		searchFunction,
		routes,
		searchType,
		speed
	} = props;

	if (location.state && location.state.scrollToTop) {
		window.scrollTo(0, 0);
	}
	
	const reloadGraph = () => {
		setTriggerRerender(triggerRerender => ++triggerRerender);
	};
	
	useEffect(() => {
		const graph = renderGraph(ref.current, graphData);
		const { svg, nodes, links, targetNode, linksMap, unmountGraph } = graph;

		let _linksMap;
		if (!linksMap) {
			// create Map to faster access the needed link
			// between two nodes inside the flag function
			_linksMap = generateLinksMap(links, true);
		} else {
			_linksMap = linksMap;
		}

		const thisGraph = new Graph(nodes, links, _linksMap, targetNode, isDfsGenerator, searchFunction, searchType);
		
		let interval: NodeJS.Timeout;
		let startTimeout: NodeJS.Timeout;
		let startSearch: (startNode: GraphNode) => void;

		if (isProgressive) {
			startSearch = (startNode: GraphNode) => {
				const iteration = thisGraph.findPath(startNode) as Generator;
				
				interval = setInterval(() => {
					const iterationNext = iteration.next();

					thisGraph.updateGraph(svg);

					if (iterationNext.done) {
						clearInterval(interval);
						graphNotification(searchType, iterationNext.value, isCompetition, isDark);
					}
				}, speed || SPEED);
			}
			
		} else {
			startSearch = (startNode: GraphNode) => {
				const hasFound = thisGraph.findPath(startNode) as boolean;

				graphNotification(searchType, hasFound, isCompetition, isDark);

				thisGraph.updateGraph(svg);
			}
		}

		// waiting until the graph is build
		startTimeout = setTimeout(() => {
			startSearch(nodes[0]);
		}, isCompetition ? START_TIMEOUT_COMPETITION : START_TIMEOUT);
		
		return () => {
			startTimeout && clearTimeout(startTimeout);
			interval && clearInterval(interval);
			message.destroy();
			unmountGraph();
		}
	}, [
		triggerRerender,
		graphData,
		isDark,
		// the following deps are not actually being changed over time
		// but are included here as recommended by React docs
		// because they are from outer scope of useEffect and are used by useEffect
		isCompetition,
		isDfsGenerator,
		isProgressive,
		searchFunction,
		searchType,
		speed
	]);
	
	const overviewList: ReactNode[] = texts[searchType].map<ReactNode>((text: string, i) => {
		return (
			<p key={i}>
				<CheckOutlined style={{color: '#bff128'}} />{' '}
				<span dangerouslySetInnerHTML={{__html: text}} />
			</p>
		);
	});

	const titleIcon = () => {
		switch(searchType) {
			case 'DFS': return <SubnodeOutlined className="title-icon" />;
			case 'BFS': return <SisternodeOutlined className={`title-icon${isCompetition ? ' is-bfs' : ''}`} />;
			default: return null;
		}
	};
	
	return(
		<section className="graph-section">
			<div className="graph-section-header">
				{!isCompetition && <>{titleIcon()}<br /></>}
				<h2 className="title">
					{isCompetition && titleIcon()}
					{title}
					{!isCompetition &&
						<Button
							type="primary"
							ghost={!isDark}
							size="small"
							className="btn-reload"
							icon={<ReloadOutlined />}
							onClick={reloadGraph}
							title="Reload graph"
						>
							Reload
						</Button>}
				</h2>
				{!isCompetition && <Navigation routes={routes} />}
			</div>
			<article className="graph-article">{overviewList}</article>
			<div className="graph-wrapper" ref={ref} />
		</section>
	);
}
