import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export default function useInput({
  defaultValue = '',
  id,
  label,
  type = 'text',
  helperText = '',
  callBackOnChange
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setErrorValue] = useState(helperText);

  const TextInput = (
    <TextField
      error={!!(error && error !== helperText)}
      label={label}
      helperText={error}
      type={type}
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

  return [TextInput, value, setValue, setErrorValue];
}
