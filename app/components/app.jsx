import React from 'react';
import AppBar from 'material-ui/AppBar/AppBar.jsx';
import StudentList from './StudentList.jsx';
import AddStudent from './addStudent.jsx';

import { connect } from 'react-redux';

class Main extends React.Component {
    render() {
        return (<div>
            <AppBar title="Popsicle Sticks" iconClassNameRight="muidocs-icon-navigation-expand-more" />
            <StudentList students={this.props.students} />
            <AddTodo />
        </div>);
    }
}

function mapStateToProps(students) {
    return { students };
}

export default connect(mapStateToProps)(Main);