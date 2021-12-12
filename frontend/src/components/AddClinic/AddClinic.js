import React, { useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';

function AddClinic() {
    const [clinicName, setClinicName] = useState("");
    const [noOfPhysicians, setNoOfPhysicians] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    return (
        <div>
            <AdminNavbar/>
            <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
          <center><h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                            ADD A CLINIC
                        </h4></center>
            <form id="loginform">
              <div className="form-group">
              <label>Clinic Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="First Name"
                  name="First Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Clinic Name"
                //   onChange={(event) => setFirstName(event.target.value)}
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
                //   onChange={(event) => setMiddleName(event.target.value)}
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
                //   onChange={(event) => setLastName(event.target.value)}
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
                //   onChange={(event) => setEmail(event.target.value)}
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
                //   onChange={(event) => setPassword(event.target.value)}
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
                //   onChange={(event) => setDateOfBirth(event.target.value)}
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
                //   onChange={(event) => setAddress(event.target.value)}
                />
                </div>
                <br/>
                
                <label>State</label>
                <div className="form-group">          
              </div>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary">
                Register
              </button></center>
              </div>
            </form>
          </div>
         
        </div>
      </div>
        </div>
    );
}

export default AddClinic;