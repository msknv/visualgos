export const GRAPH_SIDE_LENGTH = 20;

// DIFFICULTY >= 0, DIFFICULTY < 1
// in the context of Math.random(),
// determines the amount of obstacles
export const DIFFICULTY = 0.23;

export const SVG_GRAPH_WIDTH = 290;
export const SVG_GRAPH_HEIGHT = 290;

export const LINE_STROKE_WIDTH_PRIMARY = 2;
export const LINE_STROKE_WIDTH_SECONDARY = 0.5;

export const LINE_STROKE_OPACITY_PRIMARY = 1;
export const LINE_STROKE_OPACITY_SECONDARY = 0.5;

export const CIRCLE_RADIUS = 3;

export const SPEED = 150;
export const SPEED_FAST = 50;
export const START_TIMEOUT = 1200;
export const START_TIMEOUT_COMPETITION = 2200;

export enum COLOR {
	COMMON = '#7b8f99', // Sidewalk Grey (colorsinspo)
	OBSTACLE = '#ff69af', // Ying Guang Se Pink (colorsinspo)
	VISITED = '#448ee4', // The oregon Blue (colorsinspo)
	BLOCKED = '#f5deb3', // Wheat (html5 color)
	PATH = '#bff128', // Yellowy Green (colorsinspo)
	START_TARGET = '#ff8833', // Wildfire (colorsinspo)
}
