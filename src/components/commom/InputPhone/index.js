import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import InputMask from 'react-input-mask';

function InputPhone({ name, ...rest }) {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      clearValue: (ref) =>{
        ref.setInputValue('');
      }
    });
  }, [fieldName, registerField]);
  return (
    <>
      <InputMask mask="+55 (99) 99999-9999" ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </>
  );
}

export default InputPhone;
