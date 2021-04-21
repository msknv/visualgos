import { GraphNode } from '../graph/interfaces/GraphNode.interface';
import { Graph } from '../graph/Graph.class';
import { Flag } from '../graph/Flag.enum';
import { FindPathProgressiveSignature } from './signatures/FindPathSignature';

export function depthFirstSearchProgressive(): FindPathProgressiveSignature {
	// wrapper function is needed for creating
	// a closure for hasFoundPath variable
	// to use it later inside the algorithm function
	
	// after this variable is updated, it toggles the condition inside the scope of
	// all the functions existing currently in the call stack from recursion,
	// to determine whether to continue executing recursive search or not
	let hasFoundPath = false;
	return function* _depthFirstSearchProgressive(this: Graph, node: GraphNode, prevNode?: GraphNode): Generator {
		// pre-order flag
		yield this.flag(node, prevNode, Flag.isVisited);

		if (node.isTarget) {
			hasFoundPath = true;
		}

		const currentNodeId = node.id;

		let newNode = undefined;

		for (let i = 0; i < this.STEPS.length && !hasFoundPath; i++) {
			newNode = this.nodes[currentNodeId + this.STEPS[i]];
			if (this.canVisit(newNode, node, this.STEPS[i])) {
				yield* _depthFirstSearchProgressive.apply(this, [newNode, node]);
			}
		}

		// post-order flag
		if (hasFoundPath) {
			if (node.isTarget) {
				yield this.flag(node, undefined, Flag.isPath);
			} else {
				yield this.flag(node, newNode, Flag.isPath);
			}
		} else {
			yield this.flag(node, prevNode, Flag.isBlocked);
		}

		return hasFoundPath; // for callback message
	}
}
