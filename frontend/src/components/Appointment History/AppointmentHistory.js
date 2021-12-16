import React, { useState, useContext, useEffect } from "react";
import {Button,Row,Col,Card, Modal} from 'react-bootstrap'
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import {ThemeContext} from '../../App';
import './AppointmentHistory.css';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';


function AppointmentHistory(props) {

    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);
    const [futureAppointmentDetails,setFutureAppointmentDetails]=useState([]);
    const [pastAppointmentDetails,setPastAppointmentDetails]=useState([]);
    const [systemYear,setSystemYear]=useState(0);
    const [systemMonth,setSystemMonth]=useState(0);
    const [systemDate,setSystemDate]=useState(0);
    const [currentSystemTime,setCurrentSystemTime]=useState(0);

    //for getting the future and past appointments states
    const[patientid, changePatientId] = useState(-1);
    const[Date, changeDate] = useState("");
    const[Time, changeTime] = useState("");


    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[newDateTime, changeNewDateTime] = useState("");

    let navigate = useNavigate();


    useEffect(()=>{
        console.log("System Time:",systemTime);
        console.log("Mimic Time Flag",mimicTime);
        const patientDetails=JSON.parse(localStorage.getItem('patientDetails'))
        const patientId=patientDetails.mrn
        console.log(patientId)
        changePatientId(patientId);
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
        changeDate(date);
        let time = splittedDate[4];
        console.log(time)
        changeTime(time)

        //Setting the states 

        setSystemYear(splittedDate[3]);
        setSystemMonth(month);
        setSystemDate(splittedDate[2]);
        setCurrentSystemTime(splittedDate[4]);

        getFutureAppointments(patientId, date, time);
        getPastAppointments(patientId, date, time);

        

    },[]);


    const getFutureAppointments = (patientId, date, time)=>{
        axios.get(`${backendServer}/getFutureAppointments`,{params:{patientId,date,time}}).then((response) => {
            console.log('Got response for future data', response.data);
            console.log(response.status)
            setFutureAppointmentDetails(response.data)  
        });
    }

    const getPastAppointments = (patientId, date, time)=>{
        axios.get(`${backendServer}/getPastAppointments`,{params:{patientId,date,time}}).then((response) => {
            console.log('Got response data for past', response.data);
            console.log(response.status)
            setPastAppointmentDetails(response.data)
        });

    }


    const checkIn = (appointment)=>{
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
        console.log("isMimic",mimicTime);
        console.log(appointment);


        const data = {
            appointmentId:appointment.appointmentId,
            currentDate:date,
            currentTime:time,
            mimic:mimicTime
        }
        console.log(data);

        axios.post(`${backendServer}/onlineCheckIn`,data)
        .then((response)=>{
            console.log(response.status);
            if(response.status == 200){
                getFutureAppointments(patientid, Date, Time);
                getPastAppointments(patientid, Date, Time);
            }  
        })
    }


    const cancelAppointment = (appointment) =>{

        console.log(appointment);


        const data = {
            appointmentId:appointment.appointmentId
        }
        
        console.log(data);

        axios.post(`${backendServer}/cancelAppointment`,data)
        .then((response)=>{
            console.log(response.status);
            
            getFutureAppointments(patientid, Date, Time);
            getPastAppointments(patientid, Date, Time);
            
        })

    }

    const useStyles = makeStyles((theme) => ({
        root: {
            fontSize: '200pt',
        },
        table: {
            fontSize: '200pt',
        },
        tablecell: {
            fontSize: '40pt',
        },
        root: {
            '& .Autocomplete': {
                border: '2px solid grey',
                minHeight: 400,
                color: 'green',
                fontSize: 18,
                //hover discussed above
                '& li': {
                    //list item specific styling
                    border: '2px solid green',
                    borderRadius: 4,
                },
            },
        },
    }));

    const classes = useStyles();

    const createFutureAppointmentTableRows=(row,index)=>
    {
        const rowYear = row.appointmentDate.split("-")[0] 
        const rowMonth = row.appointmentDate.split("-")[1]
        const rowMimicDate = row.appointmentDate.split("-")[2] - 1
        const rowDate = row.appointmentDate.split("-")[2] 
        const rowTime = row.appointmentTime.split(":")[0]
        const updatedRowTime = row.appointmentTime
        const rowMimicTime = row.appointmentTime.split(":")[0] - 1

        console.log(rowYear);
        console.log(rowMonth);
        console.log(rowMimicDate);
        console.log(rowDate);
        console.log(rowTime);
        console.log(rowMimicTime);
        console.log(systemDate - 1);


        console.log("Current System time", currentSystemTime);
        console.log(rowYear == systemYear);
        console.log(rowMonth == systemMonth);
        console.log(rowDate == systemDate || rowMimicDate == systemDate);
        console.log((systemDate == rowDate && currentSystemTime <= rowTime) || (systemDate == rowMimicDate  && currentSystemTime >= rowMimicTime));


        console.log("Codn1:",(systemDate == rowDate && currentSystemTime <= rowTime));
        console.log("Codn2:",((systemDate -1) == rowDate) && currentSystemTime >= rowTime);
        console.log("Current System Time",currentSystemTime)


        return (
            // <TableBody>
            
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.clinic.clinicName}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.appointmentDate}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.appointmentTime}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.vaccines.map(vc=>(
                        <li>{vc.vaccineName}</li>
                    ))}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                <Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 

    
    onClick={(e)=>{
        handleShow();
    }}
    >Change</Button>

    <Modal show={show} onHide={handleClose}
    
    centered
    >
        <Modal.Header closeButton>
        <Modal.Title>Change Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
        <label>Appointment Date Time</label>
        <input
            type="datetime-local"
            className="form-control"
            id="datetime"
            name="datetime"
            aria-describedby="emailHelp"
            placeholder="Enter Date"
            onChange={(event) => changeNewDateTime(event.target.value)}
        />
        <br/>
        </div>
            
        </Modal.Body>
        <Modal.Footer>
        
        <Button variant="primary" onClick={(event)=>{
            event.preventDefault();
            console.log(newDateTime);
            console.log(new window.Date(newDateTime));
            let updatedTime = new window.Date(newDateTime);
            
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

            const splittedDate = updatedTime.toString().split(' ');
            console.log(splittedDate)


            const monthText = updatedTime.toString().split(' ')[1];
            const month = map.get(monthText);
            console.log(month)
            let date = splittedDate[3]+"-"+month+"-"+splittedDate[2];
            console.log("New Date",date)
            let time = splittedDate[4];
            console.log("New Time",time)

            console.log(row);


            const data = {
                appointmentDate:date,
                appointmentTime:time,
                clinicId: row.clinic.clinicId,
                appointmentId:row.appointmentId,
                mrn: patientid
            } 

            console.log(data);

            axios.post(`${backendServer}/changeAppointment`,data)
            .then((response)=>{
                console.log(response);
                if(response.status == 200){
                    alert("Appointment Updated!");
                    navigate("/patientDashboard");
                }
            }).catch((error)=>{
                
                alert(error.response.data)
            })

        }}>
            Change Appointment
        </Button>
        </Modal.Footer>
    </Modal>
                </TableCell>

                <TableCell align='center' style={{ fontSize: 15 }}>
                <Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 
    
    onClick={()=>{
        cancelAppointment(row);
    }}
    >Cancel Appointment</Button>

                </TableCell>

                <TableCell align='center' style={{ fontSize: 15 }}>
                {
                rowYear == systemYear 
                                    &&
                rowMonth == systemMonth
                                    &&
                ((systemDate == rowDate && currentSystemTime <= updatedRowTime) || (systemDate == (rowDate - 1) && currentSystemTime >= updatedRowTime &&
                currentSystemTime.split(':')[1]>=updatedRowTime.split(':')[1]))


                            ? 
                    (row.mimicStatus == 1 || row.status == 1)

                            ?
                    <p>Checked In</p>
                            :
                        <Button
                            onClick={(event)=>{
                                checkIn(row);
                            }}

                            style={{backgroundColor:"#7C0200"}}
                        >
                            Check in        
                        </Button>

                        :
                    

                    <p>Check In online before 24 hours</p>
                    
        

    }
                </TableCell>
            </TableRow>

            // </TableBody>
        );
    };


    const createPastAppointmentTableRows=(row,index)=>
    {
        return(
            
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.clinic.clinicName}
            </TableCell>
            
            <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.appointmentDate}
            </TableCell>
            
            <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.appointmentTime}
            </TableCell>
            
            <TableCell align='center' style={{ fontSize: 15 }}>
                {row.vaccines.map(vc=>(<div>
             <li>{vc.vaccineName}</li></div>))}
            </TableCell>
            
            <TableCell align='center' style={{ fontSize: 15 }}>
            {row.status==2?row.mimicStatus==1?<p>Completed</p>:<p>No Show</p>:<p>No Show</p>}
            </TableCell>
            </TableRow>

            
        )
    }






