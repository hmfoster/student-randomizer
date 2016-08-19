import React, { PropTypes } from 'react';
import _ from 'lodash';
import Selector from './presentational/Selector.js';

class groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: this.getCurrMin(),
    };
  }

  getCurrMin() {
    const lastGroup = this.props.groups[this.props.groups.length - 1];
    return lastGroup ? lastGroup.length : 2;
  }

  render() {
    const groups = this.props.groups;
    let options = _.range(2, Math.floor(this.props.numStudents / 2) + 1);
    if (!options.length) {
      options.push(2);
    }
    return (
      <div>
        <Selector
          selectValue={this.state.selectValue}
          onChange={(e) => {
            this.setState({ selectValue: e.target.value });
          }}
          options={options}
          choice="minimum group size"
        />
        <button
          onClick={() => {
            socket.emit('CREATE_GROUPS', this.props.current, this.state.selectValue);
          }
        }
        >
        Create Groups!
        </button>
        <ul>
          {groups.map((group, i) =>
            <li key={i}> Group {i + 1}
              <ul>
              {group.map((student, j) =>
                <li key={student + j.toString()}> {student} </li>
                )}
              </ul>
            </li>

          )}
        </ul>
      </div>
    );
  }
}

groups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  numStudents: PropTypes.number,
  current: PropTypes.string,
};

export default groups;
