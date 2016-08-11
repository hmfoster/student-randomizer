import React from 'react';
import NextStudent from './NextStudent.jsx';
import Groups from './Groups.jsx';
import CreateCohort from './CreateCohort.jsx';

class Sticks extends React.Component {
    render () {

        return (
          <div>
            <h3>{this.props.current}</h3>
            <NextStudent nextStudent={this.props.nextStudent} current={this.props.current}/>
            <Groups groups={this.props.groups} current={this.props.current} />
          </div>
        );
    }
}

export default Sticks;