//     const createFutureAppointmentCards=(row,index)=>
//     {

//         const rowYear = row.appointmentDate.split("-")[0] 
//         const rowMonth = row.appointmentDate.split("-")[1]
//         const rowMimicDate = row.appointmentDate.split("-")[2] - 1
//         const rowDate = row.appointmentDate.split("-")[2] 
//         const rowTime = row.appointmentTime.split(":")[0]
//         const rowMimicTime = row.appointmentTime.split(":")[0] - 1


//         console.log(rowYear);
//         console.log(rowMonth);
//         console.log(rowMimicDate);
//         console.log(rowDate);
//         console.log(rowTime);
//         console.log(rowMimicTime);
//         console.log(systemDate - 1);

//         console.log("Current System time", currentSystemTime);
//         console.log(rowYear == systemYear);
//         console.log(rowMonth == systemMonth);
//         console.log(rowDate == systemDate || rowMimicDate == systemDate);
//         console.log((systemDate == rowDate && currentSystemTime <= rowTime) || (systemDate == rowMimicDate  && currentSystemTime >= rowMimicTime));


//         console.log("Codn1:",(systemDate == rowDate && currentSystemTime <= rowTime));
//         console.log("Codn2:",((systemDate -1) == rowDate) && currentSystemTime >= rowTime);
//         return(

