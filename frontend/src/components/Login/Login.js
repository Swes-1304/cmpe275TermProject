import React, { useState } from "react";
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


function Login(props) {
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

let navigate = useNavigate();

const responseGoogle = (response) => {
    console.log(response.tokenId);

    var data = {
        tokenId: response.tokenId
    }; 

    axios.post(`${backendServer}/login`, data).then((response) => {
        console.log('Got response data', response.data);
        console.log(response.status)
        navigate('/adminDashboard');
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
        navigate('/adminDashboard');
    });

}

    return (
        <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
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
                  onChange={(event) =>{
                    // console.log(event.target.value)
                    setPassword(event.target.value)}
                  }
                />
                </div>
                <br/>
                
                
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary">
                Login
              </button></center>
              <br/>
              
              <center>
              <GoogleLogin
                clientId="688669885321-12u8129b1kddkg15shhfk2cl2m8dr2qi.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /></center>
            
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    );
}

export default Login;