import { COLOR } from '../../configs/parameters';
import { GraphNode } from '../interfaces/GraphNode.interface';

export function circleStroke({ isStart, isTarget }: GraphNode): COLOR | null {
	if (isStart || isTarget) return COLOR.START_TARGET;
	return null;
}
