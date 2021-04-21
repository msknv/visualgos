import { GraphLink } from './interfaces/GraphLink.interface';
import { GraphNode } from './interfaces/GraphNode.interface';
import { LinksMap } from './interfaces/LinksMap.interface';

export function generateLinksMap(links: GraphLink[], isCompetition: boolean = false): LinksMap<GraphLink> {
  // for competition pages where we need isolated data sets
  // the links map is needed to be generated after
  // d3s processes the data transforming `links` objects
  // and changing its `source` and `target` fields
  // from `number` to `GraphNode` object
  const currIds = ({ source, target }: GraphLink) => {
    let _sourceId, _targetId;
    if (isCompetition) {
      _sourceId = (source as GraphNode).id;
      _targetId = (target as GraphNode).id;
    } else {
      _sourceId = source;
      _targetId = target;
    }
    return {
      sourceId: _sourceId,
      targetId: _targetId
    };
  };

  return links.reduce((acc, curr: GraphLink) => {
    const { sourceId, targetId } = currIds(curr);
    acc = { ...acc, [`${sourceId}-${targetId}`]: curr };
    return acc;
  }, {} as LinksMap<GraphLink>);
}
