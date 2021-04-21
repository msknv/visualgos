import { GraphNode } from '../../graph/interfaces/GraphNode.interface';
import { Flag } from '../../graph/Flag.enum';
import { Graph } from '../../graph/Graph.class';

export function flag(this: Graph, node: GraphNode, prevNode: GraphNode | undefined, flagType: Flag): void {
	if (prevNode) {
		// because `linksMap` is generated based on links objects array via reduce method
		// (`generateLinksMap` function), objects inside the `links` array and the `linksMap`
		// are actually the same in memory, it is just the pointers to them that are different
		// (indexes in `links` array, and keys in `linksMap`), that's why mutating `linksMap` objects
		// will in turn modify the `links` objects as well, thus it's possible just to use that
		// to flag the needed `currentLink`, like this:

		// const currentLink = this.linksMap[`${node.id}-${prevNode.id}`] || this.linksMap[`${prevNode.id}-${node.id}`];
		// currentLink[flagType] = true;

		// but it feels like oblique and not immediately obvious behavior,
		// so to make this (rather critical) piece of code more explicit,
		// and separate concerns of `links` and `linksMap`,
		// I chose to use the `linksMap` only to obtain the index of currentLink
		// whereas the `links` array is predictably used
		// for finding the corresponding link and flagging it

		const currentLinkId = (this.linksMap[`${node.id}-${prevNode.id}`] || this.linksMap[`${prevNode.id}-${node.id}`]).index;
		const currentLink = this.links[currentLinkId as number];
		currentLink[flagType] = true;
	}
	node[flagType] = true;
}
