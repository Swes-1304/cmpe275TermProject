import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import { ReactComponent as ClockIcon } from '../../icons/clock.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calendar.svg';
import {Row,Col,Button} from 'react-bootstrap'
import {ThemeContext} from '../../App';

function PatientDashboard(props) {


    let details=localStorage.getItem('patientDetails')
    const obj=JSON.parse(details)
    console.log(obj)

    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);
    const [date,setDate] = useState(new Date());
    const[newTime, setNewTime] = useState(new Date());


    
    useEffect(() => {
        // var timer = setInterval(()=>setDate(new Date()), 1000 )
        // return function cleanup() {
        //     clearInterval(timer)
        // }
        // setSystemTime(new Date());
    
    },[]);

    const changeTime = () =>{

        console.log("System Time:",systemTime);
        console.log("New Time set by date time picker",newTime);
        let changedDateTime = new Date(newTime);
        console.log("mimicTime Flag",mimicTime);
        console.log(changedDateTime);
        const newAllotTime = new Date(changedDateTime);

        setSystemTime(newAllotTime);
        // toggleMimicTime( state => !state);
        toggleMimicTime(true)
        console.log("mimicTime Flag",mimicTime);
    }
   //dateWithoutSecond.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    const setToCurrentTime = ()=>{
        setDate(new Date());
        setSystemTime(date);
        toggleMimicTime(false);
    }

   
    return (
        <div>
            <PatientNavbar/>
            <div>
                <Row style={{marginLeft:"10%"}}>
                <Col >
                <p style={{fontSize:"30px"}}> Current Time : {date.toLocaleTimeString()}</p>
                <p style={{fontSize:"30px"}}> Current Date : {date.toLocaleDateString()}</p>
                </Col>
                <Col>
                
                </Col>
                <Col>
                <p style={{fontSize:"30px"}}> Time : {systemTime.toLocaleTimeString()}</p>
                <p style={{fontSize:"30px"}}> Date : {systemTime.toLocaleDateString()}</p>

                <div className="form-group">
                <label for='deptime' style={{fontSize:"25px"}}>Change System Date-Time:</label>
                            <br></br>
                            <input
                                type='datetime-local'
                                id='deptime'
                                name='deptime'
                                onChange={(e) => {
                                    setNewTime(e.target.value);
                                }}
                                style={{width:"320px",height:"60px",fontSize:"20px"}}
                            ></input>


                </div>
                <br />
                <Row style={{marginRight:"25%"}}>
                    <Col>
                        <Button
                            onClick={()=>{
                                changeTime()
                            }}
                            style={{backgroundColor:"#7C0200"}}
                        >Update Date and Time
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={()=>{
                                setToCurrentTime()
                            }}
                            style={{backgroundColor:"#7C0200"}}
                        >Set to Current Date and Time
                        </Button>
                    </Col>

                </Row>
                
                </Col>
                </Row>
            </div>

            
            
        </div>
    );
}

export default PatientDashboard;