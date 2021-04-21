import { LINE_STROKE_WIDTH_PRIMARY, LINE_STROKE_WIDTH_SECONDARY } from '../../configs/parameters';
import { GraphLink } from '../interfaces/GraphLink.interface';

export function lineStrokeWidth({ isVisited, isTarget, isObstacle, isBlocked, isPath }: GraphLink): number {
	if (isVisited || isTarget || isObstacle || isBlocked || isPath ) {
		return LINE_STROKE_WIDTH_PRIMARY;
	}
	
	return LINE_STROKE_WIDTH_SECONDARY;
}
