import React from 'react';
import { Input } from 'antd';

const InputField = (props) => {
  return(
    <Input onChange={ props.onChange }
           className={ props.classNames }
           size={ props.size }
           name={ props.name }
           value={ props.value }
           placeholder={ props.placeholder } />
  )
}

export default InputField;
