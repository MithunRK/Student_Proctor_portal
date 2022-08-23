const sql = require('./db')
const fetch = require('node-fetch')

const Student =function(student) {
    this.gid = student.gid,
    this.role= "Student"
    // this.profile = student.profile
}


Student.get_profile = (gid, result) => {
    const get_student = sql.query(`select * from student where g_id = "${gid}";`, (err, res) => {
        if(err){
            console.log(err)
            result(err, null)
            return
        }
        if(res.length){
            console.log("Student Found: ", res[0])
            result(null, res[0])
            return
        }
        console.log("No profile")
        result(null, {message: "Profile not found"})
    })
}


Student.get_proc = (gid, result) => {
    const get_proc_query = sql.query(`select p.p_name, p.p_email, p.p_mobile_no from student s, proctor p where s.g_id = "${gid}" and s.proctor_id = p.p_id;`, (err, res) => {
        if (err) {
            console.log("Error!!")
            result(err, null)
            return
        }
        if(res.length){
            console.log(get_proc_query.sql)
            console.log("Student proctor Found!")
            result(null, res[0])
            return
        }
        console.log(get_proc_query.sql)
        console.log("No proctor found!")
        result(null, {message: "Proctor Not Found!"})
        return
    })
}


Student.get_grades = (gid, result) => {
    const get_grades_query = sql.query(`select c.course_id, c.course_name, c.credits, c.course_semester, c.course_department, m.internal, m.see, s.usn from student s, marks m, courses c where s.g_id = "${gid}" and s.usn = m.m_usn and m.m_course_id = c.course_id;`, (err, res) => {
        if(err){
            console.log("Error")
            result(err, null)
            return
        }
        if(res.length){
            console.log(get_grades_query.sql)
            console.log(res)
            result(null, res)
            return
        }
        console.log("No grades found!")
        result(null, {message: "No grades found"})
    })
}


Student.get_details = (gid, result)=> {
    const get_student_details = sql.query(`select * from details where g_id = "${gid}";`, (err, res) => {
        if(err){
            console.log("Error")
            result(err, null)
            return
        }
        if(res.length){
            console.log(get_student_details.sql)
            console.log(res)
            result(null, res[0])
            return
        }
        console.log("No details found!")
        result(null, {message: "No details found"})
    })
}


Student.get_student =(gid, result) => {
    data = {}
    fetch(`http://localhost:8000/student/profile/${gid}`).then(res => res.json()).then((profile) => {
        data.profile = profile
        console.log(profile)
        fetch(`http://localhost:8000/student/proc/${gid}`).then(res => res.json()).then((proc) => {
            data.proc = proc
            console.log(proc)
            fetch(`http://localhost:8000/student/grades/${gid}`).then(res => res.json()).then((grades) => {
                // grades.message = "Found"
                data.marks = grades
                console.log(grades)
                fetch(`http://localhost:8000/student/details/${gid}`).then(res => res.json()).then((details) => {
                    data.details = details
                    console.log(details)
                    result(null, data)
                    return
                })
            })
        })
    })
}


const b = (grades, next) => {
    var check_course = sql.query(`select count(*) as count from marks where m_usn = "${grades.usn}" and m_course_id = "${grades.course_id}";`, (err, res)=> {
        if (err){
            console.log("Error", err)
            next(err, null)
            return
        }
        if(res[0].count == 1)
        {
            var up_marks = sql.query(`update marks set internal = ${grades.internal}, see = ${grades.see} where m_course_id = "${grades.course_id}";`, (err, res) => {
                if(err) {
                    console.log("Error", err)
                    next(err, null)
                    return 
                }
                if(res){
                    console.log(up_marks.sql)
                    grades.message= "Marks Updated"
                    next(null, grades)
                    return
                }
                next({weird: "WeirdError"}, null)
                return
            })
        }
        else{
            console.log(check_course.sql, res)
            var insert_grades = sql.query(`insert into marks values("${grades.m_usn}","${grades.course_id}", ${grades.cie1}, ${grades.cie2}, ${grades.cie3}, ${grades.lab}, ${grades.internal}, ${grades.see}, status = "${grades.status}");`, (err, res)=>{
                if(err){
                    // console.log(err)
                    next(err, null)
                    return
                }
                console.log(res, "Inserted grades!", insert_grades.sql)
                next(null, {message: "Updated Values"})
                return 
            })
        }
    })
}


Student.updateGrades = (data, result)=> {
    let i = 0
    let output = {}
    function up(){
        const x = data.grades[i++]
        if(!x){
            result(null, output)
            return
        }
        return b(x, (err, res)=> {
            if(err){
                result(err, output)
                return
            }
            output[res.course_id] = res
            up();
        })
    }
    up();
}




// Student.updateGrades = (grades, result)=> {
//     var check_course = sql.query(`select count(*) as count from marks where m_usn = "${grades.m_usn}" and m_course_id = "${grades.course_id}";`, (err, res)=> {
//         if (err){
//             console.log("Error", err)
//             result(err, null)
//             return
//         }
//         if(res[0].count == 1)
//         {
//             var up_marks = sql.query(`update marks set cie1 = ${grades.cie1}, cie2 = ${grades.cie2}, cie3 = ${grades.cie3}, lab = ${grades.lab}, internal = ${grades.internal}, see = ${grades.see}, status = "${grades.status}" where m_course_id = "${grades.course_id}";`, (err, res) => {
//                 if(err) {
//                     console.log("Error", err)
//                     console.log("MAggi")
//                     result(err, null)
//                     return
//                 }
//                 if(res){
//                     console.log(res, up_marks.sql)
//                     grades.message= "Marks Updated"
//                     result(null, grades)
//                     return
//                 }
//                 result({weird: "WeirdError"}, null)
//                 return
//             })
//         }
//         else{
//             console.log(check_course.sql, res)
//             var insert_grades = sql.query(`insert into marks values("${grades.m_usn}","${grades.course_id}", ${grades.cie1}, ${grades.cie2}, ${grades.cie3}, ${grades.lab}, ${grades.internal}, ${grades.see}, status = "${grades.status}");`, (err, res)=>{
//                 if(err){
//                     console.log(err)
//                     result(err, null)
//                     return
//                 }
//                 console.log(res, "Inserted grades!", insert_grades.sql)
//                 result(null, {message: "Updated Values"})
//                 return
//             })
//         }
//     })
// }


module.exports = Student