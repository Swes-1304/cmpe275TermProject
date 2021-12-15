import React, { useEffect, useState } from "react";
import PatientNavbar from "../PatientNavbar/PatientNavbar";
import axios from 'axios';
import backendServer from "../../../src/webConfig"

function PatientReports() {
    const[report, changeReports] = useState([]);
    const[patientid, changePatientId] = useState(-1);
    const[fromDate, setFromDate] = useState("");
    const[toDate, setToDate] = useState("");
    
    

    useEffect(()=>{
        const patientDetails=JSON.parse(localStorage.getItem('patientDetails'))
        const patientId=patientDetails.mrn
        console.log(patientId)
        changePatientId(patientId);

        // const data = {
        //     patientId:patientId,
        //     startDate:,
        //     endDate:
        // }



        axios.post(`${backendServer}/getVaccineHistory`)


    },[]);


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("Inside handle submit")
        console.log(fromDate)
        console.log(toDate)
    }
    return (
        <div>
            <PatientNavbar/>
            <div className="thiscontainer">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <center><h4>CHECK YOUR REPORTS</h4></center>
            <form id="loginform" onSubmit={handleSubmit} style={{marginTop:"7%"}} >
                
                 <div className="form-group">
                <label><h5>From</h5></label>
                <input
                  type="date"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  
                  required
                  onChange={(event) => {
                    //   console.log(event.target.value)
                    setFromDate(event.target.value)}
                  }
                    
                />
                </div>
                 <br/>
              
              <div className="form-group">
                <label><h5>To</h5></label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputPassword1"
                 
                  required
                  onChange={(event) =>{
                    // console.log(event.target.value)
                    setToDate(event.target.value)}
                  }
                />
                </div>
                <br/>
                
            <center><button onClick={(e)=>{
                handleSubmit(e)
            }} className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
                Check Reports
              </button></center>
              
              
            </form>
          </div>
         
        </div>
      </div>
        </div>
    );
}

export default PatientReports;