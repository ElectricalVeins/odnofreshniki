import React, { Component } from 'react';
import { Form, Formik, Field, withFormik } from 'formik';

function Input (props) {
  console.log(props);
  return <input style={{ border:'5px solid red'}} type="text"/>;
}

export default Input;