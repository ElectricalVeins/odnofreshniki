import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SignUpForm from '../components/SignUpForm';

function SignUpPage (props) {
  return (<>
      <h1>
        Sign Up Page
      </h1>
      {/*<SignUpForm/>*/}
    </>
  );

}

export default withRouter(SignUpPage);