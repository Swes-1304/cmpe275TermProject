import React from 'react';
import PatientNavbar from '../PatientNavbar/PatientNavbar';
import {useState, useEffect, useContext} from 'react';
import {ThemeContext} from '../../App';
import axios from 'axios';
import backendServer from "../../../src/webConfig"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';




function VaccinationsDue(props) {

    const[patientid, changePatientId] = useState(-1);
    // Context 
    const {systemTime, setSystemTime, mimicTime, toggleMimicTime} = useContext(ThemeContext);
    const [vaccinesDue,setVaccinesDue]=React.useState([])

    const createVaccinationDueRow = (row, index) => {
        
         

        return (
            // <TableBody>
            
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.vaccineName}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.manufacturer}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.duration==2147483647?<p>LifeTime Validity</p>:row.duration}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.dueDate}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.diseases.map(disease=>(
                        <li>{disease.diseaseName}</li>
                    ))}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                     {row.shotNumber}/{row.numberOfShots}
                </TableCell>
            </TableRow>
        
            // </TableBody>
        );
    };

    

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


        axios.get(`${backendServer}/getVaccineDue`,{
            params:{
                patientId:patientDetails.mrn,
                date:date,
                time:time
            }
        }).then((response) => {
            console.log('Got response data', response.data);
            setVaccinesDue(response.data)
            
        });

        

    },[]);

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
    

    return (
        <div>
            <PatientNavbar/>
            <div>
            {console.log(vaccinesDue)}
            {vaccinesDue.length>0 ? (<div><center><h3><b>VACCINATIONS DUE</b></h3></center>
                <TableContainer component={Paper} className='tableDetails' style={{marginTop:"2%"}}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table' className={classes.table}>
                        <TableHead>
                            <TableRow class='tablecell'>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Vaccine Name
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Manufacturer
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Vaccine Validity
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Due Date
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Diseases covered
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Shots Due/Total Shots
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {vaccinesDue ? [vaccinesDue.map(createVaccinationDueRow)] : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            ) : (
                <center><h3><b>NO VACCINATIONS DUE</b></h3></center>
            )}
            </div>
        </div>
    );
}

export default VaccinationsDue;