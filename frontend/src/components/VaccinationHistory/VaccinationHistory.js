import React from 'react';
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import {useState, useEffect, useContext} from 'react';
import {ThemeContext} from '../../App';
import axios from 'axios';
import backendServer from "../../../src/webConfig"


function VaccinationHistory() {
    const[patientid, changePatientId] = useState(-1);
    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);
    
    useEffect(()=>{
        const patientDetails=JSON.parse(localStorage.getItem('patientDetails'))
        const patientId=patientDetails.mrn
        console.log(patientId)
        changePatientId(patientId);
        console.log("System Time",systemTime)

        let map = new Map();
        map.set("Jan",1);
        map.set("Feb",2);
        map.set("Mar",3);
        map.set("Apr",4);
        map.set("May",5);
        map.set("Jun",6);
        map.set("Jul",7);
        map.set("Aug",8);
        map.set("Sep",9);
        map.set("Oct",10);
        map.set("Nov",11);
        map.set("Dec",12);

        const splittedDate = systemTime.toString().split(' ');
        console.log(splittedDate)


        const monthText = systemTime.toString().split(' ')[1];
        const month = map.get(monthText);
        console.log(month)
        let date = splittedDate[3]+"-"+month+"-"+splittedDate[2];
        console.log("Date",date)

        let time = splittedDate[4];
        console.log("Time",time)


        axios.get(`${backendServer}/getVaccineHistory`,{
            params:{
                patientId:patientDetails.mrn,
                date:date,
                time:time
            }
        }).then((response) => {
            console.log('Got response data', response.data);
            
        });
    },[]);
    
    return (
        <div>
            <PatientNavbar/>
            <h1>VaccinationHistory</h1>
        </div>
    );
}

export default VaccinationHistory;