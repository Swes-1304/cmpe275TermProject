import React, { useEffect, useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';

function SystemReport(props) {

    const handleSubmit=(e)=>{
        console.log("Inside handle submit")
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
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  
                  required
                //   onChange={(event) => {
                //     //   console.log(event.target.value)
                //       setEmail(event.target.value)}
                //   }
                    
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
                //   onChange={(event) =>{
                //     // console.log(event.target.value)
                //     setPassword(event.target.value)}
                //   }
                />
                </div>
                <br/>
                
            <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
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