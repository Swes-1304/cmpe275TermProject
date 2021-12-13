import React, { useEffect, useState } from "react";
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import { ReactComponent as ClockIcon } from '../../icons/clock.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calendar.svg';
import {Row,Col,Button} from 'react-bootstrap'

function PatientDashboard(props) {
    let details=localStorage.getItem('patientDetails')
    const obj=JSON.parse(details)
    console.log(obj)
    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        // var timer = setInterval(()=>setDate(new Date()), 1000 )
        // return function cleanup() {
        //     clearInterval(timer)
        // }
    
    });

   
    return (
        <div>
            <PatientNavbar/>
            {/* <div>
                <Row>
                <Col>
                <p> Current Time : {date.toLocaleTimeString()}</p>
                <p> Current Date : {date.toLocaleDateString()}</p>
                </Col>
                <Col>
                
                </Col>
                <Col>
                <p> Time : {date.toLocaleTimeString()}</p>
                <p> Date : {date.toLocaleDateString()}</p>
                <Button>Change Date and Time</Button>
                </Col>
                </Row>
            </div> */}

            
            
        </div>
    );
}

export default PatientDashboard;