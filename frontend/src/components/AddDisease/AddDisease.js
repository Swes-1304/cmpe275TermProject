import React, { useEffect, useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';
import backendServer from "../../../src/webConfig"

function AddDisease(props) {
    const [diseaseName, setDiseaseName] = useState("");
    const [diseaseDescription, setDiseaseDescription] = useState("");

    const handleAddDisease=(e)=>
    {
        e.preventDefault()
        let data={
            diseaseName:diseaseName,
            diseaseDescription:diseaseDescription
        }
        console.log("Got data",data)
        axios.post(`${backendServer}/addDisease`, data).then((response) => {
            console.log('Got response data', response.data);
            console.log(response.status)
            alert("Disease Added Successfully!")
            window.location.reload()            
        });
    }

    return (
        <div>
            <AdminNavbar/>
            <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="addDiseaseForm" onSubmit={handleAddDisease}>
              <div className="form-group">
              <label>Disease Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="First Name"
                  name="First Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Disease Name"
                  required
                  onChange={(event) => setDiseaseName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                 <label>Disease Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="StreetAddress"
                  name="Disease Description"
                  aria-describedby="emailHelp"
                  placeholder="Enter Disease Description"
                  onChange={(event) => setDiseaseDescription(event.target.value)}
                />
                </div>
                <br/>
                
                
                <div className="form-group">          
              </div>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary">
                Add Disease
              </button></center>
              </div>
            </form>
          </div>
         
        </div>
      </div>
        </div>
    );
}

export default AddDisease;