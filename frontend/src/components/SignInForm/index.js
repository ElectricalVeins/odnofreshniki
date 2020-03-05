import React, { Component } from 'react';
import { Form, Formik, Field, withFormik } from 'formik';
import Input from '../Input';

const handleSubmit = (values) => {
  console.log(values);
  //server query
};

const SignInForm = (props) => {

  const emailValidate = (value) => {

  };

  return (
    <Form>
      <Field validate={emailValidate} type='email' name='email'
             component={Input}/>
      <Field type='password' name='password'/>
      <div onClick={props.submitForm}>Login</div>
    </Form>
  );

};

export default withFormik({
                            mapPropsToValues: () => ({
                              email: '',
                              password: ''
                            }),
                            initialValues: {
                              email: '',
                              password: '',
                            },
                            handleSubmit
                          })(SignInForm);