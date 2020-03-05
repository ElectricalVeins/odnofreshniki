import React, { Component } from 'react';
import styles from './Input.modules.scss';
import classNames from 'classnames';

function Input (props) {
  const { field, form,...rest } = props;
  return <input {...field} {...rest}/>;
}

export default Input;