import React, { useEffect, useState, useContext } from "react";
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import Select from 'react-select';
import {Button,Row,Col,Card} from 'react-bootstrap'
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import {ThemeContext} from '../../App';
import './BookAppointments.css'
import { useNavigate } from 'react-router-dom';



function BookAppointmentPage(props) {
    const [selectOptions, handleSelectOptionsChange] = useState(()=>{
        return [];
    });

    const [value, handleValueChange] = useState(()=>{
        return [];
    });

    let navigate = useNavigate();

    const [selectedTime,setSelectedTime]=React.useState("")
    const [clinicResponse,setClinicResponse]=React.useState([])
    // const [appointmentDate,setAppointmentDate]=React.useState([])
    // const [appointmentTime,setAppointmentTime]=React.useState([])


    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);

    //for getting the future and past appointments states
    const[patientid, changePatientId] = useState(-1);
    const[Date, changeDate] = useState("");
    const[Time, changeTime] = useState("");


    const[vaccineDue,setVaccineDue]=useState([]);

    const displayClinics=(row,index)=>
    {
        return (

            <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"180px"}}>
  <Card.Header as="h5" style={{fontWeight:"bold", fontSize:"1.5rem"}}>Clinic Name: {row.clinicName}</Card.Header>
  <Card.Body>  
  <div className="displayclinic">
    <Card.Title style={{marginTop:"auto"}}> <h3><b>Clinic Open Time:</b><br/>{row.businessHoursStart}</h3></Card.Title>
    
    <Card.Title style={{marginTop:"auto"}}> <h3><b>Clinic Close Time:</b><br/>{row.businessHoursEnd}</h3></Card.Title>
    
    <Card.Title><h5><b style={{fontSize:"1.5rem"}}> Number of Physicians:{row.numberOfPhysicians}</b><br/>{}</h5></Card.Title>
    
    <Button variant='danger' style={{height:"80px",marginLeft:"50px", fontSize:"1.35rem", backgroundColor:"#7C0200"}} 
    
    onClick={(e)=>{
        let vaccinationIds=[]
        let shotNumber=[]
        
        
        for(let i=0;i<value.length;i++)
        {
            vaccinationIds.push(value[i].value)
            
        }
            
        for(let i=0;i<vaccinationIds.length;i++)
        {
        for(let j=0;j<vaccineDue.length;j++)
        {
            
            if(vaccinationIds[i]==vaccineDue[j].vaccineID)
            {
                shotNumber.push(vaccineDue[j].shotNumber)
            }

        }
    }

    //Some checks

    //

    const data ={
        vaccinationIds:vaccinationIds,
        appointmentDate:Date,
        appointmentTime:Time,
        clinicId:row.clinicId,
        mrn:patientid,
        shotNumber:shotNumber
    }

    console.log(data);

    axios.post(`${backendServer}/bookAppointment`,data)
    .then((response)=>{
        console.log(response);
        if(response.status == 201){
            alert("Appointment Booked!");
            navigate("/patientDashboard");
        }
    })
        
    }}
    >Book Appointment</Button>
  
    </div>    
  </Card.Body>
