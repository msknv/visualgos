import { GRAPH_SIDE_LENGTH, DIFFICULTY } from '../configs/parameters';
import { generateLinksMap } from './generate-links-map';
import { GraphNode } from './interfaces/GraphNode.interface';
import { GraphData } from './interfaces/GraphData.interface';
import { GraphLink } from './interfaces/GraphLink.interface';

// MDN Web Docs - Math.random() article
function getRandomInt(min: number, max: number): number {
  // the maximum is exclusive
  // and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateGraphData(_targetNodeId?: number, hasObstacles: boolean = true): GraphData {
  // data generation for graph is based upon example:
  // https://observablehq.com/@d3/force-directed-lattice

  const n = GRAPH_SIDE_LENGTH;
  const nodes: GraphNode[] = Array.from({ length: n * n }, (_, i) => {
    if (i === 0) {
      return { id: i, isObstacle: false, isStart: true };
    }
    return { id: i, isObstacle: hasObstacles ? Math.random() < DIFFICULTY : false };
  });

  _targetNodeId = _targetNodeId || getRandomInt(200, nodes.length);
  nodes[_targetNodeId].isObstacle = false;
  nodes[_targetNodeId].isTarget = true;

  const links: GraphLink[] = [];
  for (let y = 0; y < n; ++y) {
    for (let x = 0; x < n; ++x) {
      if (y > 0) links.push({ source: (y - 1) * n + x, target: y * n + x });
      if (x > 0) links.push({ source: y * n + (x - 1), target: y * n + x });
    }
  }

  // create Map to faster access the needed link
  // between two nodes inside the flag function
  const _linksMap = generateLinksMap(links);

  return { nodes, links, targetNodeId: _targetNodeId, linksMap: _linksMap };
}
