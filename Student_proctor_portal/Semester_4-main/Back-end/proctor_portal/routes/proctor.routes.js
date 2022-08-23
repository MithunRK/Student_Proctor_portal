module.exports = app => {
    const proctor = require('../controllers/proctor.controller')

    app.get("/proctor/profile/:pid", proctor.profile)

    app.get("/proctor/students/:pid", proctor.students)

    app.get("/proctor/:pid", proctor.getAll)

} 
