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
  

  const loginSubmit = (e) => {
    e.preventDefault();
  };



  const states=[{
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}]

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
                  onChange={(event) => setEmail(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
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
                  onChange={(event) => setEmail(event.target.value)}
                />
                </div>
                 <br/>

                 <div className="form-group">
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
                                                label='Select State'
                                                variant='outlined'
                                                InputLabelProps={{ style: { padding: '0px 0px', color: '#555555', fontSize: 11.5 } }}
                                            />
                                        )}
                                        // onChange={(event, newValue) => {
                                        //     setDestination(newValue);
                                        //     console.log(destination);
                                        // }}
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
