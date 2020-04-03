import React, { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';

export default function useCaptcha() {
  const [isValid, setValid] = useState(false);
  const [input, setInput] = useState('');
  const [captchaData, setCaptchaData] = useState({ left: '', right: '' });

  useEffect(() => {
    const left = randomInteger(3, 30);
    const right = randomInteger(5, 20);
    setCaptchaData({ left, right });
  }, []);

  function handleChangeInput(e) {
    const {
      target: { value }
    } = e;
    if (!isNaN(Number(value))) {
      setInput(value);
      if (Number(value) === captchaData.left + captchaData.right) {
        return setValid(true);
      }
      return setValid(false);
    }
  }

  const Component = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        border: '1px solid #303F9F',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '10px'
      }}
    >
      <Typography color="primary" variant="h5">
        {captchaData.left}
      </Typography>
      <Typography color="primary" variant="h5">
        +
      </Typography>
      <Typography color="primary" variant="h5">
        {captchaData.right}
      </Typography>
      <Typography color="primary" variant="h5">
        {' '}
        ={' '}
      </Typography>
      <TextField
        type="text"
        value={input}
        onChange={handleChangeInput}
        style={{
          width: '30px',
          border: '1px solid #303F9F',
          borderRadius: '5px'
        }}
        inputProps={{ style: { color: '#303F9F' } }}
      />
    </div>
  );

  return [Component, isValid];
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
