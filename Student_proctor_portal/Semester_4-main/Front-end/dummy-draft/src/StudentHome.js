import React from "react";
import BasicForm from "./home";
import MaterialTable from 'material-table';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import { Navbar, Nav, NavDropdown, Image, Table,
  //  Tab, Tabs, 
   Button
//   Form, Button
 } from 'react-bootstrap';




class StudentHome extends React.Component {
    constructor(props){
      super(props)
      this.changeEditable = this.changeEditable.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
      this.state = {
        authInstance:0,
        name:false,
        email:0,
        img:0,
        gId:10000,
        sgpa:[0],
        status: null,
        role: "Student",
        data: {department: "CSE", batch:"2024"},
        isSignedIn: false,
        profile:{
          department:"",
          batch: ""
        },
        proctor: {
          p_name:"",
          p_email:""
        },
        gradesReal: [[{course_semester: 10, course_id: 1}, {course_semester: 9, course_id: 2}, {course_semester: 8, course_id:3}]],
        editable: 0
      }
    }
    async componentDidMount(){
      // console.log("Working")
      // console.log(this.props)
      await fetch(`/student/${this.props.data.gId}`).then(res => res.json().then( value=> {
        // console.log(value)
        this.setState({
          img: this.props.img,
          profile: value.profile,
          details: value.details,
          proctor: value.proc,
          grades: value.marks,
          isSignedIn: true
        })
        this.cleanGrades(value.marks, value.profile.semester)
      }))
    }
  
    computeCGPA(credits, sem){
      var i = 1
      var cgpa = 0
      var sum = 0
      var s = {}
  
      for(; i<sem; i++){
        let sgpa = 0
        var grades = this.state.gradesReal[i]
        grades.map(course => {
          var score = 0
          score = course.internal+(course.see/2)
          if(score>= 90){
            sgpa += 10*course.credits
          }
          else if(score>= 80){
            sgpa += 9*course.credits
          }
          else if(score>= 75){
            sgpa += 8*course.credits
          }
          else if(score>= 60){
            sgpa += 7*course.credits
          }
          else if(score>= 50){
            sgpa += 6*course.credits
          }
          else if(score>= 40){
            sgpa += 5*course.credits
          }
          else{
            sgpa += 0
          }
         return 0
        })
        cgpa += sgpa
        sgpa /= credits[i]
        sum += credits[i]
        s[i] = sgpa
      }
      cgpa /= sum
      // console.log(cgpa)
      this.setState({sgpa: s, cgpa: cgpa})
    }
  
  
    cleanGrades(grades, sem){
      var i = 1
      var group = []
      var t_c = {}
      if(grades.message === "No grades found"){
        return
      }
      while(i< sem){
        var total_credits = 0
        group[i] = []
        for(var j = 0; j<grades.length; j++){
          var element = grades[j]
          if (element.course_semester === i){
            total_credits += element.credits
            
            group[i].push(element)
            
          }
        }
        t_c[i] = total_credits
        i += 1
      }
      this.setState({gradesReal: group})
      this.computeCGPA(t_c, sem)
    }
  
    async changeEditable(){
      console.log("Boom")
      if(this.state.editable === 0){
        var e_marks = document.getElementsByClassName("editable")
        for (var j=0; j < e_marks.length; j++) {
          e_marks[j].removeAttribute('readOnly')
        }
        this.setState({editable: 1})
      }
      else{
        var e_mark = document.getElementsByClassName("editable")
        for (var i=0; i < e_mark.length; i++) {
          e_mark[i].setAttribute('readOnly', 'readOnly')
        }
        this.setState({editable: 0})
        let cgrades = this.state.grades
        let l = cgrades.length
        for(let k = 0;k<l; k++) {
          var course = cgrades[k]
          var elements = document.getElementsByClassName(course.course_id)
          cgrades[k].internal = parseInt(elements[0].value)
          cgrades[k].see = parseInt(elements[1].value)
        }
        this.setState({grades: cgrades})
        this.cleanGrades(cgrades, this.state.profile.semester)
        var requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            grades: this.state.grades
    
        })}
        await fetch(`http://localhost:8000/student/grades`, requestOptions).then(() => console.log("Done"))
      }
    }
  
  
  
  
    render(){
      return(<>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Image src = {this.props.data.img} alt = "" width = "40" rounded></Image>
            <NavDropdown title={this.state.profile.email} id="collasible-nav-dropdown">
                <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                    <Image src={this.props.data.img} alt="" width = "2" rounded/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="profile-head">
                  <h5>{this.state.profile.name}</h5>
                  <h5>{this.state.profile.department} Deaprtment</h5>
                  <h5>Batch - {this.state.profile.batch}</h5>
                  <h5>Proctor - {this.state.proctor.p_name}</h5>
                  <h5>Proctor Email - {this.state.proctor.p_email}</h5>
                  <h5>Proctor Mobile No: {this.state.proctor.p_mobile_no}</h5>
                </div>
            </div>
            <div className="col-md-2">
                <input type="submit"  onClick = {this.props.data.authInstance.signOut} className="profile-edit-btn" name="btnAddMore" value="Sign Out"/>
            </div>
        </div>
          <div className="profile-tab" >
              <div id="home" aria-labelledby="home-tab">
              <br></br><br></br>
                <div className="row">
                    <div className="col-md-2">
                        <label>Name :</label>
                    </div>
                    <div className="col-md-4">
                        <p>{this.state.profile.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Email :</label>
                    </div>
                    <div className="col-md-4">
                        <p>{this.state.profile.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Date of Birth : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.profile.dob}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Semester : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.profile.semester}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>CGPA : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{(this.state.cgpa)?this.state.cgpa.toFixed(2):9}</p>
                    </div>
                </div>
                <div>
                  <div>
                    <input id="edit" className="profile-edit-btn" type="button" onClick={this.changeEditable} value={(this.state.editable)?"Update":"Edit"}/>
                  </div>
                  {
                    this.state.gradesReal.map((semester, i)=> {
                      var sem = semester[0].course_semester
                      var sgpa = this.state.sgpa[sem]
                      return <div key={i}><Table responsive="sm">
                        <thead>
                        <tr>
                          <th>Semester : {semester[0].course_semester}</th>
                          <th>Course Name</th>
                          <th>Credits</th>
                          <th>Internals</th>
                          <th>Semester</th>
                        </tr>
                        </thead>
                        <tbody>{
                          semester.map((courses, idx)=> {
                            return (<tr key={idx}>
                              <td>{courses.course_id}</td>
                              <td>{courses.course_name}</td>
                              <td>{courses.credits}</td>
                              <td><input type="text" readOnly='readOnly' className={`editable ${courses.course_id} ${courses.course_semester}`} defaultValue={courses.internal}/></td>
                              <td><input type="text" readOnly='readOnly' className={`editable ${courses.course_id} ${courses.course_semester}`} defaultValue={courses.see}/></td>
                              </tr>)
                          })
                            }
                            </tbody>
                            <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>Semester GPA :   {(sgpa)?sgpa.toFixed(2):sgpa}</th>
                          <th></th>
                        </tr>
                        </thead>  
                      </Table>
                      </div>
                      })
                  }
                  </div>
                </div>
              </div>
            </form>           
          </div>
        </>)
    }
  }

  
export default StudentHome;
