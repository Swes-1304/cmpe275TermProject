import React, { useEffect, useState } from "react";
import PatientNavbar from "../PatientNavbar/PatientNavbar";
import axios from 'axios';
import backendServer from "../../../src/webConfig"

function PatientReports() {
    const[report, changeReports] = useState([]);
    const[patientid, changePatientId] = useState(-1);
    

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
    return (
        <div>
            <PatientNavbar/>
            <h1>Hello</h1>
        </div>
    );
}

export default PatientReports;