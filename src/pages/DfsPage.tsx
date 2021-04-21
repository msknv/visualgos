import { GraphSection } from '../components/GraphSection';
import { routes } from '../configs/routes';
import { depthFirstSearchProgressive } from '../algos/dfs-progressive-algo';
import { depthFirstSearchStatic } from '../algos/dfs-static-algo';
import { Legend } from '../components/Legend';
import { SearchType } from '../common-types/SearchType.enum';
import { AlgoPageProps } from './types/AlgoPage.type';

export function DepthFirstSearchPage(props: AlgoPageProps) {
  const {
    graphData,
    isProgressive = true,
    isCompetition = false,
    speed
  } = props;

  let extraProps;

  if (isProgressive) {
    extraProps = {
      searchFunction: depthFirstSearchProgressive,
      isDfsGenerator: true,
      speed
    };
  } else {
    extraProps = {
      isProgressive: false,
      searchFunction: depthFirstSearchStatic
    };
  }

  return(
    <>
      <GraphSection
          title="Depth First Search"
          graphData={graphData}
          isCompetition={isCompetition}
          routes={routes.dfs}
          searchType={SearchType.DFS}
          {...extraProps}
      />
      {!isCompetition
        && <Legend searchType={SearchType.DFS} isProgressive={isProgressive} />}
    </>
  );
}
