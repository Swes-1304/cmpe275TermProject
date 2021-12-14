import React, { useEffect, useState } from "react";
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import Select from 'react-select';
import {Button,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import backendServer from "../../../src/webConfig"


function BookAppointmentPage(props) {
    const [selectOptions, handleSelectOptionsChange] = useState(()=>{
        return [];
    });

    const [value, handleValueChange] = useState(()=>{
        return[];
    });

    const getOptions=()=>
    {
        axios.post(`${backendServer}/getvaccine`).then((response) => {
            console.log('Got response data', response.data);
            console.log(response.status)
            const data=response.data
            console.log(data)
            const options=data.map(vaccine=>({
                "value":vaccine.vaccineId,
                "label":vaccine.vaccineName
            }))
            handleSelectOptionsChange(options)
        });
    }

    useEffect(() => {
        getOptions()
    
    },[]);

    return (
        <div>
           <PatientNavbar/> 
           <center><h4>SEARCH APPOINTMENTS</h4></center>
           <div className="thiscontainer">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{borderStyle:"solid",marginTop:"2%"}}>
            
            <form id="loginform">
            <label>Select Vaccinies</label>
            <Select isMulti
                options={selectOptions}
                onChange={(event)=>{
                    handleValueChange(event);
                    console.log(value);
                }}
                placeholder="Select Vaccines" 
                
                />
                <br/>
                <div className="form-group">
                <label for='deptime'>Appointment Time:</label>
                            <br></br>
                            <input
                                type='datetime-local'
                                id='deptime'
                                name='deptime'
                                // onChange={(e) => {
                                //     setDepartureDateTime(e.target.value);
                                // }}
                            ></input>


                </div>
                <br/>
                <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
                Search Clinics
              </button></center>
                 <br/>
            
            </form>
          </div>
         
        </div>
      </div>
        
        </div>
    );
}

export default BookAppointmentPage;