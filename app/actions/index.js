// Socket triggered actions
// These map to socket-events.js on the server
export const newStudent = (student) => {
    return {
        type: 'student:new',
        student: student
    }
}

export const updateStudent = (student) => {
    return {
        type: 'student:update',
        student: student
    }
}

export const deleteStudent = (student) => {
    return {
        type: 'student:delete',
        student: student
    }
}