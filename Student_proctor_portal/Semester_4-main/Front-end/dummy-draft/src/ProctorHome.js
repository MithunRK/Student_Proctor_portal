import React from "react";
import MaterialTable from 'material-table';


import "./App.css";
import { Navbar, Nav, NavDropdown, Image, Button} from 'react-bootstrap';


class ProctorHome extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        authInstance:this.props.data.authInstance,
        students: [1, 2, 3],
        role: "Proctor",
        data: {department: "CSE", batch:"2024"},
        profile:{
          department:"",
          batch: ""
        },
        cgpa: 0.00,
        chosenStudent: null,
        tabValue: 2,
        selected : [],
        semesters: [1, 2, 3],
        studentsSorted: {1: [], 2:[], 3:[]}
      }
    }
  
    componentDidMount(){
      fetch(`http://localhost:8000/proctor/${this.props.data.gId}`).then(res => res.json().then(value => {
        // console.log(value)
        this.setState(value)
        this.cleanStudents()
      }))
    }
  
  
    cleanStudents(){
      var students = this.state.students
      var semesters = []
      var studentsSorted = {}
      for(let i = 0; i<students.length; i++)
      {
        semesters.push(students[i].semester)
        studentsSorted[students[i].semester] = [] 
      }
      semesters = [...new Set(semesters)]
      for(let x = 0; x < semesters.length; x++)
      {
        for(let y = 0; y<students.length; y++)
        {
          if(students[y].semester === semesters[x])
          {
            studentsSorted[semesters[x]].push(students[y])
          }
        }
      }
      studentsSorted["Total"] = students
      semesters.push("Total")
      this.setState({studentsSorted, semesters})
    }
  
  
    getStudent(gid){
      fetch(`http://localhost:8000/student/${gid}`).then(res => res.json().then(value=> {
        // console.log(value)
        var arr = this.state.selected
        arr.push(value)
        this.setState({selected: arr})
      }))
    }
  
    handleChange = (event, val) => {
      // const isCheckbox = event.target.type === "checkbox";
      this.setState({ tabValue: val});
    };
  
    toggleTab(value){
      // console.log(value)
      this.setState({tabValue: value})
    }
  
    clearStudent(){
      this.setState({chosenStudent: null, sgpa: undefined, cgpa: 0.00, gradesReal: undefined})
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
                <NavDropdown title={this.props.data.email} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Navbar>
        <div className="container emp-profile">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                    <Image src={this.props.data.img} alt="" width = "2" rounded/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>Name: {this.state.profile.p_name}</h5>
                  <h5>Email: {this.state.profile.p_email}</h5>
                  <h5>Phone Number: {this.state.profile.p_mobile_no}</h5>
                </div>
              </div>
            <div className="col-md-2">
              <input type="submit"  onClick = {this.state.authInstance.signOut} className="profile-edit-btn" name="btnAddMore" value="Sign Out"/>
            </div>
        </div>
          <div className="profile-tab" >
            <br/><br/>
              <div id="home" aria-labelledby="home-tab">
                <div className="tab navbar navbar-dark bg-dark">
                  {
                  this.state.semesters.map((sem, idx)=>{
                    return(
                    <div className={this.state.tabValue===sem? "active-tabs" : "tabs"} key ={idx*12+73}>
                      <Button className={(this.state.tabValue===sem)? "active-tabs" : "tabs"} onClick={()=> this.toggleTab(sem)}>{(sem!=='Total')?`Semester ${sem}`: 'All Students'}</Button>
                      </div>
                    )
                  })            
                  }
                </div>
              <div className="content-tabs">
                {
                          <MaterialTable 
                          columns={[
                            {title: 'Name', field: 'name'},
                            {title: 'USN', field: 'usn'},
                            {title: 'Email', field: 'email'},
                            {title: 'Section', field: 'section'},
                            {title: 'Mobile No.', field: 'mobile_no'},
                            {title: 'CGPA', field: 'cgpa'},
                            {title: 'D.O.B', field: 'dob'}
                          ]}
                          data = {this.state.studentsSorted[this.state.tabValue]}
                          options={{exportButton: true}}
                          title={(this.state.tabValue!=='Total')?`Semester ${this.state.tabValue}`: 'All Students'}
                          actions={[
                            {
                              icon: 'person',
                              onClick: (event, rowData) => {
                                fetch(`http://localhost:8000/student/${rowData.g_id}`).then(res => res.json().then(value => {
                                  // console.log(value)
                                  this.setState({chosenStudent: value})
                                  this.setState({gradesReal: value.marks})
                                  this.cleanGrades(value.marks, value.profile.semester)
                                }))
                              }
                            }
                          ]}
                          localization={{
                            header: {
                                actions: ''
                            },
                            body: {
                                emptyDataSourceMessage: 'No records to display',
                                filterRow: {
                                    filterTooltip: 'Filter'
                                }
                            }
                        }}
                          components={{
                            Action: props => (
                              <Button
                                className="Action-col"
                                onClick={(event) => props.action.onClick(event, props.data)}
                                color="primary"
                                variant="contained"
                                style={{textTransform: 'none'}}
                                size="small"
                              >
                                Get Details
                              </Button>
                            ),
                          }}
                          />
                }
              </div>
              <div className={(this.state.chosenStudent !== null)?"Chosen-Name":"content"}>
                  {
                    (this.state.chosenStudent!== null)?
                       <div>
          <div className="profile-tab" >
              <div id="home" aria-labelledby="home-tab" style={{border: '2px solid black'}}>
              <br></br><br></br>
                <div className="row">
                    <div className="col-md-2">
                        <label>Name :</label>
                    </div>
                    <div className="col-md-4">
                        <p>{this.state.chosenStudent.profile.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Email :</label>
                    </div>
                    <div className="col-md-4">
                        <p>{this.state.chosenStudent.profile.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>DoB : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.chosenStudent.profile.dob}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Semester : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.chosenStudent.profile.semester}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>CGPA : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{(this.state.chosenStudent.profile.cgpa !== 0.00 && this.state.chosenStudent.profile.cgpa !== 0.0)?this.state.cgpa.toFixed(2):"Not updated yet"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>USN : </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.chosenStudent.profile.usn}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>Mobile No: </label>
                    </div>
                    <div className="col-md-2">
                        <p>{this.state.chosenStudent.profile.mobile_no}</p>
                    </div>
                </div>
                <div>
                   {
                     (this.state.gradesReal !== undefined && this.state.gradesReal.length <= 8 && this.state.sgpa !== undefined && this.state.gradesReal !== [])?<div>
                       {this.state.gradesReal.map((semester, idx)=>{
                         var sgpa = this.state.sgpa
                        //  console.log(typeof(semester), semester[0].course_semester, sgpa)
                         if(semester !== null){
                          //  console.log(semester)
                           return <MaterialTable key={idx}
                              columns={[
                                {title: 'Course Id', field: 'course_id'},
                                {title: 'Course Name', field: 'course_name'},
                                {title: 'Credits', field: 'credits'},
                                {title: 'Internal', field: 'internal'},
                                {title: 'Semester End', field: 'see'},
                              ]}
                              data = {semester}
                              options={{exportButton: true}}
                              title={`Semester ${semester[0].course_semester} SGPA: ${sgpa[semester[0].course_semester].toFixed(2)}`}
                           />
                         }
                         return <></>
                       })}
                     </div>:<></>
                   }
                  </div>
                </div>
              </div>
                      <Button onClick={()=>{this.clearStudent()}}> Close </Button>
                      </div>: <></>
                  }
                </div>
            </div>
                
            </div>           
          </div>
        </>)
    }
  }
  
  export default ProctorHome;