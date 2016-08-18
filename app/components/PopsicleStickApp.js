import React from 'react';
import CohortSelector from './CohortSelector.jsx';
import CurrentCohort from './CurrentCohort.jsx';

const PopsicleStickApp = ({allCohorts, current}) => (
  <div>
    <CohortSelector allCohorts={allCohorts} currentName={current.cohortName}/> 
    <CurrentCohort current={current}/>
  </div>
);


export default PopsicleStickApp;
