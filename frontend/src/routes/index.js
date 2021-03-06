import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Contact from '~/pages/Contact';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Professor from '~/pages/Professor';
import AcademicSubject from '~/pages/AcademicSubject';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/contact" component={Contact} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/professor" component={Professor} isPrivate />
      <Route path="/academicSubject" component={AcademicSubject} isPrivate />

      <Route path="*" component={() => <h1>404</h1>} />
    </Switch>
  );
}
