import { Selection } from 'd3';
import { color } from './stylers/color';
import { lineStrokeOpacity } from './stylers/line-stroke-opacity';
import { lineStrokeWidth } from './stylers/line-stroke-width';
import { Graph } from './Graph.class';

export function updateGraph(this: Graph, svg: Selection<SVGSVGElement, unknown, null, undefined>): void {
    svg.selectAll('line')
        .data(this.links)
        .join('line')
        .attr('stroke', color)
        .attr('stroke-opacity', lineStrokeOpacity)
        .attr('stroke-width', lineStrokeWidth);

    svg.selectAll('circle')
        .data(this.nodes)
        .join('circle')
        .attr('fill', color);
}
