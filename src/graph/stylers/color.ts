import { COLOR } from '../../configs/parameters';
import { GraphNode } from '../interfaces/GraphNode.interface';
import { GraphLink } from '../interfaces/GraphLink.interface';

export function color({ isVisited, isStart, isTarget, isObstacle, isBlocked, isPath }: GraphNode | GraphLink): COLOR {
	if (isObstacle) return COLOR.OBSTACLE;
	if (isBlocked) return COLOR.BLOCKED;
	if (isPath) return COLOR.PATH;
	if (isVisited) return COLOR.VISITED;
	if (isStart || isTarget) return COLOR.START_TARGET;
	return COLOR.COMMON;
}
