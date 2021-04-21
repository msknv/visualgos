import { GraphNode } from './GraphNode.interface';

export interface GraphLink {
    id?: number,
    index?: number,
    isVisited?: boolean,
    isBlocked?: boolean,
    isPath?: boolean,
    source: GraphNode | number,
    target: GraphNode | number,
    isStart?: boolean,
    isTarget?: boolean,
    isObstacle?: boolean
}
