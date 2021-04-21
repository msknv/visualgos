import { Component } from 'react';

// because React error boundaries only catch errors that occur during rendering,
// catching and handling errors for asynchronous dfs and bfs algos will be done separately
// todo: add error handling for asynchronous functions
export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    const bodyEl = document.getElementsByTagName('body')[0];
    bodyEl.className = !bodyEl.className.match(/has-error/)
      ? bodyEl.className += ' has-error' : bodyEl.className;
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return(
        <main className="main">
          <h2 className="error-title">Application has encountered an error during rendering</h2>
          <h3 className="error-sub-title">The error is under investigation, and is soon going to be fixed</h3>
          <p>Meanwhile, you can try to <a href="/">{' '}go to the main page</a>.</p>
        </main>
      );
    }
    return this.props.children;
  }
}
