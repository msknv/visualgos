import * as d3 from 'd3';
import { Simulation } from 'd3-force';
import {
	SVG_GRAPH_WIDTH,
	SVG_GRAPH_HEIGHT,
	CIRCLE_RADIUS,
	LINE_STROKE_OPACITY_SECONDARY
} from '../configs/parameters';
import { color } from './stylers/color';
import { circleStroke } from './stylers/circle-stroke';
import { generateGraphData } from './generate-graph-data';
import { GraphData } from './interfaces/GraphData.interface';
import { GraphNode } from './interfaces/GraphNode.interface';
import { GraphLink } from './interfaces/GraphLink.interface';
import { RenderGraphD3 } from './types/RenderGraphD3.type';
import { DragEventD3 } from './types/DragEvent.type';

export function renderGraph(element: HTMLDivElement | null, graphData?: GraphData): RenderGraphD3 {
	// d3 forced graph rendering is based upon example:
	// https://observablehq.com/@d3/force-directed-lattice

	const data = graphData || generateGraphData();
	
	const svg = d3.select(element)
		.append('svg')
		.attr('class', 'graph-svg')
		.attr('viewBox', `0, 0, ${SVG_GRAPH_WIDTH}, ${SVG_GRAPH_HEIGHT}`)
		.attr('transform', 'rotate(-2.3)');
	
	const nodes = data.nodes;
	const links = data.links;
	const targetNodeId = data.targetNodeId;
	const linksMap = data.linksMap;

	const simulation = d3.forceSimulation<GraphNode, GraphLink>(nodes)
		.force('link', d3.forceLink(links).strength(1.1).distance(10).iterations(20))
		.force('charge', d3.forceManyBody().strength(-5))
		.force('center', d3.forceCenter(SVG_GRAPH_WIDTH / 2, SVG_GRAPH_HEIGHT / 2));

	const drag = (simulation: Simulation<GraphNode, GraphLink>) => {
		function dragstarted(event: DragEventD3) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event: DragEventD3) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event: DragEventD3) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}
		
		return d3.drag<SVGCircleElement, GraphNode>()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended);
	};
	
	const link = svg.append('g')
		.selectAll<SVGLineElement, GraphLink[]>('line')
		.data(links)
		.join('line')
		.attr('stroke', 'grey')
		.attr('stroke-opacity', LINE_STROKE_OPACITY_SECONDARY)
		.attr('stroke-width', LINE_STROKE_OPACITY_SECONDARY);
	
	const node = svg.append('g')
		.selectAll<SVGCircleElement, GraphNode[]>('circle')
		.data(nodes)
		.join('circle')
		.attr('r', CIRCLE_RADIUS)
		.attr('stroke', circleStroke)
		.attr('stroke-width', 1)
		.attr('fill', color)
		.call(drag(simulation));

	simulation.on('tick', () => {
		// need to cast these optional GraphNode interface fields because D3 adds/transforms them
		// after graph initialization, but on the initial graph data generation and for unit-tests
		// for algorithms these fields are not needed
		link
			.attr('x1', d => (d.source as GraphNode).x as number)
			.attr('y1', d => (d.source as GraphNode).y as number)
			.attr('x2', d => (d.target as GraphNode).x as number)
			.attr('y2', d => (d.target as GraphNode).y as number);

		node
			.attr('cx', d => d.x as number)
			.attr('cy', d => d.y as number);
	});

	node.append('title')
		.text(d => d.id);

	const unmountGraph = () => {
	    simulation.stop();
	    node.on('drag', null);
	    d3.select('svg.graph-svg').remove();
  	}

	return { svg, node, link, nodes, links, linksMap, targetNode: nodes[targetNodeId], unmountGraph };
}
