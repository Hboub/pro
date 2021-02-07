import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty } from './JobList.styles';
import Job from './jobList/Job';

const JobList = ({ jobs }) => (
  <>
    {jobs.length === 0 && <Empty>No offer has been added yet.</Empty>}
    <List>
      {jobs.map(job => (
        <Job key={job._id} {...job} />
      ))}
    </List>
  </>
);

JobList.propTypes = {
  jobs: PropTypes.array
};

export default JobList;