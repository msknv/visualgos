export interface GraphNode {
    id: number,
    isVisited?: boolean,
    isStart?: boolean,
    isTarget?: boolean,
    isObstacle: boolean,
    isBlocked?: boolean,
    isPath?: boolean,
    parentId?: number,
    x?: number,
    y?: number
}
