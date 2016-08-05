import React from 'react';
import Dropdown from 'react-dropdown';

const cohorts = [{
  name : 'HRR17',
  students: {
    Hailey : 'Hailey',
    Carlos : 'Carlos',
    Luna : 'Luna',
    Otto : 'Otto'
  },
  lastPicked : 'Otto',
  toPickFrom: ['Luna', 'Hailey', 'Carlos']
}, {
  name : 'HRR18',
  students: {
    Megan : 'Megan',
    Greg : 'Greg',
    April : 'April',
    May : 'May'
  },
  lastPicked : 'May',
  toPickFrom: ['April', 'Megan', 'Greg']
},
];


class Cohort extends React.Component {

    render() {
        return <div>
        <p> Hello world! </p>
          <Dropdown options={['a','b','c']} />

        </div>;
    }
}

export default Cohort;

