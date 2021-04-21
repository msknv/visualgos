import { Graph } from '../graph/Graph.class';
import { GraphNode } from '../graph/interfaces/GraphNode.interface';
import { Flag } from '../graph/Flag.enum';

// todo: add test for this algo
export function depthFirstSearchStatic(this: Graph, node: GraphNode, prevNode?: GraphNode, step?: number): boolean {
	if (!this.canVisit(node, prevNode, step)) {
		return false;
	}

	const currentNodeId = node.id;

	// pre-order flag
	this.flag(node, prevNode, Flag.isVisited);

	if (node.isTarget) {
		this.flag(node, prevNode, Flag.isVisited);
		this.flag(node, prevNode, Flag.isPath);
		return true;
	}

	for (let i = 0; i < this.STEPS.length; i++) {
		const currentStep = this.STEPS[i];
		if (depthFirstSearchStatic.apply(this, [this.nodes[currentNodeId + currentStep], node, currentStep])) {
			// post-order flag
			this.flag(node, prevNode, Flag.isPath);
			return true;
		}
	}
	
	/**
	 * leaving this more explicit version of the code
	 * before refactoring it to the above for-loop,
	 * to better understand how it works
	if (
		_depthFirstSearchStatic(this.nodes[currentNodeId + 1], node, 1)
		|| _depthFirstSearchStatic(this.nodes[currentNodeId + GRAPH_SIDE_LENGTH], node, GRAPH_SIDE_LENGTH)
		|| _depthFirstSearchStatic(this.nodes[currentNodeId - 1], node, -1)
		|| _depthFirstSearchStatic(this.nodes[currentNodeId - GRAPH_SIDE_LENGTH], node, -GRAPH_SIDE_LENGTH)
	) {
		this.flag(node, prevNode, Flag.isPath);
		return true;
	}
	 **/

	// post-order flag
	this.flag(node, prevNode, Flag.isBlocked);
	return false;
}
