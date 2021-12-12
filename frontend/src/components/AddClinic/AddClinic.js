import React, { useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


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

   const handleSubmit=(e)=>
   {
       e.preventDefault()
        console.log("Got Clinic Name",clinicName)
        console.log("Got Number of Physicians",noOfPhysicians)
        console.log("Got Start Time",startTime)
        console.log("Got End Time",endTime)
        console.log("Got Street Address",street)
        console.log("Got Number",number)
        console.log("Got City",city)
        console.log("Got State",state)
        console.log("Got Zip Code",zipCode)
   }

    return (
        <div>
            <AdminNavbar/>
            <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
          <center><h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                            ADD A CLINIC
                        </h4></center>
            <form id="loginform" onSubmit={handleSubmit}>
              <div className="form-group">
              <label>Clinic Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="First Name"
                  name="First Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Clinic Name"
                  onChange={(event) => setClinicName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Number of Physicians</label>
                <input
                  type="number"
                  className="form-control"
                  id="Middle Name"
                  name="Middle Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Number of Physicians"
                  onChange={(event) => setNoOfPhysicians(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                 <label>Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="startTime"
                  name="Last Name"
                  aria-describedby="emailHelp"
                  
                  onChange={(event) => setStartTime(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="endTime"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  
                  onChange={(event) => setEndTime(event.target.value)}
                />
                </div>
                 <br/>
              
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  placeholder="Enter Street Address"
                  onChange={(event) => setStreet(event.target.value)}
                />
                </div>
                <br/>

                <div className="form-group">
                <label>Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="streetAddress2"
                  placeholder="Enter Street Number"
                  onChange={(event) => setNumber(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter City"
                  onChange={(event) => setCity(event.target.value)}
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
                <label>Zip Code</label>
                <input
                  type="number"
                  className="form-control"
                  id="streetAddress2"
                  placeholder="Enter Zip Code"
                  onChange={(event) => setZipCode(event.target.value)}
                />
                </div>
                 

                <br/>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary">
                Add Clinic
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