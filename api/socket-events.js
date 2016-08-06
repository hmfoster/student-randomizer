module.exports = (socket, entityName) => {
  return rows => {
    rows.each((err, row) => {
      if (err) { return console.log(err); }
      else if (row.new_val && !row.old_val) {
        socket.emit('CREATE_COHORT' , row.new_val);
      }
      else if (row.new_val && row.old_val) {
        if (row.new_val.lastChosen !== row.old_val.lastChosen){
          socket.emit('NEXT_STUDENT', row.new_val.lastChosen);
        } else if (row.new_val.students !== row.old_val.students){
          socket.emit('UPDATE_STUDENTS', row.new_val.id, row.new_val.students);
        }
      }
      else if (row.old_val && !row.new_val) {
        console.log('deleting', row.old_val.id);
        socket.emit('DELETE_COHORT' , row.old_val.id);
      }
    });
  };
};