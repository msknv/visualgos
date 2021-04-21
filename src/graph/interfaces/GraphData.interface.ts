import { GraphNode } from './GraphNode.interface';
import { GraphLink } from './GraphLink.interface';
import { LinksMap } from './LinksMap.interface';

export interface GraphData {
    nodes: GraphNode[],
    links: GraphLink[],
    targetNodeId: number,
    linksMap?: LinksMap<GraphLink>
}
