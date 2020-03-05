import React, { Component } from 'react';
import {withRouter} from 'react-router'
import SignInForm from '../components/SignInForm';

function SignInPage (props) {
  return (<>
    <h1> SignIn Page </h1>
    <SignInForm/>
    </>
  );

}

export default withRouter(SignInPage);