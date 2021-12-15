import React, { useState,useEffect } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// import { handleInputChange } from "react-select/dist/declarations/src/utils";



function AddVaccination() {
    const [vaccineName, setVaccineName] = useState("");
    const [vaccineManufacturer, setVaccineManufacturer] = useState("");
    const [noOfShots, setNoOfShots] = useState(0);
    const [diseases, setDiseases] = useState([]);
    const [shotInterval, setShotInterval] = useState("");
    const [duration, setDuration] = useState(0);
    const [diseaseslist, setDiseasesList] = useState([]);




   useEffect(()=>{
    axios.get(`${backendServer}/getDiseases`).then((response) => {
      console.log('Got response data', response.data);
      console.log(response.data.body)
      for(let i=0;i<response.data.body.length;i++)
      {
        diseaseslist.push({value : response.data.body[i].diseaseName , label : response.data.body[i].diseaseName})
        // diseaseslist.push(JSON.parse(response.data.body[i].diseaseName))
      }
      console.log(diseaseslist)
       
  });
  },[])


    const handleSubmit=(e)=>
    {
        e.preventDefault();
        
        console.log(diseases)
        let arr = [];
        for ( let i = 0 ; i < diseases.length; i ++){
          arr.push(diseases[i].value)
        }
        let data={
            vaccineName:vaccineName,
            vaccineManufacturer:vaccineManufacturer,
            noOfShots:parseInt(noOfShots),
            duration:parseInt(duration),
            shotInterval:parseInt(shotInterval),
            diseases:arr
        }
        console.log("DATA",data)
        axios.post(`${backendServer}/addVaccine`, data).then((response) => {
            console.log('Got response data', response.data);

            alert("Vaccination Added!")
            window.location.reload();
        });
      
        
    }
    const handleChange=(newValue)=>
    {
      // for(let i=0;i<newValue.length;i++)
      // {
      //   console.log(newValue[i].value)
      //   diseases.push(newValue[i].value)
      // }
      // diseases.push(newValue[0].value)
      
      setDiseases(newValue)
      // console.log(diseases)
      
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
                
      
      <Select 
      isMulti 
      options = {diseaseslist}
      value={diseases}
      onChange={(value) => handleChange(value)}
      
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