import React from "react";
import BasicForm from "./home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import StudentHome from "./StudentHome";
import ProctorHome from "./ProctorHome";

 class LandingPage extends React.Component{
  async componentDidMount(){
      window.gapi.load("signin2", ()=> {
      window.gapi.signin2.render('login-button')
      })
         
  }
  render(){
  if (this.props.isSignedIn === null) {
    return (
        <h1>  </h1>
    )
  }
  return (
    <BasicForm/>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null,
      authInstance: null
    };
  }
  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com'
      }).then(() => {
        const authInstance = window.gapi.auth2.getAuthInstance()
        const isSignedIn = authInstance.isSignedIn.get()
        // console.log(isSignedIn)
        this.setState({isSignedIn: isSignedIn})
        authInstance.isSignedIn.listen(isSignedIn => {
          this.state.isSignedIn?window.location.replace("/"):window.location.replace("/home")
          this.setState({isSignedIn})
        })
      })
    })
  }
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.onload = () => this.initializeGoogleSignIn()
    document.body.appendChild(script)
  }

  ifUserSignedIn(Component) {
    if(this.state.isSignedIn === null){
      return <h1>Checking if you are signed in...</h1>
    }
    return this.state.isSignedIn ?
        <Component/> :
        <LandingPage/>
}
  render() {
    return (
      <div>
        <BrowserRouter>
                <Switch>
                    <Route exact path="/"  render={() => this.ifUserSignedIn(HomePage)}/>
                    <Route path="/home"  render={() => this.ifUserSignedIn(HomePage)}/>
                    <Route path='/signup' render={() => this.ifUserSignedIn(SignUp)}/>
                </Switch>
            </BrowserRouter>
      </div>
    );
  }
}


class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      authInstance: 0,
      name: 0,
      email: 0,
      img: 0,
      gId: 0,
      role:0,
      message: 0,
      status: null      
    }
  }

  componentDidMount(){
  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  const name = profile.getName();
  const img = profile.getImageUrl();
  const googleId = profile.getId();
  fetch(`user/${googleId}`).then(res => res.json().then(value => {
    this.setState({
      authInstance: authInstance,
      name:name,
      email:email,
      img:img,
      gId:googleId,
      role:value.role,
      message: value.message,
      status: value.message==="Not found user"?false:true      
    })
  }))
  }

  what_to_do(){
    if (this.state.gId !== 10000 && this.state.role === "Student"){
      // console.log(this.state.status, this.state.gId)
      return (
        <StudentHome data ={this.state}/>
      )
    }
    if(this.state.status && this.state.role === "Proctor")
    {
      return (<ProctorHome data={this.state}/>);
    
    }
    if(this.state.status === false)
      return (<>
        <h1> </h1>
        {window.location.replace('/signup')}
      </>)
  }

  render(){
  return (
    <>
      {this.what_to_do()}
    </>
    );
  }  
}

export default App;
