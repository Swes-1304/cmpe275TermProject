import React, { useState, useContext } from "react";
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {Button,Row,Col} from 'react-bootstrap'
import bg_image from '../../images/medical-wallpaper-4.jpeg' 
import './Login.css'
import LandingNavbar from "../LandingNavbar/LandingNavbar";
import {ThemeContext} from '../../App';


function Login(props) {
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

let navigate = useNavigate();

// Context 
const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);

const responseGoogle = (response) => {
    console.log(response);

    var data = {
        token: response.tokenId,
        subId:response.googleId
    }; 
      console.log(data)

    axios.post(`${backendServer}/googlesignon`, data).then((response1) => {
      console.log('Got response data', response1.data);
      console.log(response1.status)
     

      if(response1.status==206)
      {
        localStorage.setItem("token",response.tokenId)
        localStorage.setItem("subId",response.googleId)

        navigate('/googleSignup')
      }
      else if(response1.status==200){
        localStorage.setItem('patientDetails',JSON.stringify(response1.data))
      //Time mimicing feature
      setSystemTime(new Date());
      toggleMimicTime(false);
      if(response1.data.adminBoolean==true)
      {
        console.log("Inside admin")
        navigate('/adminDashboard');
      }
      else
      {
        navigate('/patientDashboard');
      }   
    }
      
  });
  }


const loginSubmit=(e)=>
{
    e.preventDefault();
    console.log("Inside click event")
    console.log(`
        Email: ${email}
        Password: ${password}
      `);
      var data = {
        email: email,
        password: password,
    };
    console.log('Printing data', data);

    axios.post(`${backendServer}/login`, data).then((response) => {
      console.log('Got response data', response.data);
      console.log(response.status)
      localStorage.setItem('patientDetails',JSON.stringify(response.data))
      //Time mimicing feature
      setSystemTime(new Date());
      toggleMimicTime(false);
      //

      
      if(response.data.adminBoolean==true)
      {
        console.log("Inside admin")
        navigate('/adminDashboard');
      }
      else
      {
        navigate('/patientDashboard');
      }
      
  }).catch((error)=>
  {
      alert(error.response.data)
  });

}

    return (
      
        <div className="thisLogin">
          <LandingNavbar/>
      <div className="thiscontainer">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{borderStyle:"solid",marginTop:"6%"}}>
            <center><h4>LOGIN</h4></center>
            <form id="loginform" onSubmit={loginSubmit}>
                
                 <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address"
                  required
                  onChange={(event) => {
                    //   console.log(event.target.value)
                      setEmail(event.target.value)}
                  }
                    
                />
                </div>
                 <br/>
              
              <div className="form-group">
                <label>Enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                  onChange={(event) =>{
                    // console.log(event.target.value)
                    setPassword(event.target.value)}
                  }
                />
                </div>
                <br/>
                
                
              
              
              <Row>
              <Col>
              <button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
                Login
              </button>
              </Col>
              
              <Col sm={6}>
              <GoogleLogin
                clientId="384093796098-o4v5sjmes3i4stdnj9kepq5ftrkno6t9.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                
                
            />
            </Col>
            <Col>
           <Button href='/userRegister' style={{backgroundColor:"#7C0200"}}>Sign Up</Button>
            </Col>
            </Row>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    );
}

export default Login;
