import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';

// Import socket and connect
import io from 'socket.io-client';
const socket = io.connect('/');

export default class Student extends React.Component {

    handleDelete(todo) {
        socket.emit('delete student', 'Fromonsters',);
    };

    render() {
        return (<TableRow>

            <TableRowColumn>
                <IconButton iconClassName="fa fa-trash" onFocus={this.handleDelete.bind(this, this.props.student)} />
            </TableRowColumn>
        </TableRow>)
    }
}