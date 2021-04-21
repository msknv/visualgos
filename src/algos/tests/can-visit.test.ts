import { Graph } from '../../graph/Graph.class';
import { depthFirstSearchStatic } from '../dfs-static-algo';
import { SearchType } from '../../common-types/SearchType.enum';
import { generateLinksMap } from '../../graph/generate-links-map';
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

const TOP_RIGHT_NODE = testNodes[Math.sqrt(testNodes.length) - 1];

describe('can visit the next graph node', () => {
    test('can not visit new node one step right from the top right node', () => {
        const STEP_RIGHT: number = testGraph.Step.RIGHT;
        const newNode = testNodes[TOP_RIGHT_NODE.id + STEP_RIGHT];
        expect(testGraph.canVisit(newNode, TOP_RIGHT_NODE, STEP_RIGHT)).toEqual(false);
    });

    test('can visit new node one step down from the top right node', () => {
        const STEP_DOWN: number = testGraph.Step.DOWN;
        const newNode = testNodes[TOP_RIGHT_NODE.id + STEP_DOWN];
        expect(testGraph.canVisit(newNode, TOP_RIGHT_NODE, STEP_DOWN)).toEqual(true);
    });

    test('can not visit new node one step up from the top right node', () => {
        const STEP_UP: number = testGraph.Step.UP;
        const newNode = testNodes[TOP_RIGHT_NODE.id + STEP_UP];
        expect(testGraph.canVisit(newNode, TOP_RIGHT_NODE, STEP_UP)).toEqual(false);
    });
});
