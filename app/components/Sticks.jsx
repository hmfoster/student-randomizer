import React from 'react';
import CohortSelector from './CohortSelector.jsx';
import NextStudent from './NextStudent.jsx';
import Groups from './Groups.jsx';

class Sticks extends React.Component {
    render () {
        return (
          <div>
            <CohortSelector allCohorts={this.props.allCohorts} currentName={this.props.current.cohortName}/>
            <h3>{this.props.current}</h3>
            <NextStudent nextStudent={this.props.nextStudent} current={this.props.current}/>
            <Groups groups={this.props.groups} current={this.props.current} />
          </div>
        );
    }
}

export default Sticks;