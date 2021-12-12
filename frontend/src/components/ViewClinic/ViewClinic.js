import React, { useState } from "react";
import axios from 'axios';
import backendServer from "../../../src/webConfig"
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import AdminNavbar from "../AdminNavbar/AdminNavbar"

function ViewClinic() {
    
    return (
        <div>
            <AdminNavbar/>
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
            HELLO FROM VIEW CLINIC
        </div>
    );
}

export default ViewClinic;