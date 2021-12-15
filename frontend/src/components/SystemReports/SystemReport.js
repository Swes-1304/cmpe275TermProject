import React, { useEffect, useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import Select from 'react-select';
import {Card,ListGroup} from "react-bootstrap"

function SystemReport(props) {

  const[report, changeReports] = useState([]);
    const[patientid, changePatientId] = useState(-1);
    const[fromDate, setFromDate] = useState("");
    const[toDate, setToDate] = useState("");
    const[numberOfAppointments, setNumberOfAppointments] = useState(0);
    const[noShow, setNoShow] = useState(0);
    const[noShowRate, setNoShowRate] = useState(0);
    const[result, setResult] = useState("");
    const[clinicName, setClinicName] = useState("");
    const[clinicId, setClinicID] = useState(0);
    const[clinicList, setClinicList] = useState([]);

    useEffect(()=>{

      axios.get(`${backendServer}/getAllClinics`).then((response) => {
        console.log('Got response data', response.data);
        
        for(let i=0;i<response.data.length;i++)
        {
          console.log(response.data[i])
          clinicList.push({value : response.data[i].clinicId , label : response.data[i].clinicName})
          // diseaseslist.push(JSON.parse(response.data.body[i].diseaseName))
        }
        
         
    });
       
    },[]);

    const handleChange=(newValue)=>
    {
     
      
      setClinicID(newValue)
      // console.log(diseases)
      
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log("Inside handle submit")
      console.log(fromDate)
      console.log(toDate)
      let data=
      {
          clinicId:parseInt(clinicId.value),
          startDate:fromDate,
          endDate:toDate
      }
      console.log("DATA",data)
      axios.post(`${backendServer}/systemReport`, data).then((response) => {
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
            <AdminNavbar />
            <div className="thiscontainer">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <center><h4>CHECK SYSTEM REPORTS</h4></center>
            <form id="loginform" onSubmit={handleSubmit} style={{marginTop:"7%"}} >
                
                 <div className="form-group">
                <label><h5>From</h5></label>
                <input
                  type="date"
                  className="form-control"
                  
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
                
                <div className="form-group">
                <label><h5>Clinic Name</h5></label>
                <Select 
                
                options = {clinicList}
                value={clinicId}
                onChange={(value) => handleChange(value)}
                
              />
                </div>
                <br/>
            <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}
            onClick={(e)=>{
              handleSubmit(e)
          }}>
                Check Reports
              </button></center>
              
              
            </form>
            <br/><br/>
            {result?(
            <center><Card style={{ width: '28rem' }}>
  <Card.Header><h3>CLINIC PERFORMANCE</h3></Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item><b>Number of Appointments: {result.Number_of_Appointments}</b></ListGroup.Item>
    <ListGroup.Item><b>Number of Appointments Missed: {result.No_Show_Appointments}</b></ListGroup.Item>
    <ListGroup.Item><b>No Show Rate (Appointments Missed/Appointments Booked): {result.No_Show_Rate}%</b></ListGroup.Item>
  </ListGroup>
</Card></center>):('')}

          </div>
         
        </div>
      </div>
        </div>
    );
}

export default SystemReport;