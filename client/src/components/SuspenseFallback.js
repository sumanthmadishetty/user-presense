import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function SuspenseFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <LinearProgress style={{ height: '3px', width: '80%' }} />
    </div>
  );
}
