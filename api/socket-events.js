const _ = require('lodash');

module.exports = (socket) =>
  rows => {
    rows.each((err, row) => {
      const newVal = row.new_val;
      const oldVal = row.old_val;
      if (err) {
        return console.log(err);
      } else if (newVal && !oldVal) {
        return socket.emit('CREATE_COHORT', newVal.id, newVal.students,
          newVal.lastChosen, newVal.groups);
      } else if (newVal && oldVal) {
        if (!_.isEqual(newVal.lastChosen, oldVal.lastChosen)) {
          return socket.emit('NEXT_STUDENT', newVal.lastChosen);
        } else if (!_.isEqual(newVal.students, oldVal.students)) {
          return socket.emit('UPDATE_STUDENTS', newVal.students);
        } else if (!_.isEqual(newVal.groups, oldVal.groups)) {
          return socket.emit('CREATE_GROUPS', newVal.groups);
        }
      } else if (oldVal && !newVal) {
        return socket.emit('DELETE_COHORT' , row.oldVal.id);
      }
      return null;
    });
  };
