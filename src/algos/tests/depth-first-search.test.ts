import { depthFirstSearchStatic } from '../dfs-static-algo';
import { Graph } from '../../graph/Graph.class';
import { SearchType } from '../../common-types/SearchType.enum';
import { GraphData } from '../../graph/interfaces/GraphData.interface';
import { generateLinksMap } from '../../graph/generate-links-map';
import { GraphNode } from '../../graph/interfaces/GraphNode.interface';
import { GraphLink } from '../../graph/interfaces/GraphLink.interface';
import { testGraphData } from './test-graph-data';

const {
    nodes: testNodes,
    links: testLinks,
    targetNodeId: testTargetNodeId
} = testGraphData;

testGraphData.linksMap = generateLinksMap(testLinks);

const testGraph = new Graph(
    testNodes,
    testLinks,
    testGraphData.linksMap,
    testNodes[testTargetNodeId],
false,
    depthFirstSearchStatic,
    SearchType.DFS
);

const resultedTestGraphData: GraphData = Object.assign({}, testGraphData, {
    nodes: [
        { id: 0, isObstacle: false, isStart: true, isVisited: true, isPath: true },
        { id: 1, isObstacle: false, isVisited: true, isPath: true },
        { id: 2, isObstacle: false },
        { id: 3, isObstacle: false, isTarget: true, isVisited: true, isPath: true }
    ],
    links: [
        { source: 0, target: 1, index: 0, isVisited: true, isPath: true, },
        { source: 0, target: 2, index: 1 },
        { source: 1, target: 3, index: 2, isVisited: true, isPath: true, },
        { source: 2, target: 3, index: 3 }
    ]
});

describe('depth-first search static', () => {
    const result = testGraph.findPath(testNodes[0]);

    test('a path has been found', () => {
        expect(result).toEqual<boolean>(true);
    });

    test('nodes have been modified correctly', () => {
        expect(testGraph.nodes).toEqual<GraphNode[]>(resultedTestGraphData.nodes);
    });

    test('links have been modified correctly', () => {
        expect(testGraph.links).toEqual<GraphLink[]>(resultedTestGraphData.links);
    });
});
