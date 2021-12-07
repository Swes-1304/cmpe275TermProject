import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  

  const loginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
              <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter First Name"
                  onChange={(event) => setEmail(event.target.value)}
                />
                 <br/>

                 <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Middle Name"
                  name="Middle Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Middle Name"
                  onChange={(event) => setEmail(event.target.value)}
                />
                 <br/>
                
                 <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter Last Name"
                  onChange={(event) => setEmail(event.target.value)}
                />
                 <br/>
                
                
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                 <br/>
              </div>
              <div className="form-group">
                <label>Create Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <br/>

                <label>Date of Birth</label>
                <input
                  type="date" id="txtDate"
                  className="form-control"
                  
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                 <br/>


                 <label>Street Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter Street Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <br/>


                 <label for="show">Gender<br/></label><br/>

                 <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="m"
              // checked={this.state.gender === "male"}
              //   onChange={this.handleChange}
            />
              &nbsp; Male
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="m"
              // checked={this.state.gender === "male"}
              //   onChange={this.handleChange}
            />
              &nbsp; Female
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="other"
              name="gender"
              type="radio"
              value="m"
              // checked={this.state.gender === "male"}
              //   onChange={this.handleChange}
            />
              &nbsp; Other

              
            



              

              </div>
              <div className="form-group form-check">
              </div>
              <center><button type="submit" className="btn btn-primary">
                Submit
              </button></center>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
}
export default App;
