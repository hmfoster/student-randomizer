import React from 'react';
import NextStudent from './NextStudent.jsx';
import Groups from './Groups.jsx';
import CreateCohort from './CreateCohort.jsx';

class Sticks extends React.Component {
    render () {
        if (this.props.groups){
            return (
              <div>
                <NextStudent nextStudent={this.props.nextStudent} current={this.props.current}/>
                <Groups groups={this.props.groups} current={this.props.current} />
              </div>
            );
        }
        return (
            null
        )
    }
}

export default Sticks;
