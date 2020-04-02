import React, { Suspense } from 'react';
import { Navigator, ErrorBoundary } from 'components';
import './App.css';
import UserData from 'context/UserDataContext';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <UserData>
          <Suspense fallback={<div>Loadinggg....</div>}>
            <Navigator />
          </Suspense>
        </UserData>
      </ErrorBoundary>
    </div>
  );
}

export default App;
