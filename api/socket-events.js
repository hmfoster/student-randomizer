module.exports = (socket, entityName) => {
  return rows => {
    rows.each((err, row) => {
      console.log('ROW', row)
      if (err) { return console.log(err); }
      else if (row.new_val && !row.old_val) {
        socket.emit('new ' + entityName , row.new_val.id);
      }
      else if (row.new_val && row.old_val) {
        if (row.new_val.lastChosen !== row.old_val.lastChosen){
          socket.emit('update ' + entityName + ' chosen', row.new_val.lastChosen);
        } else if (row.new_val.students !== row.old_val.students){
          socket.emit('new students', row.new_val.students);
        }
      }
      else if (row.old_val && !row.new_val) {
        socket.emit('delete ' + entityName , row.old_val.id);
      }
    });
  };
};