import React, { useEffect, useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';
import backendServer from "../../../src/webConfig"

function SystemReport(props) {

  const[report, changeReports] = useState([]);
    const[patientid, changePatientId] = useState(-1);
    const[fromDate, setFromDate] = useState("");
    const[toDate, setToDate] = useState("");
    const[numberOfAppointments, setNumberOfAppointments] = useState(0);
    const[noShow, setNoShow] = useState(0);
    const[noShowRate, setNoShowRate] = useState(0);
    const[result, setResult] = useState("");

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
      axios.post(`${backendServer}/systemReport`, data).then((response) => {
          console.log('Got response data', response.data);
          console.log(response.status) 
          console.log(typeof(response.data))
          console.log(response.data)
          setResult(response.data)
          console.log(result)
          console.log("result set!")
      });

      
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
                
            <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}
            onClick={(e)=>{
              handleSubmit(e)
          }}>
                Check Reports
              </button></center>
              
              
            </form>
          </div>
         
        </div>
      </div>
        </div>
    );
}

export default SystemReport;