import { LINE_STROKE_OPACITY_PRIMARY, LINE_STROKE_OPACITY_SECONDARY } from '../../configs/parameters';
import { GraphLink } from '../interfaces/GraphLink.interface';

export function lineStrokeOpacity({ isVisited, isTarget, isObstacle, isBlocked, isPath  }: GraphLink): number {
	if (isVisited || isTarget || isObstacle || isBlocked || isPath ) {
		return LINE_STROKE_OPACITY_PRIMARY;
	}
	
	return LINE_STROKE_OPACITY_SECONDARY;
}
