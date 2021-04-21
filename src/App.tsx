import * as React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { BulbFilled } from '@ant-design/icons';
import { Navigation } from './components/Navigation';
import { routes } from './configs/routes';
import { GRAPH_SIDE_LENGTH, SPEED_FAST } from './configs/parameters';
import { DepthFirstSearchPage } from './pages/DfsPage';
import { BreadthFirstSearchPage } from './pages/BfsPage';
import { AboutPage } from './pages/AboutPage';
import { CompetitionPage } from './pages/CompetitionPage';
import { ThemeContext } from './configs/context';
import { themeLocalStorage } from './utils/theme-local-storage';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [ isDark, setIsDark ] = useState(themeLocalStorage().isDark);
  
  const handleDarkTheme = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };

  useEffect(() => {
    themeLocalStorage().setIsDark(isDark);
  }, [isDark]);

  // variable is used only for one competition edge case
  const lastNodeId = GRAPH_SIDE_LENGTH * GRAPH_SIDE_LENGTH - 1;

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <div className={`container${isDark ? ' dark-mode' : ''}`}>
        <ErrorBoundary>
          <HashRouter>
            <header className="header">
              <Button
                  type="primary"
                  ghost={isDark}
                  size="small"
                  className="btn-theme"
                  title="Set dark theme"
                  onClick={handleDarkTheme}
              >
                <BulbFilled style={{color: isDark ? '#fff' : '#3a3f41'}} />
                Go{isDark ? ' light' : ' dark'}
              </Button>
              <Navigation routes={routes.main} isMain={true} />
            </header>
            <main className="main">
              <Switch>
                <Route path="/dfs/progressive" >
                  <DepthFirstSearchPage />
                </Route>
                <Route path="/dfs/static">
                  <DepthFirstSearchPage isProgressive={false} />
                </Route>
                <Route path="/bfs/progressive">
                  <BreadthFirstSearchPage />
                </Route>
                <Route path="/bfs/static">
                  <BreadthFirstSearchPage isProgressive={false} />
                </Route>
                <Route path="/dfs-vs-bfs/progressive">
                  <CompetitionPage />
                </Route>
                <Route path="/dfs-vs-bfs/static">
                  <CompetitionPage isProgressive={false} />
                </Route>
                <Route path="/dfs-vs-bfs/edge-case-a">
                  <CompetitionPage isEdgeCase={true} targetNodeId={20} hasObstacles={false} speed={SPEED_FAST} />
                </Route>
                <Route path="/dfs-vs-bfs/edge-case-b">
                  <CompetitionPage isEdgeCase={true} targetNodeId={lastNodeId} hasObstacles={false} speed={SPEED_FAST} />
                </Route>
                <Route path="/onboarding">
                  <AboutPage />
                </Route>
                <Route path="/">
                  <Redirect to="/dfs/progressive" />
                </Route>
              </Switch>
            </main>
          </HashRouter>
        </ErrorBoundary>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
