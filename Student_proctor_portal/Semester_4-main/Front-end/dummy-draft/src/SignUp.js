import React from "react";
import "./App.css";
import { Navbar, Nav, NavDropdown, Image, Table,
  //  Tab, Tabs, 
   Button
//   Form, Button
 } from 'react-bootstrap';
 

// import { green } from "@material-ui/core/colors";

 //import ReactPhone  from './phone'
//  import Fir_sem from './pages/1st_sem';
//  import Sec_sem from './pages/2nd_sem';
//  import thir_sem from './pages/3rd_sem';
//  import fort_sem from './pages/4th_sem';
//  import fiv_sem from './pages/5th_sem';
//  import six_sem from './pages/6th_sem';
//  import Home from './pages/home';
//  import sev_sem from './pages/7th_sem';
//  import eig_sem from './pages/8th_sem';
// import { Component } from "react";




const initialState = {
    name: "",
    email: "",
    password: "",
    usn: "",
    DOB: "",
    phoneno: "",
    bloodgroup: "",
    Fname: "",
    foccupation: "",
    Address: "",
    fphoneno: "",
    femail: "",
    Mname: "",
    Moccupation: "",
    Mphoneno: "",
    Memail: "",
    Gname: "",
    Goccupation: "",
    Gphoneno: "",
    Gemail: "",
    LAddress: "",
    Proctor: "",
    nameError: "",
    emailError: "",
    ProctorError: "",
    usnError: "",
    DOBError: "",
    phonenoError: "",
    fnameError: "",
    femailError: "",
    MnameError: "",
    MemailError: "",
    GnameError: "",
    GemailError: "",
    fphonenoError: "",
    MphonenoError: "",
    GphonenoError: "",
    addressError: "",
    sem: "",
    section: "",
    batch: "",
    Scholarship: "",
    Cocurricular: "",
    Extracurricular: "",
  authInstance: {signOut: ""}
  };
  
  class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
  
    }
  
    componentDidMount(){
      const authInstance = window.gapi.auth2.getAuthInstance()
      const user = authInstance.currentUser.get()
      const profile = user.getBasicProfile();
      const email = profile.getEmail();
      const name = profile.getName();
      const img = profile.getImageUrl();
      const googleId = profile.getId();
      this.setState({authInstance, name, email, img, gid: googleId})
    }
    handleChange = (event) => {
      const isCheckbox = event.target.type === "checkbox";
      this.setState({
        [event.target.name]: isCheckbox
          ? event.target.checked
          : event.target.value
      });
    };
  
    validate = () => {
      console.log("123");
      let nameError = "";
      let emailError = "";
      let ProctorError = "";
      let usnError = "";
      let DOBError = "";
      let phonenoError = "";
      let fnameError = "";
      let femailError = "";
      let MnameError = "";
      let MemailError = "";
      let GnameError = "";
      let GemailError = "";
      let semError = "";
      let sectionError = "";
      let batchError = "";
      let fphonenoError = "";
      let MphonenoError = "";
      let GphonenoError = "";
      let addressError = "";
  
      let namePattern = /^[a-zA-Z ]{2,30}$/;
      let mobPattern = /[456789][0-9]{9}/;
  
      if (!this.state.name) {
        nameError = "name required";
      } else {
        if (!namePattern.test(this.state.name)) {
          nameError = "Invalid name.";
        }
      }
      if (!this.state.email.includes("@bmsce.ac.in") || !this.state.email) {
        emailError = "invalid email";
        if (!this.state.email) {
          emailError = "email required";
        }
      }
  
      if (!this.state.Proctor) {
        ProctorError = "name required";
      } else {
        if (!namePattern.test(this.state.Proctor)) {
          ProctorError = "Invalid name.";
        }
      }
  
      if (!this.state.usn.includes("1BM") || !this.state.usn) {
        usnError = "invalid usn";
        if (!this.state.usn) {
          usnError = "usn required";
        }
      }
  
      if (!this.state.DOB) {
        DOBError = "date required";
      } else {
        var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
        if (!pattern.test(this.state.DOB)) {
          DOBError = "invalid date";
        }
      }
  
      if (!this.state.phoneno) {
        phonenoError = "Number required";
      } else {
        if (!mobPattern.test(this.state.phoneno)) {
          phonenoError = "Invalid phone number.";
        }
      }
  
      if (!this.state.sem) {
        semError = "sem required";
      } else {
        var np = /^[0-9]+$/;
        if (!np.test(this.state.sem)) {
          semError = "Invalid sem";
        }
      }
  
      if (!this.state.section) {
        sectionError = "section required";
      } else {
        var sp = /^[a-zA-Z ]{1}$/;
        if (!sp.test(this.state.section)) {
          sectionError = "Invalid section.";
        }
      }
  
      if (!this.state.batch) {
        batchError = "batch required";
      }
  
      if (!this.state.fname) {
        fnameError = "name required";
      } else {
        if (!namePattern.test(this.state.fname)) {
          fnameError = "Invalid name.";
        }
      }
  
      if (!this.state.Mname) {
        MnameError = "name required";
      } else {
        if (!namePattern.test(this.state.Mname)) {
          MnameError = "Invalid name.";
        }
      }
  
      if (!this.state.fphoneno) {
        fphonenoError = "Number required";
      } else {
        if (!mobPattern.test(this.state.fphoneno)) {
          fphonenoError = "Invalid phone number.";
        }
      }
      if (!this.state.Mphoneno) {
        MphonenoError = "Number required";
      } else {
        if (!mobPattern.test(this.state.Mphoneno)) {
          MphonenoError = "Invalid phone number.";
        }
      }
      if (!this.state.Gphoneno) {
        GphonenoError = "Number required";
      } else {
        if (!mobPattern.test(this.state.Gphoneno)) {
          GphonenoError = "Invalid phone number.";
        }
      }
  
      if (!this.state.Address) {
        addressError = "adress required";
      }
  
      if (!this.state.femail.includes("@") && this.state.femail) {
        femailError = "invalid email";
      }
  
      if (!this.state.Memail.includes("@") && this.state.Memail) {
        MemailError = "invalid email";
      }
  
      if (!this.state.fname) {
        GnameError = "name required";
      } else {
        if (!namePattern.test(this.state.fname)) {
          GnameError = "Invalid name.";
        }
      }
  
      if (!this.state.Gemail.includes("@") && this.state.Gemail) {
        GemailError = "invalid email";
      }
  
      if (
        emailError ||
        nameError ||
        ProctorError ||
        usnError ||
        DOBError ||
        phonenoError ||
        semError ||
        sectionError ||
        batchError ||
        fnameError ||
        femailError ||
        MnameError ||
        MemailError ||
        GnameError ||
        GemailError
      ) {
        this.setState({
          emailError,
          nameError,
          ProctorError,
          usnError,
          semError,
          sectionError,
          batchError,
          DOBError,
          phonenoError,
          fnameError,
          femailError,
          MnameError,
          MemailError,
          GemailError,
          GnameError,
          fphonenoError,
          MphonenoError,
          GphonenoError,
          addressError
        });
        return false;
      }
  
      return true;
    };
  
    handleSubmit = (event) => {
      console.log(this.state);
      event.preventDefault();
      const isValid = this.validate();
      if (isValid) {
        console.log(this.state);
        var to_send = {
          gid: this.state.gid,
          role: "Student",
          profile: {
            name: this.state.name,
            usn: this.state.usn,
            department: "CSE",
            proctor: this.state.Proctor,
            email: this.state.email,
            mobile_no: this.state.phoneno,
            dob: this.state.DOB,
            semester: this.state.sem,
            section: this.state.section,
            batch: this.state.batch,
            img: this.state.img
          },
          details: {
            fName: this.state.Fname,
            fOccu: this.state.foccupation,
            fPhno: this.state.fphoneno,
            fEmail: this.state.femail,
            mName: this.state.Mname,
            mOccu: this.state.Moccupation,
            mPhno: this.state.Mphoneno,
            mEmail: this.state.Memail
          }
        }
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(to_send)
        }
        fetch(`http://localhost:8000/user`, requestOptions).then(res => res.json().then(val => {
          console.log(val)
        }))
        this.setState(initialState);
      }
    };
    render() {
      return (<>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                  <Image src = {this.state.img} alt = "" width = "40" rounded></Image>
                <NavDropdown title={this.state.email} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Navbar>
        <div id="login-box" textAlign = "center">
          <h1 className="heading" align="center" style={{ paddingTop: "1.2em" }}>
            Registration-form
          </h1>
          <br />
  
          <div className="tab navbar navbar-dark bg-dark">
            <button>
              <a href="#general" className="pointer">
                General
              </a>
            </button>
            <button>
              <a href="#personal" className="pointer">
                Personal
              </a>
            </button>
            <button>
              <a href="#extra" className="pointer">
                Extra-curriculam
              </a>
            </button>
          </div>
        
  
          <div className="tabcontent">
            <form onSubmit={this.handleSubmit}>
              <div id="general">
                <br />
                <h5>-- General --</h5>
                <br />
                <div>
                  <label htmlFor="name">
                    Name<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
                <div>
                  <label htmlFor="Email">
                    Email<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </div>
                <div>
                  <label htmlFor="usn">
                    USN<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="usn"
                    placeholder="usn"
                    value={this.state.usn}
                    onChange={this.handleChange}
                    // style={{ width: "53.5rem" }}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.usnError}
                </div>
                <div>
                  <label htmlFor="DOB">
                    DATE of BIRTH<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="DOB"
                    placeholder="DD/MM/YYYY"
                    value={this.state.DOB}
                    onChange={this.handleChange}
                  />   
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.DOBError}
                </div>
                <div>
                  <label htmlFor="phoneno">
                    Phone Number<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="phoneno"
                    placeholder="ph.no"
                    value={this.state.phoneno}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.phonenoError}
                </div>
                <div>
                  <label htmlFor="usn">
                    Proctor<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Proctor"
                    placeholder="Proctor Name"
                    value={this.state.Proctor}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.ProctorError}
                </div>
                <div>
                  <label htmlFor="sem">
                    Sem<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="sem"
                    placeholder="Sem"
                    value={this.state.sem}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.semError}
                  </div>
                </div>
                <div>
                  <label htmlFor="sem">
                    Section<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="section"
                    placeholder="Section"
                    value={this.state.section}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.sectionError}
                  </div>
                </div>
                <div>
                  <label htmlFor="sem">
                    Batch<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="batch"
                    placeholder="Batch (e.g. B-3)"
                    value={this.state.batch}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.batchError}
                  </div>
                </div>
                <div>
                  <label htmlFor="bloodgroup">Blood Group</label> <br />
                  <input
                    type="text"
                    name="bloodgroup"
                    placeholder="Blood Group"
                    value={this.state.bloodgroup}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br></br>
  
              <div id="personal">
                <br />
                <h5>-- Personal --</h5>
                <div>
                  <br />
                  <label htmlFor="fname">
                    Father Name<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="fname"
                    placeholder="Father name"
                    value={this.state.fname}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.fnameError}
                  </div>
                </div>
                <div>
                  <br />
                  <label htmlFor="Mname">
                    Mother Name<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Mname"
                    placeholder="Mother name"
                    value={this.state.Mname}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.MnameError}
                  </div>
                </div>
                <div>
                  <br />
                  <label htmlFor="foccupation">Father's Occupation:</label> <br />
                  <input
                    type="text"
                    name="foccupation"
                    placeholder="Father's occupation"
                    value={this.state.foccupation}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <br />
                  <label htmlFor="Moccupation">Mother's Occupation:</label> <br />
                  <input
                    type="text"
                    name="Moccupation"
                    placeholder="Mother's occupation"
                    value={this.state.Moccupation}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="Address">
                    Permanent Address<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={this.state.Address}
                    onChange={this.handleChange}
                    style={{ height: "100px", textAlign: "top" }}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.addressError}
                </div>
                <div>
                  <label htmlFor="femail">Father's Email:</label> <br />
                  <input
                    type="text"
                    name="femail"
                    placeholder="Father's Email"
                    value={this.state.femail}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.femailError}
                  </div>
                </div>
                <div>
                  <label htmlFor="Memail">Mother's Email:</label> <br />
                  <input
                    type="text"
                    name="Memail"
                    placeholder="Mother's Email"
                    value={this.state.Memail}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.MemailError}
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneno">
                    Father's PhoneNumber<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="fphoneno"
                    placeholder="ph.no"
                    value={this.state.fphoneno}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.fphonenoError}
                </div>
                <div>
                  <label htmlFor="phoneno">
                    Mother's PhoneNumber<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Mphoneno"
                    placeholder="ph.no"
                    value={this.state.Mphoneno}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.MphonenoError}
                </div>
                <div>
                  <br />
                  <label htmlFor="Gname">
                    Local Guardian Name<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Gname"
                    placeholder="Guardian name"
                    value={this.state.Gname}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.GnameError}
                  </div>
                </div>
                <div>
                  <br />
                  <label htmlFor="Goccupation">Guardian's Occupation:</label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Goccupation"
                    placeholder="Guardian's occupation"
                    value={this.state.Goccupation}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phoneno">
                    Guardian's PhoneNumber<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Gphoneno"
                    placeholder="ph.no"
                    value={this.state.Gphoneno}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.GphonenoError}
                </div>
                <div>
                  <label htmlFor="Gemail">Guardian's Email:</label> <br />
                  <input
                    type="text"
                    name="Gemail"
                    placeholder="Guardian's Email"
                    value={this.state.gemail}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.GemailError}
                  </div>
                </div>
                <div>
                  <label htmlFor="LAddress">Local Address:</label> <br />
                  <input
                    type="text"
                    name="LAddress"
                    placeholder="Address"
                    value={this.state.LAddress}
                    onChange={this.handleChange}
                    style={{ height: "100px", textAlign: "top" }}
                  />
                </div>
              </div>
              <div id="extra">
                <br />
                <h5>-- Extra Curriculam --</h5>
                <div>
                  <br />
                  <label htmlFor="Scholarship">
                    Scholarship Received(If any)
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Scholarship"
                    placeholder="Scholarship Received"
                    value={this.state.Scholarship}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <br />
                  <label htmlFor="Co-curricular">
                    Co-curricular Achievements(State Level and above)
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Cocurricular"
                    placeholder="Co-curricular Achievements"
                    value={this.state.Cocurricular}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <br />
                  <label htmlFor="Extracurricular">
                    Extra-curricular Achievements(State Level and above)
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="Extracurricular"
                    placeholder="Extra-curricular Achievements"
                    value={this.state.Extracurricular}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button className="final" type="submit">
                Submit
              </button>
            </form>
            <div></div>
          </div>
        </div></>
      );
    }
  }
  
  
export default SignUp;
