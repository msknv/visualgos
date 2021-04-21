import { GraphNode } from '../../graph/interfaces/GraphNode.interface';
import { Graph } from '../../graph/Graph.class';
import { Flag } from '../../graph/Flag.enum';

export type VisitChildrenSignature = (node: GraphNode, queue: GraphNode[]) => boolean;

export function visitChildren(this: Graph, node: GraphNode, queue: GraphNode[]): boolean {
	const currentNodeId = node.id;

	for (let i = 0; i < this.STEPS.length; i++) {
		const newNode: GraphNode = this.nodes[currentNodeId + this.STEPS[i]];
		if (this.canVisit(newNode, node, this.STEPS[i])) {
			this.flag(newNode, node, Flag.isVisited);
			newNode.parentId = node.id;
			queue.push(newNode);
			if (newNode.isTarget) {
				return true;
			}
		}
	}

	return false;
}
