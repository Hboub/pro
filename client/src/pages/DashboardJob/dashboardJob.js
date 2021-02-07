import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobs } from '../../modules/profile/profileActions';

import Dashboard from '../../components/Dashboard/Dashboard';
import AddJob from './dashboardJob/AddJob';
import JobList from './dashboardJob/JobList';

class JobDashboard extends Component {
  componentDidMount() {
    this.props.getJobs();
  };

  render() {
    const { auth, history, profile: { profile } } = this.props;

    return (
      <Dashboard name={auth.user.fullname} history={history}>
        <JobList
          jobs={profile && profile.jobs}
        />
        <AddJob />
      </Dashboard>
    );
  }
};

JobDashboard.propTypes = {
  getJobs: PropTypes.func.isRequired
};

export default connect(null, { getJobs })(JobDashboard);