import React, { useState, useCallback } from 'react';
import { TextField } from '@material-ui/core';

export default function useInput({ defaultValue, id, label, type = 'text', callBackOnChange }) {
  const [value, setValue] = useState('');
  const [error, setErrorValue] = useState('');

  function TextInput() {
    return (
      <TextField
        error={error}
        label={label}
        helperText={error}
        // id={id}
        style={{ marginBottom: '5px', marginTop: '5px' }}
        value={value}
        onChange={handleChange}
      />
    );
  }

  const TextInput2 = (
    <TextField
      error={!!error}
      label={label}
      helperText={error}
      type={type}
      // id={id}
      style={{ marginBottom: '5px', marginTop: '5px' }}
      value={value}
      onChange={handleChange}
    />
  );

  function handleChange(e) {
    if (callBackOnChange instanceof Function) {
      callBackOnChange(e.target.value);
    }
    setValue(e.target.value);
  }

  return [TextInput2, value, setValue, setErrorValue];
}
