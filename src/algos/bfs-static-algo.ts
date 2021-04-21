import { GraphNode } from '../graph/interfaces/GraphNode.interface';
import { Graph } from '../graph/Graph.class';
import { Flag } from '../graph/Flag.enum';
import { VisitChildrenSignature } from './helpers/visit-children-bfs';

// todo: add test for this algo
export function breadthFirstSearchStatic(this: Graph, node: GraphNode): boolean {
	// because there is no recursion here
	// we can cache the references to thisGraph fields
	const nodes = this.nodes;
	const targetNode = this.targetNode;
	
	// traverse nodes
	let hasFoundPath = false;
	const queue: GraphNode[] = [];
	
	this.flag(node, undefined, Flag.isVisited);
	queue.push(node);
	
	while (queue.length > 0 && !hasFoundPath) {
		const parentNode = queue.shift() as GraphNode;
		hasFoundPath = (this.visitChildren as VisitChildrenSignature)(parentNode, queue);
	}
	
	// reconstruct path
	if (targetNode.isVisited) {
		for (let element = nodes[targetNode.id]; !!element; element = nodes[element.parentId as number]) {
			this.flag(element, nodes[element.parentId as number], Flag.isPath);
		}
	}
	
	return hasFoundPath;
}
