import { GraphNode } from '../graph/interfaces/GraphNode.interface';
import { Graph } from '../graph/Graph.class';
import { Flag } from '../graph/Flag.enum';
import { VisitChildrenSignature } from './helpers/visit-children-bfs';

export function* breadthFirstSearchProgressive(this: Graph, node: GraphNode): Generator {
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
		yield hasFoundPath;
	}
	
	// reconstruct path
	if (targetNode.isVisited) {
		for (
			let element = nodes[this.targetNode.id];
			!!element && !!nodes[element.parentId as number];
			element = nodes[element.parentId as number]
		) {
			if (element.isTarget) {
				yield this.flag(element, undefined, Flag.isPath);
				yield this.flag(nodes[element.parentId as number], element, Flag.isPath);
			} else {
				yield this.flag(nodes[element.parentId as number], element, Flag.isPath);
			}
		}
	}
	
	return hasFoundPath; // for callback message
}
