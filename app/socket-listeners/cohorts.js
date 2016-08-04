import io from 'socket.io-client';
const socket = io.connect('/');

export default function(store) {
    socket.on('new cohort', cohortName => {
        store.dispatch({
            type: 'cohort:create',
            cohort: cohortName
        });
        console.log(cohortName + ' has been created');
    });
    socket.on('delete cohort', cohortName => {
        store.dispatch({
            type: 'cohort:delete',
            cohort: cohortName
        });
      console.log('deleted ', cohortName);
    })
    socket.on('update cohort chosen', lastChosen => {
        store.dispatch({
            type:'student:pick',
            picked: lastChosen
        })
      console.log('choose ' + lastChosen);
    })
    socket.on('new students', students => {
        store.dispatch({
            type: 'student:new',
            students: students
        })
      console.log('Students are ' + Object.keys(students));
    })

}