import React, { PropTypes } from 'react';
import CohortSelector from './CohortSelector.jsx';
import CurrentCohort from './CurrentCohort.jsx';

const PopsicleStickApp = ({ allCohorts, current }) => (
  <div>
    <CohortSelector allCohorts={allCohorts} currentName={current.cohortName} />
    <CurrentCohort current={current} />
  </div>
);

PopsicleStickApp.propTypes = {
  allCohorts: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.object,
};

export default PopsicleStickApp;
