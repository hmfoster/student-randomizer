const _ = require('lodash');

module.exports = (socket) =>
  rows => {
    rows.each((err, row) => {
      const newVal = row.newVal;
      const oldVal = row.oldVal;

      if (err) {
        return console.log(err);
      } else if (newVal && !oldVal) {
        socket.emit('CREATE_COHORT', newVal.id, newVal.students,
          newVal.lastChosen, newVal.groups);
      } else if (newVal && oldVal) {
        if (!_.isEqual(newVal.lastChosen, oldVal.lastChosen)) {
          socket.emit('NEXT_STUDENT', newVal.lastChosen);
        } else if (!_.isEqual(newVal.students, oldVal.students)) {
          socket.emit('UPDATE_STUDENTS', newVal.students);
        } else if (!_.isEqual(newVal.groups, oldVal.groups)) {
          socket.emit('CREATE_GROUPS', newVal.groups);
        }
      } else if (oldVal && !newVal) {
        socket.emit('DELETE_COHORT' , row.oldVal.id);
      }
      return null;
    });
  };
