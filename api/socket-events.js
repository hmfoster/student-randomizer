module.exports = function(socket, entityName) {
  return function(rows) {
    rows.each(function(err, row) {
      if (err) { return console.log(err); }
      else if (row.new_val && !row.old_val) {
        console.log('new', row.new_val);
        socket.emit(entityName + ":insert", row.new_val.id, row.new_val.students);
      }
      else if (row.new_val && row.old_val) {
        console.log('update', row.new_val)
        socket.emit(entityName + ":update", row.new_val);
      }
      else if (row.old_val && !row.new_val) {
        console.log('delete', row.old_val)
        socket.emit(entityName + ":delete", { id: row.old_val.id });
      }
    });
  };
};