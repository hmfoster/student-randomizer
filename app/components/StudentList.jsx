import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import Student from './student.jsx';

export default class StudentList extends React.Component {
    render() {
        return (<Table>
            <TableBody>
                {this.props.students.map(student => <Student key={student.id} student={student} /> )}
            </TableBody>
        </Table>);
    }
}