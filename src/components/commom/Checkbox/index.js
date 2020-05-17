import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import {FormCheck} from 'react-bootstrap';

export default function Checkbox({ name, ...rest }) {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "checked",
    });
  }, [fieldName, registerField]);
  return (
    <>
      <FormCheck ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </>
  );
}
