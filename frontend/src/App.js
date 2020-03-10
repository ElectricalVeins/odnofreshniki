import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage.js'));
const SignUpPage = lazy(() => import ('./pages/SignUpPage.js'));
const SignInPage = lazy(() => import ('./pages/SignInPage.js'));

const Fallback = (<div>Loading...</div>);

function App () {
  return (
    <Router>
      <Suspense fallback={Fallback}>
        <Switch>

          <Route exact path='/' component={HomePage}/>
          <Route path='/sign_up/:value' component={SignUpPage}/>
          <Route path={['/sign_in', '/login']} component={SignInPage}/>

        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
