import React, { Suspense } from 'react';
import { Navigator, ErrorBoundary } from 'components';
import './App.css';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={() => <div>Loadinggg....</div>}>
          <Navigator />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
