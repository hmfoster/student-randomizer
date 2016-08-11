import React from 'react';
import NextStudent from './NextStudent.jsx';
import Groups from './Groups.jsx';
import CreateCohort from './CreateCohort.jsx';

class Sticks extends React.Component {
    render () {
        if (this.props.current === 'Create'){
            return (
                <CreateCohort />
            )
        }
        else if (this.props.current !== '' && this.props.current !== 'initial'){
            return (
              <div>
                <h3>{this.props.current}</h3>
                <NextStudent nextStudent={this.props.nextStudent} current={this.props.current}/>
                <Groups groups={this.props.groups} current={this.props.current} />
              </div>
            );
        } else {
            return null;
        }
    }
}

export default Sticks;
