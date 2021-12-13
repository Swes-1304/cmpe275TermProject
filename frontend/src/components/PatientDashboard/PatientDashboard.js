import React from 'react';
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';

function PatientDashboard(props) {
    let details=localStorage.getItem('patientDetails')
    const obj=JSON.parse(details)
    console.log(obj)

    return (
        <div>
            PATIENT DASHBOARD!
            
        </div>
    );
}

export default PatientDashboard;