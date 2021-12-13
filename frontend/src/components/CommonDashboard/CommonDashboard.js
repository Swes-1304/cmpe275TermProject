import React from 'react';
import AdminNavbar from '../CommonNavbar/CommonNavbar';
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";

function AdminDashboard(props) {
    return (
        <div>
            <AdminNavbar/>
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
  
/>
            <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-3'>
            <Card style={{ width: '18rem', height:'15rem',marginTop:'10%'}}>
  <Card.Body>
    <Card.Title><h2>Admin Portal</h2></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Admin Functions</Card.Subtitle>
    <Card.Text>
     <li>Add Clinics</li>
     <br/>
     <li>Add Diseases</li>
     <br/>
     <li>Add Vaccinations</li>
    </Card.Text>
    
  </Card.Body>
</Card>
</div>

<div className='col-md-3'>
            <Card style={{ width: '18rem',height:'15rem', marginTop:'10%'}}>
  <Card.Body>
    <Card.Title><h2>Patient Portal</h2></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Patient Functions</Card.Subtitle>
    <Card.Text>
     <li>View Reports</li>
     <br/>
     <li>Add Diseases</li>
     <br/>
     <li>Add Diseases</li>
    </Card.Text>
  </Card.Body>
</Card>
</div>




</div>
        </div>
    );
}

export default AdminDashboard;