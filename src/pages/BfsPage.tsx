import { GraphSection } from '../components/GraphSection';
import { routes } from '../configs/routes';
import { breadthFirstSearchProgressive } from '../algos/bfs-progressive-algo';
import { breadthFirstSearchStatic } from '../algos/bfs-static-algo';
import { Legend } from '../components/Legend';
import { SearchType } from '../common-types/SearchType.enum';
import { AlgoPageProps } from './types/AlgoPage.type';

export function BreadthFirstSearchPage(props: AlgoPageProps) {
  const {
    graphData,
    isProgressive = true,
    isCompetition,
    speed
  } = props;

  let extraProps;

  if (isProgressive) {
    extraProps = {
      searchFunction: breadthFirstSearchProgressive,
      speed
    };
  } else {
    extraProps = {
      isProgressive: false,
      searchFunction: breadthFirstSearchStatic
    };
  }

  return(
    <>
      <GraphSection
        title="Breadth First Search"
        graphData={graphData}
        isCompetition={isCompetition}
        routes={routes.bfs}
        searchType={SearchType.BFS}
        {...extraProps}
      />
      {!isCompetition
        && <Legend searchType={SearchType.BFS} isProgressive={isProgressive} />}
    </>
  );
}
