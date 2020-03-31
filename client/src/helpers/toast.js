/* eslint-disable import/prefer-default-export */

import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';

export function renderToast() {
  function Toast(props) {
    const [open, setOpen] = useState(true);
    if (open)
      return <Snackbar open={open} onClose={() => setOpen(false)} message="I love snacks" />;
  }

  return ReactDOM.createPortal(<Toast />, document.getElementById('root'));
}
