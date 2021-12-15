import React, { useEffect, useState } from "react";
import PatientNavbar from "../PatientNavbar/PatientNavbar";
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import './PatientReports.css'
import {Card,ListGroup} from "react-bootstrap"


function PatientReports() {
    const[report, changeReports] = useState([]);
    const[patientid, changePatientId] = useState(-1);
    const[fromDate, setFromDate] = useState("");
    const[toDate, setToDate] = useState("");
    const[numberOfAppointments, setNumberOfAppointments] = useState(0);
    const[noShow, setNoShow] = useState(0);
    const[noShowRate, setNoShowRate] = useState(0);
    const[result, setResult] = useState("");
    
    

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

    },[]);


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("Inside handle submit")
        console.log(fromDate)
        console.log(toDate)
        let data=
        {
            patientId:parseInt(patientid),
            startDate:fromDate,
            endDate:toDate
        }
        console.log("DATA",data)
        axios.post(`${backendServer}/patientReport`, data).then((response) => {
            console.log('Got response data', response.data);
            console.log(response.status) 
            console.log(typeof(response.data))
            console.log(response.data)
            setResult(response.data)
            console.log(result)
            console.log("result set!")
        }).catch((error)=>
        {
            alert("Please check the input")
        })

        
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
                  id="fromDate"
                  name="fromDate"
                  required
                  aria-describedby="emailHelp"
                  
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
                  id="fromDate"
                 
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
            <br/><br/>
            {result?(
            <center><Card style={{ width: '28rem' }}>
  <Card.Header><h3>YOUR REPORT</h3></Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item><b>Number of Appointments: {result.NOA}</b></ListGroup.Item>
    <ListGroup.Item><b>Number of Appointments Missed: {result.NoShow}</b></ListGroup.Item>
    <ListGroup.Item><b>No Show Rate (Appointments Missed/Appointments Booked): {result.NoShowRate}%</b></ListGroup.Item>
  </ListGroup>
</Card></center>):('')}
          </div>
          
        </div>
        
        
        
      </div>
        </div>
    );
}

export default PatientReports;