</Card>
        )
    }
    

    // const getOptions=()=>
    // {
        
        
    //     axios.get(`${backendServer}/getVaccineDue`,{
    //         params:{
    //             patientId:patientid,
    //             date:Date,
    //             time:Time
    //         }
    //     }).then((response) => {
    //         console.log('Got response data', response.data);
    //         setVaccineDue(response.data)
    //         console.log(response.status)
    //         const data=response.data
    //         console.log(data)
    //         const options=data.map(element=>({
    //             "value":element.vaccineId,
    //             "label":element.vaccineName
    //         }))
    //         handleSelectOptionsChange(options)
    //     });



    // }

    useEffect(async() => {
        const patientDetails=JSON.parse(localStorage.getItem('patientDetails'))
        console.log(patientDetails.mrn);
        changePatientId(patientDetails.mrn)
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
        changeDate(date);
        let time = splittedDate[4];
        console.log(time)
        changeTime(time)


        axios.get(`${backendServer}/getVaccineDue`,{
            params:{
                patientId:patientDetails.mrn,
                date:date,
                time:time
            }
        }).then((response) => {
            console.log('Got response data', response.data);
            setVaccineDue(response.data)
            const data=response.data
            console.log(data)
            const options=data.map(element=>({
                "value":element.vaccineID,
                "label":element.vaccineName
            }))
            handleSelectOptionsChange(options)
        });

        
    
    },[]);

    return (
        
        <div>
            {console.log(clinicResponse)}
           <PatientNavbar/> 
           <center><h4>SEARCH APPOINTMENTS</h4></center>
           <div className="thiscontainer">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{borderStyle:"solid",marginTop:"2%"}}>
            
            <form id="loginform">
            <label>Select Vaccinies</label>
            <div className="form-group">
            <Select isMulti
                options={selectOptions}
                isSearchable

                onChange={(event)=>{
                    handleValueChange(event);
                    console.log(value);
                }}
                placeholder="Select Vaccines" 
                required    
                />
                </div>
                <br/>
                <div className="form-group">
                <label for='deptime'>Appointment Time:</label>
                            <br></br>
                            <input
                                type='datetime-local'
                                id='deptime'
                                name='deptime'
                                required
                                onChange={(e) => {
                                    setSelectedTime(e.target.value);
                                }}
                            ></input>


                </div>
                <br/>
                <center><button className="btn btn-primary" style={{backgroundColor:"#7C0200"}} disabled={value.length == 0 ? true: false}
               
                onClick={(event)=>{
                    event.preventDefault();
                    console.log("Inside click")
                    
                    console.log("Selected Time",selectedTime)
                    let changedDateTime = new window.Date(selectedTime);
                    console.log(changedDateTime)

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


                    const splittedDate = changedDateTime.toString().split(' ');
                console.log(splittedDate)


                const monthText = changedDateTime.toString().split(' ')[1];
                const month = map.get(monthText);
                console.log(month)
                let date = splittedDate[3]+"-"+month+"-"+splittedDate[2];
                console.log("Date",date)
                let newDate=new window.Date(date)
                console.log("NEW",newDate)


                    let duedate=""
                    for(let i=0;i<vaccineDue.length;i++)
                    {
                        console.log(vaccineDue[i].vaccineName,value)
                        if(vaccineDue[i].vaccineName==value[0].label)
                        {
                            duedate=vaccineDue[i].dueDate
                        }
                    }
                    console.log("DUE DATE",duedate)
                    console.log("Condition",newDate<new window.Date(duedate))
                    if(newDate<new window.Date(duedate))
                        {
                            alert("Cannot select a date before the due date")
                            return
                        }
                    console.log(selectedTime.split(':')[1])
                    if(selectedTime.split(':')[1]%15!=0)
                    {

                        alert("Please select 0th,15th,30th,45th minute of the hour")
                        return
                    }
                
                    // console.log("Selected Time",selectedTime)
                    // let changedDateTime = new window.Date(selectedTime);
                    // console.log(changedDateTime)

        //             let map = new Map();
        // map.set("Jan",1);
        // map.set("Feb",2);
        // map.set("Mar",3);
        // map.set("Apr",4);
        // map.set("May",5);
        // map.set("Jun",6);
        // map.set("Jul",7);
        // map.set("Aug",8);
        // map.set("Sep",9);
        // map.set("Oct",10);
        // map.set("Nov",11);
        // map.set("Dec",12);

        // const splittedDate = changedDateTime.toString().split(' ');
        // console.log(splittedDate)


        // const monthText = changedDateTime.toString().split(' ')[1];
        // const month = map.get(monthText);
        // console.log(month)
        // let date = splittedDate[3]+"-"+month+"-"+splittedDate[2];
        // console.log("Date",date)
        // let newDate=new Date(date)
        // console.log("NEW",newDate)
        changeDate(date);
        
        
        
        let time = splittedDate[4];
        console.log("Time",time)
        changeTime(time)
        
                    axios.get(`${backendServer}/getClinics`,{
                        params:{
                            date:date,
                            time:time
                        }
                    }).then((response) => {
                        console.log('Got response data', response.data);
                        let arr=[]
                        for(let i=0;i<response.data.length;i++)
                        {
                            console.log(new window.Date(response.data[i].businessHoursStart).getTime())
                            let startTime=response.data[i].businessHoursStart.split(':')
                            let endTime=response.data[i].businessHoursEnd.split(':')

                            let selected=selectedTime.split('T')[1].split(':');

                            // if(response.data[i].businessHoursStart<=selectedTime 
                            //     && response.data[i].businessHoursEnd>=selectedTime)
                            //     {
                            //         arr.push(response.data[i])
                            //     }

                            if(startTime[0]<=selected[0] && endTime[0]>=selected[0])                                
                            {
                                if((startTime[0] === selected[0] && startTime[1] > selected[1]) || (endTime[0] === selected[0] && endTime[1] < selected[1]))
                                    continue;

                                arr.push(response.data[i])
                            }

                                
                        }
                        if(arr.length==0)
                        {
                            alert("No clinics available for the selected time")
                            return
                        }
                        setClinicResponse(arr)
                        
                        

                    });
                    
                }}
                
                >
                Search Clinics
              </button></center>
                 <br/>
            </form>
            <br/>
          </div>
        </div>
      </div>
      {clinicResponse.length>0?(<div><br/><br/><h1><center style={{fontWeight:"bold"}}>Available Clinics</center></h1></div>):''}
            {clinicResponse?([clinicResponse.map(displayClinics)]):''}
        </div>
    );
}

export default BookAppointmentPage;