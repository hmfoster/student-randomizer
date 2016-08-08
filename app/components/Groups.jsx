import React from 'react';

class groups extends React.Component {
    render () {
        return (
          <div>
            <button onClick={() => {
                socket.emit('CREATE_GROUPS',this.props.current,3);
              }
            }
            >
            Create Groups!
            </button>
            <ul> 
              {this.props.groups.map((group, i) => 
                <li key={i}> Group {i+1} 
                  <ul>
                  {group.map((student, i) =>
                    <li key={student + i.toString()}> {student} </li>
                    )}
                  </ul>
                </li>
                  
  
              )}
            </ul>
          </div>
        );
    }
}

export default groups;
