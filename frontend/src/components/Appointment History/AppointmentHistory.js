import React, { useState, useContext, useEffect } from "react";
import {Button,Row,Col,Card} from 'react-bootstrap'
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import {ThemeContext} from '../../App';
import './AppointmentHistory.css'


function AppointmentHistory(props) {

    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);
    const [futureAppointmentDetails,setFutureAppointmentDetails]=useState([]);
    const [pastAppointmentDetails,setPastAppointmentDetails]=useState([]);
    const [systemYear,setSystemYear]=useState(0);
    const [systemMonth,setSystemMonth]=useState(0);
    const [systemDate,setSystemDate]=useState(0);
    const [currentSystemTime,setCurrentSystemTime]=useState(0);

    useEffect(()=>{
        console.log("System Time:",systemTime);
        console.log("Mimic Time Flag",mimicTime);
        const patientDetails=JSON.parse(localStorage.getItem('patientDetails'))
        const patientId=patientDetails.mrn
        console.log(patientId)
        // const date= systemTime
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
        console.log(date)
        let time = splittedDate[4];
        console.log(time)

        //Setting the states 

        setSystemYear(splittedDate[3]);
        setSystemMonth(month);
        setSystemDate(splittedDate[2]);
        setCurrentSystemTime(splittedDate[4]);

        




        //

        

        axios.get(`${backendServer}/getFutureAppointments`,{params:{patientId,date,time}}).then((response) => {
            console.log('Got response for future data', response.data);
            console.log(response.status)
            setFutureAppointmentDetails(response.data)
            
            
            
        });

        axios.get(`${backendServer}/getPastAppointments`,{params:{patientId,date,time}}).then((response) => {
            console.log('Got response data for past', response.data);
            console.log(response.status)
            setPastAppointmentDetails(response.data)
            
            
        });

    },[]);


    const createFutureAppointmentCards=(row,index)=>
    {

        const rowYear = row.appointmentDate.split("-")[0] 
        const rowMonth = row.appointmentDate.split("-")[1]
        const rowMimicDate = row.appointmentDate.split("-")[2] - 1
        const rowDate = row.appointmentDate.split("-")[2] 
        const rowTime = row.appointmentTime.split(":")[0]
        const rowMimicTime = row.appointmentTime.split(":")[0] - 1


        console.log(rowYear);
        console.log(rowMonth);
        console.log(rowMimicDate);
        console.log(rowDate);
        console.log(rowTime);
        console.log(rowMimicTime);

        console.log("Current System time", currentSystemTime);
        console.log(rowYear == systemYear);
        console.log(rowMonth == systemMonth);
        console.log(rowDate == systemDate || rowMimicDate == systemDate);
        console.log((systemDate == rowDate && currentSystemTime <= rowTime) || (systemDate == rowMimicDate  && currentSystemTime >= rowMimicTime));


        return(

            <div>
    <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"200px"}}>
  <Card.Header as="h5" style={{fontWeight:"bold", fontSize:"1rem"}}>Clinic Name: {row.clinic.clinicName}</Card.Header>
  <Card.Body>  
  <div className="futureapp">
    
    <Card.Title><h6><b style={{fontSize:"1.1rem"}}>Appointment Date:</b><br/>{(row.appointmentDate)}</h6></Card.Title>
    
    <Card.Title><h6><b style={{fontSize:"1.1rem"}}> Appointment Time:</b><br/>{(row.appointmentTime)}</h6></Card.Title>
    
    <Card.Title><h6><b style={{fontSize:"1.1rem"}}></b></h6>{row.vaccines.map(vc=>(<div>
        <li>{vc.vaccineName}</li></div>
    ))}</Card.Title>
    
    <Card.Title>
    <Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 

    
    // onClick={(e)=>{{
    //     handleCancelReservation(row.passengerEmailID,row.seatNumber,
    //         row._id,row.flightNumber
    //         ,row.parentEmailID)
    // }
    //     window.location.reload()
    // }}
    >Change</Button>
    </Card.Title>
<Card.Title>
<Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 
    
    // onClick={(e)=>{{
    //     handleCancelReservation(row.passengerEmailID,row.seatNumber,
    //         row._id,row.flightNumber
    //         ,row.parentEmailID)
    // }
    //     window.location.reload()
    // }}
    >Cancel Appointment</Button>
</Card.Title>

<Card.Title>
    {
        rowYear == systemYear 
                            &&
        rowMonth == systemMonth
                            &&
        ( rowDate == systemDate || rowMimicDate == systemDate)
                            &&
        ((systemDate == rowDate && currentSystemTime <= rowTime) || (systemDate == rowMimicDate  && currentSystemTime >= rowMimicTime))


                            ? 
                    row.mimicStatus == 1
                    
                            ?
                    <p>Checked In</p>
                            :
                        <Button
                            onClick={()=>{

                            }}
                        >
                            Check in        
                        </Button>

                        :
                    

                    <p>Check In online before 24 hours</p>
                    
        

    }
</Card.Title>

  
    </div>    
  </Card.Body>
</Card>
            </div>
        )
    }


const createPastAppointmentCards=(row,index)=>
    {
        return(

            <div>
    <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"200px"}}>
  <Card.Header as="h5" style={{fontWeight:"bold", fontSize:"1rem"}}>Clinic Name: {row.clinic.clinicName}</Card.Header>
  <Card.Body>  
  <div className="customerreservation">
    
    <Card.Title><h5><b style={{fontSize:"1.3rem"}}>Appointment Date:</b><br/>{(row.appointmentDate)}</h5></Card.Title>
    
    <Card.Title><h5><b style={{fontSize:"1.3rem"}}> Appointment Time:</b><br/>{(row.appointmentTime)}</h5></Card.Title>
    
    <Card.Title><h5><b style={{fontSize:"1.3rem"}}> Vaccines:</b></h5>{row.vaccines.map(vc=>(<div>
        <li>{vc.vaccineName}</li></div>
    ))}</Card.Title>

<Card.Title><h5><b style={{fontSize:"1.3rem"}}> Appointment Status:</b><br/>{row.status==2?row.mimicStatus==1?<p>Completed</p>:<p>No Show</p>:<p>No Show</p>}</h5></Card.Title>

    </div>    
  </Card.Body>
</Card>
            </div>
        )
    }

    return (
        <div>
            <PatientNavbar/>
            <div>
            {futureAppointmentDetails.length>0?(<div><br/><br/><h1><center style={{fontWeight:"bold"}}>Future Appointments  </center></h1></div>):''}
            {futureAppointmentDetails?([futureAppointmentDetails.map(createFutureAppointmentCards)]):''}
            </div>

            <div>
            {pastAppointmentDetails.length>0?(<div><br/><br/><h1><center style={{fontWeight:"bold"}}>Past Appointments</center></h1></div>):''}
            {pastAppointmentDetails?([pastAppointmentDetails.map(createPastAppointmentCards)]):''}
            </div>

        </div>
    );
}

export default AppointmentHistory;