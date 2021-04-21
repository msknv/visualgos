import { GraphNode } from '../../graph/interfaces/GraphNode.interface';
import { Graph } from '../../graph/Graph.class';

export function canVisit(
	this: Graph,
	// `undefined` value for `node` field is possible here when the index
	// of the new node (based on Step) is out of bounds of existing nodes array.
	// we can rely on the `undefined` here because all the values inside
	// the nodes array are known. checking the new index versus the array length
	// beforehand would be redundant in this case. it can be done in JavaScript
	// because it doesn't have the concept of "out of bounds" array indexes
	node: GraphNode | undefined,
	prevNode: GraphNode | undefined,
	step: number | undefined
): boolean {
	if (!node) {
		return false;
	}

	if (step === this.Step.RIGHT && node.id % this.graphSideLength === 0) {
		return false;
	}
	
	if (step === this.Step.LEFT && (prevNode as GraphNode).id % this.graphSideLength === 0) {
		return false;
	}
	
	return !(node.isVisited || node.isObstacle);
}