//             <div>
//     <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"200px"}}>
//   <Card.Header as="h5" style={{fontWeight:"bold", fontSize:"1rem"}}>Clinic Name: {row.clinic.clinicName}</Card.Header>
//   <Card.Body>  
//   <div className="futureapp">
    
//     <Card.Title><h6><b style={{fontSize:"1.1rem"}}>Appointment Date:</b><br/>{(row.appointmentDate)}</h6></Card.Title>
    
//     <Card.Title><h6><b style={{fontSize:"1.1rem"}}> Appointment Time:</b><br/>{(row.appointmentTime)}</h6></Card.Title>
    
//     <Card.Title><h6><b style={{fontSize:"1.1rem"}}></b></h6>{row.vaccines.map(vc=>(<div>
//         <li>{vc.vaccineName}</li></div>
//     ))}</Card.Title>
    
//     <Card.Title>
//     <Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 

    
//     onClick={(e)=>{
//         handleShow();
//     }}
//     >Change</Button>

//     <Modal show={show} onHide={handleClose}
    
//     centered
//     >
//         <Modal.Header closeButton>
//         <Modal.Title>Change Appointment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <div className="form-group">
//         <label>Appointment Date Time</label>
//         <input
//             type="datetime-local"
//             className="form-control"
//             id="datetime"
//             name="datetime"
//             aria-describedby="emailHelp"
//             placeholder="Enter Date"
//             onChange={(event) => changeNewDateTime(event.target.value)}
//         />
//         <br/>
//         </div>
            
//         </Modal.Body>
//         <Modal.Footer>
        
//         <Button variant="primary" onClick={(event)=>{
//             event.preventDefault();
//             console.log(newDateTime);
//             console.log(new window.Date(newDateTime));
//             let updatedTime = new window.Date(newDateTime);
            
//             let map = new Map();
//             map.set("Jan",1);
//             map.set("Feb",2);
//             map.set("Mar",3);
//             map.set("Apr",4);
//             map.set("May",5);
//             map.set("Jun",6);
//             map.set("Jul",7);
//             map.set("Aug",8);
//             map.set("Sep",9);
//             map.set("Oct",10);
//             map.set("Nov",11);
//             map.set("Dec",12);

//             const splittedDate = updatedTime.toString().split(' ');
//             console.log(splittedDate)


//             const monthText = updatedTime.toString().split(' ')[1];
//             const month = map.get(monthText);
//             console.log(month)
//             let date = splittedDate[3]+"-"+month+"-"+splittedDate[2];
//             console.log("New Date",date)
//             let time = splittedDate[4];
//             console.log("New Time",time)

//             console.log(row);


//             const data = {
//                 appointmentDate:date,
//                 appointmentTime:time,
//                 clinicId: row.clinic.clinicId,
//                 appointmentId:row.appointmentId,
//                 mrn: patientid
//             } 

//             console.log(data);

//             axios.post(`${backendServer}/changeAppointment`,data)
//             .then((response)=>{
//                 console.log(response);
//                 if(response.status == 200){
//                     alert("Appointment Updated!");
//                     navigate("/patientDashboard");
//                 }
//             })

//         }}>
//             Change Appointment
//         </Button>
//         </Modal.Footer>
//     </Modal>
//     </Card.Title>
// <Card.Title>
// <Button variant='danger' style={{ fontSize:"1rem", fontWeight:"bold",backgroundColor:"#7C0200"}} 
    
