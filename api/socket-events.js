var _ = require('lodash');

module.exports = (socket, entityName) => {
  return rows => {
    rows.each((err, row) => {
      const new_val = row.new_val;
      const old_val = row.old_val;

      if (err) { return console.log(err); }
      
      else if (new_val && !old_val) {
        socket.emit('CREATE_COHORT' , new_val.id, new_val.students, 
          new_val.lastChosen, new_val.groups);
      }
      
      else if (new_val && old_val) {
        
        if (!_.isEqual(new_val.lastChosen, old_val.lastChosen)){
          socket.emit('NEXT_STUDENT', new_val.id, new_val.lastChosen);
        } 

        else if (!_.isEqual(new_val.students, old_val.students)){
          socket.emit('UPDATE_STUDENTS', new_val.id, new_val.students);
        } 

        else if (!_.isEqual(new_val.groups, old_val.groups)){
          socket.emit('CREATE_GROUPS', new_val.id, new_val.groups);
        }
      }
      else if (old_val && !new_val) {
        socket.emit('DELETE_COHORT' , row.old_val.id);
      }
    });
  };
};