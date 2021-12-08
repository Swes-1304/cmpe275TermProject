import React, { useState } from "react";
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import { useNavigate } from 'react-router-dom';

function Login(props) {
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

let navigate = useNavigate();


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
        console.log('Got response data', response);
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
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    );
}

export default Login;