//     onClick={()=>{
//         cancelAppointment(row);
//     }}
//     >Cancel Appointment</Button>
// </Card.Title>

// <Card.Title>
//     {
//                 rowYear == systemYear 
//                                     &&
//                 rowMonth == systemMonth
//                                     &&
//                 ((systemDate == rowDate && currentSystemTime <= rowTime) || (systemDate == (rowDate - 1)) && currentSystemTime >= rowTime)


//                             ? 
//                     (row.mimicStatus == 1 || row.status == 1)

//                             ?
//                     <p>Checked In</p>
//                             :
//                         <Button
//                             onClick={(event)=>{
//                                 checkIn(row);
//                             }}
//                         >
//                             Check in        
//                         </Button>

//                         :
                    

//                     <p>Check In online before 24 hours</p>
                    
        

//     }
// </Card.Title>

  
//     </div>    
//   </Card.Body>
// </Card>
//             </div>
//         )
//     }


// const createPastAppointmentCards=(row,index)=>
//     {
//         return(

//             <div>
//     <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"200px"}}>
//   <Card.Header as="h5" style={{fontWeight:"bold", fontSize:"1rem"}}>Clinic Name: {row.clinic.clinicName}</Card.Header>
//   <Card.Body>  
//   <div className="customerreservation">
    
//     <Card.Title><h5><b style={{fontSize:"1.3rem"}}>Appointment Date:</b><br/>{(row.appointmentDate)}</h5></Card.Title>
    
//     <Card.Title><h5><b style={{fontSize:"1.3rem"}}> Appointment Time:</b><br/>{(row.appointmentTime)}</h5></Card.Title>
    
//     <Card.Title><h5><b style={{fontSize:"1.3rem"}}> Vaccines:</b></h5>{row.vaccines.map(vc=>(<div>
//         <li>{vc.vaccineName}</li></div>
//     ))}</Card.Title>

// <Card.Title><h5><b style={{fontSize:"1.3rem"}}> Appointment Status:</b><br/>{row.status==2?row.mimicStatus==1?<p>Completed</p>:<p>No Show</p>:<p>No Show</p>}</h5></Card.Title>

//     </div>    
//   </Card.Body>
// </Card>
//             </div>
//         )
//     }

    // return (
    //     <div>
    //         <PatientNavbar/>
    //         <div>
    //         {futureAppointmentDetails.length>0?(<div><br/><br/><h1><center style={{fontWeight:"bold"}}>Future Appointments  </center></h1></div>):''}
    //         {futureAppointmentDetails?([futureAppointmentDetails.map(createFutureAppointmentCards)]):''}
    //         </div>

    //         <div>
    //         {pastAppointmentDetails.length>0?(<div><br/><br/><h1><center style={{fontWeight:"bold"}}>Past Appointments</center></h1></div>):''}
    //         {pastAppointmentDetails?([pastAppointmentDetails.map(createPastAppointmentCards)]):''}
    //         </div>

    //     </div>
    // );
    return(
        <div>
            <PatientNavbar/>
            <div>
            {console.log(futureAppointmentDetails)}
            {futureAppointmentDetails.length>0 ? (<div><center><h3><b>FUTURE APPOINTMENTS</b></h3></center>
                <TableContainer component={Paper} className='tableDetails' style={{marginTop:"2%"}}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table' className={classes.table}>
                        <TableHead>
                            <TableRow class='tablecell'>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Clinic Name
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Date
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Vaccines
                                </TableCell>
                                
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Change Appointment
                                </TableCell>

                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Cancel Appointment
                                </TableCell>
                                
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {futureAppointmentDetails ? [futureAppointmentDetails.map(createFutureAppointmentTableRows)] : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            ) : (
                <center><h3><b>NO FUTURE VACCINATIONS DUE</b></h3></center>
            )}
            </div>
            <br/>
            <br/>

            <div>
            {console.log(pastAppointmentDetails)}
            {pastAppointmentDetails.length>0 ? (<div><center><h3><b>PAST APPOINTMENTS</b></h3></center>
                <TableContainer component={Paper} className='tableDetails' style={{marginTop:"2%"}}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table' className={classes.table}>
                        <TableHead>
                            <TableRow class='tablecell'>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Clinic Name
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Date
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Vaccines
                                </TableCell>
                                
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Appointment Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {pastAppointmentDetails ? [pastAppointmentDetails.map(createPastAppointmentTableRows)] : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            ) : (
                <center><h3><b>NO PAST APPOINTMENTS DUE</b></h3></center>
            )}
            </div>
        </div>
    )
}

export default AppointmentHistory;