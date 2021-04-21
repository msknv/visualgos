import { Selection } from 'd3';
import { GraphNode } from '../interfaces/GraphNode.interface';
import { GraphLink } from '../interfaces/GraphLink.interface';
import { LinksMap } from '../interfaces/LinksMap.interface';

export type RenderGraphD3 = {
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    node: Selection<SVGCircleElement, GraphNode, SVGGElement, unknown>,
    link: Selection<SVGLineElement, GraphLink, SVGGElement, unknown>,
    nodes: GraphNode[],
    links: GraphLink[],
    linksMap?: LinksMap<GraphLink>,
    targetNode: GraphNode,
    unmountGraph: () => void
};
