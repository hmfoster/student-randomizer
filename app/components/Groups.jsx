import React from 'react';
import _ from 'lodash';
import Selector from './Selector.js';

class groups extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectValue: 2
      };
    }
    render () {
      let groups = this.props.groups;
      let options = _.range(2,Math.floor(this.props.numStudents/2)+1);
      if (!options.length){
        options.push(2);
      }
      return (
        <div>
          <Selector 
            selectValue={this.state.selectValue}
            onChange={(e)=>{
              this.setState({selectValue: e.target.value});
            }} 
            options={options}
            choice='minimum group size'
          />
          <button onClick={() => {
              socket.emit('CREATE_GROUPS',this.props.current,this.state.selectValue);
            }
          }
          >
          Create Groups!
          </button>
          <ul> 
            {groups.map((group, i) => 
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

                
