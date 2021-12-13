import React, { useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';

function AddVaccination() {
    const [vaccineName, setVaccineName] = useState("");
    const [vaccineManufacturer, setVaccineManufacturer] = useState("");
    const [noOfShots, setNoOfShots] = useState(0);
    const [diseases, setDiseases] = useState([]);
    const [shotInterval, setShotInterval] = useState("");
    const [duration, setDuration] = useState(0);


    const handleSubmit=(e)=>
    {
        e.preventDefault();
        
        console.log(diseases)
        let data={
            vaccineName:vaccineName,
            vaccineManufacturer:vaccineManufacturer,
            noOfShots:parseInt(noOfShots),
            duration:parseInt(duration),
            shotInterval:parseInt(shotInterval),
            diseases:diseases
        }
        console.log("DATA",data)
        axios.post(`${backendServer}/addVaccine`, data).then((response) => {
            console.log('Got response data', response.data);
            alert("Vaccination Added!")
            window.location.reload();
        });
      
        
    }

    return (
        <div>
            <AdminNavbar/>
            <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
          <center><h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                            ADD A VACCINATION
                        </h4></center>
            <form id="addVaccination" onSubmit={handleSubmit}>
              <div className="form-group">
              <label>Vaccine Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Vaccine Name"
                  name="Vaccine Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Vaccine Name"
                  required
                  onChange={(event) => setVaccineName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Vaccine Manufacturer</label>
                <input
                  type="text"
                  className="form-control"
                  id="VaccineManufacturer"
                  name="Vaccine Manufacturer"
                  aria-describedby="emailHelp"
                  placeholder="Enter Vaccine Manufacturer"
                  required
                  onChange={(event) => setVaccineManufacturer(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                 <label>Number Of Shots</label>
                <input
                  type="number"
                  className="form-control"
                  id="noOfShots"
                  name="Number of Shots"
                  placeholder="Enter Number of Shots"
                  required
                  onChange={(event) => setNoOfShots(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Vaccine Validity</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  name="duration"
                  placeholder="Enter Vaccination Validity Days"
                  required
                  onChange={(event) => setDuration(event.target.value)}
                />
                </div>
                 <br/>
              
              <div className="form-group">
                <label>Time Between Vaccination Shots</label>
                <input
                  type="text"
                  className="form-control"
                  id="vaccinationInterval"
                  placeholder="Enter Interval Days Between Vaccination"
                  required
                  onChange={(event) => setShotInterval(event.target.value)}
                />
                </div>
                <br/>

                <div className="form-group">
                <label>Diseases</label>
                
                <TagsInput
            value={diseases}
            onChange={setDiseases}
            name="Diseases"
        placeHolder="Enter Diseases"
      />


                </div>
                 <br/>
                 

                <br/>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
                Add Vaccine
              </button></center>
              </div>
            </form>
          </div>
         
        </div>
      </div>
        </div>
    );
}

export default AddVaccination;