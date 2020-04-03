import React, { Suspense } from 'react';
import { Navigator, ErrorBoundary } from 'components';
import './App.css';
import UserData from 'context/UserDataContext';
import SuspenseFallback from 'components/SuspenseFallback';

function App() {
  return (
    <>
      <div className="App">
        <ErrorBoundary>
          <UserData>
            <Suspense fallback={<SuspenseFallback />}>
              <Navigator />
            </Suspense>
          </UserData>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
