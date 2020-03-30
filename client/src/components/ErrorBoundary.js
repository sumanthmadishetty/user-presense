import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to 3 rd party if any not required right now
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <div
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Click here to reload the page
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
