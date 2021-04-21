import { visitChildren, VisitChildrenSignature } from '../algos/helpers/visit-children-bfs';
import { GraphNode } from './interfaces/GraphNode.interface';
import { SearchType } from '../common-types/SearchType.enum';
import { GraphLink } from './interfaces/GraphLink.interface';
import { LinksMap } from './interfaces/LinksMap.interface';
import { FindPathSignature, FindPathWrapperSignature } from '../algos/signatures/FindPathSignature';
import { canVisit } from '../algos/helpers/can-visit';
import { flag } from '../algos/helpers/flag';
import { updateGraph } from './update-graph';

// `nodes` and `links` (and `targetNode` for bfs) are dependencies
// that are used in every search function.
// to avoid explicitly injecting them every time
// as arguments for wrapper function when we call it
// as `searchFunction(nodes, links, targetNode)(startNode)`,
// I decided to abstract them out to `Graph` object constructor (class)
// to use them as `this.nodes` and `this.links` inside search function itself,
// that is attached to the `findPath` method during a new Graph object instantiation
class Graph {
    nodes: GraphNode[];
    links: GraphLink[];
    linksMap: LinksMap<GraphLink>;
    targetNode: GraphNode;
    findPath: FindPathSignature;
    visitChildren?: VisitChildrenSignature;
    graphSideLength: number;

    constructor(
        nodes: GraphNode[],
        links: GraphLink[],
        linksMap: LinksMap<GraphLink>,
        targetNode: GraphNode,
        isDfsGenerator: boolean = false,
        findPath: FindPathSignature,
        searchType: SearchType
) {
        this.nodes = nodes;
        this.links = links;
        this.linksMap = linksMap;
        this.targetNode = targetNode;
        this.graphSideLength = Math.sqrt(nodes.length);
        // for dfs-progressive algo there is a wrapper function
        // that holds a closure variable that is used inside the algo
        this.findPath = isDfsGenerator ? (findPath as FindPathWrapperSignature)() : findPath;
        if (searchType === SearchType.BFS) {
            this.visitChildren = visitChildren;
        }
    }

    canVisit = canVisit;
    flag = flag;
    updateGraph = updateGraph;

    get Step() {
        const _graphSideLength = this.graphSideLength;
        enum _Step {
            RIGHT = 1,
            DOWN = _graphSideLength,
            LEFT = -1,
            UP = -_graphSideLength
        }
        return _Step;
    }

    get STEPS(): [
        number,
        number,
        number,
        number
    ] {
        return [
            this.Step.RIGHT,
            this.Step.DOWN,
            this.Step.LEFT,
            this.Step.UP
        ];
    };
}

export { Graph };
