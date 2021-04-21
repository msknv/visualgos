import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ThemeContext } from '../configs/context';
import { routes } from '../configs/routes';
import { generateGraphData } from '../graph/generate-graph-data';
import { Navigation } from '../components/Navigation';
import { DepthFirstSearchPage } from './DfsPage';
import { BreadthFirstSearchPage } from './BfsPage';
import { Legend } from '../components/Legend';
import { SearchType } from '../common-types/SearchType.enum';
import { CompetitionPageProps } from './types/CompetitionPage.type';

export function CompetitionPage(props: CompetitionPageProps) {
  const [ triggerRerender, setTriggerRerender ] = useState(0);
  const { isDark } = useContext(ThemeContext);

  const { isEdgeCase = false, isProgressive = true, hasObstacles = true, speed } = props;

  const graphData = generateGraphData(props.targetNodeId, hasObstacles);
  const { nodes, links } = graphData;
  const targetNodeId = props.targetNodeId || graphData.targetNodeId;

  const reloadGraph = () => {
    setTriggerRerender(triggerRerender => ++triggerRerender);
  };

  useEffect(() => {}, [triggerRerender]);

  const renderGraphs = () => {
    if (isProgressive) {
      return(
        <>
          <DepthFirstSearchPage showLegend={false} isCompetition={true} graphData={{
            nodes: JSON.parse(JSON.stringify(nodes)),
            links: JSON.parse(JSON.stringify(links)),
            targetNodeId
          }} searchType={SearchType.DFS} speed={speed} />
          <BreadthFirstSearchPage showLegend={false} isCompetition={true} graphData={{
            nodes: JSON.parse(JSON.stringify(nodes)),
            links: JSON.parse(JSON.stringify(links)),
            targetNodeId
          }} searchType={SearchType.BFS} speed={speed} />
        </>
      );
    }

    return(
      <>
        <DepthFirstSearchPage isProgressive={false} showLegend={false} isCompetition={true} graphData={{
          nodes: JSON.parse(JSON.stringify(nodes)),
          links: JSON.parse(JSON.stringify(links)),
          targetNodeId
        }} searchType={SearchType.DFS} />
        <BreadthFirstSearchPage isProgressive={false} showLegend={false} isCompetition={true} graphData={{
          nodes: JSON.parse(JSON.stringify(nodes)),
          links: JSON.parse(JSON.stringify(links)),
          targetNodeId
        }} searchType={SearchType.BFS} />
      </>
    );
  };

  return(
    <>
      <section className="competition">
        <h1 className="title">
          DFS-vs-BFS
          <Button
              type="primary"
              ghost={!isDark}
              size="small"
              className="btn-reload"
              icon={<ReloadOutlined />}
              onClick={reloadGraph}
          >
            Reload
          </Button>
        </h1>
        <Navigation routes={routes.dfsVsBfs} />
        <div className="competition-graphs">
          {renderGraphs()}
        </div>
      </section>
      <Legend isCompetition={true} isProgressive={isProgressive} isEdgeCase={isEdgeCase} />
    </>
  );
}
