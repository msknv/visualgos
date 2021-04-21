import { GraphData } from '../../graph/interfaces/GraphData.interface';

export const testGraphData: GraphData = {
    nodes: [
        { id: 0, isObstacle: false, isStart: true },
        { id: 1, isObstacle: false },
        { id: 2, isObstacle: false },
        { id: 3, isObstacle: false, isTarget: true }
    ],
    // links array is simplified here, D3 in fact transforms
    // `source` and `target` fields after graph initialization
    // putting the corresponding node object in place of its id
    links: [
        { source: 0, target: 1, index: 0 },
        { source: 0, target: 2, index: 1 },
        { source: 1, target: 3, index: 2 },
        { source: 2, target: 3, index: 3 }
    ],
    targetNodeId: 3
};
