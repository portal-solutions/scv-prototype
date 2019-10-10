import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BenefitsServices from './BenefitsServices';
import BookAppointment from './BookAppointment';
import Greeting from './Greeting/Greeting';
import Home from './Home';
import Inbox from './Inbox';
import JobsSkills from './JobsSkills';
import LetsConnect from './LetsConnect';
import Notifications from './Notifications';
import Preferences from './Preferences';
import Profile from './Profile';

const Private = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} component={Home} exact />
      <Route path={`${match.path}/benefits-services`} component={BenefitsServices} exact />
      <Route path={`${match.path}/book-appointment`} component={BookAppointment} exact />
      <Route path={`${match.path}/inbox`} component={Inbox} exact />
      <Route path={`${match.path}/jobs-skills`} component={JobsSkills} exact />
      <Route path={`${match.path}/lets-connect`} component={LetsConnect} exact />
      <Route path={`${match.path}/notifications`} component={Notifications} exact />
      <Route path={`${match.path}/preferences`} component={Preferences} exact />
      <Route path={`${match.path}/profile`} component={Profile} />

      {/* TODO :: GjB :: remove this eventually */}
      <Route path={`${match.path}/greeting`} component={Greeting} />
    </Switch>
  );
};

export default Private;
