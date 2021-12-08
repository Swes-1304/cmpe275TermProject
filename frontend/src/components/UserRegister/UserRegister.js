import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import "./UserRegister.css"

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");


  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Got First Name",firstName)
    console.log("Got Last Name",lastName)
    console.log("Got Middle Name",middleName)
    console.log("Got Date of Birth",dateOfBirth)
    console.log("Got Email",email)
    console.log("Got state", state)
    console.log("Gender",gender)
    console.log("Address",address)
  };



  const states=[
     "Alabama",
     "Alaska",
     "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
     "Wyoming"
]

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
                  id="First Name"
                  name="First Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Middle Name"
                  name="Middle Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Middle Name"
                  onChange={(event) => setMiddleName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                 <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Last Name"
                  name="Last Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Last Name"
                  onChange={(event) => setLastName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
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
                </div>
                 <br/>
              
              <div className="form-group">
                <label>Create Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                </div>
                <br/>

                <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date" id="txtDate"
                  className="form-control"
                  
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
                </div>
                 <br/>

                 <div className="form-group">
                 <label>Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="StreetAddress"
                  name="Street Address"
                  aria-describedby="emailHelp"
                  placeholder="Enter Street Address"
                  onChange={(event) => setAddress(event.target.value)}
                />
                </div>
                <br/>
                <label>State</label>
                <Autocomplete
                                        className='searchContainer'
                                        id='combo-box-demo'
                                        options={states}
                                        getOptionLabel={(option) => option}
                                        style={{ width: "relative" }}
                                        renderInput={(params) => (
                                            <TextField
                                                style={{marginTop:"7px"}}
                                                {...params}
                                               
                                                variant='outlined'
                                                InputLabelProps={{ style: { padding: '0px 0px', color: '#555555', fontSize: 10.5 } }}
                                            />
                                        )}
                                        onChange={(event, newValue) => {
                                          setState(newValue);
                                          
                                        }}
                                    />
                <br/>
                <div className="form-group">
                 <label for="show">Gender<br/></label><br/>

                 <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="m"
              value="Male"
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
              &nbsp; Male
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="Female"
              // checked={this.state.gender === "male"}
              onChange={(event) => {
                setGender(event.target.value);
                
              }}
            />
              &nbsp; Female
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="other"
              name="gender"
              type="radio"
              value="Other"
              // checked={this.state.gender === "male"}
              onChange={(event) => {
                setGender(event.target.value);
                
              }}
            />
              &nbsp; Other

              
              </div>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary">
                Submit
              </button></center>
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
}
export default App;
