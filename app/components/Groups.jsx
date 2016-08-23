import React from 'react';
import _ from 'lodash';
import Selector from './presentational/Selector.jsx';
import store from '../stores/stores.js';

class groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: this.getCurrMin(),
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCurrMin() {
    const lastGroup = store.getState().currentCohort
                      .groups[store.getState().currentCohort.groups.length - 1];
    return lastGroup ? lastGroup.length : 2;
  }

  render() {
    const current = store.getState().currentCohort;
    const groups = current.groups;
    const numStudents = Object.keys(current.students).length;
    let options = _.range(2, Math.floor(numStudents / 2) + 1);
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
            socket.emit('CREATE_GROUPS', current.cohortName, this.state.selectValue);
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

export default groups;
