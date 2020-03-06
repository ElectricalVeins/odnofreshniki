import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
import Input from '../Input';

export default class SignUpForm extends Component {

  handleSubmit = (values) => {
    console.log(values);
    //server query
  };

  render () {
    return (
      <Formik onSubmit={this.handleSubmit}
              initialValues={{
                email: '',
                password: '',

              }}>
        {
          ({ formikProps }) => (
            <Form>
              <Field
                     type='email'
                     name='email'
                     component={Input}/>
              <Field type='password'
                     name='password'
              />
              <div onClick={formikProps.submitForm}>SignUp</div>
            </Form>
          )
        }
      </Formik>
    );
  }
}