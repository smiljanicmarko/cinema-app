import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';



const UserRegistration = () => {

//DEKLARACIJA OBJEKTA, SA IMENIMA IZ DTO! OBAVEZNO ISTA IMENA U NAME ATRIBUT U HTML!
    var kostur = {
        korisnickoIme: "",
        eMail: "",
        ime: "",
        prezime: "",
        lozinka : "",
       ponovljenaLozinka: ""
    };

//============================================= S T A T E ============================================================    
    const [rezultat, setRezultat] = useState([]) // STATE ZA SELECT OPCIJU
    const [objekat, setObjekat] = useState(kostur);

    var navigate = useNavigate();
// ==================================== GLAVNA AXIOS FUNKCIJA ZA KREIRANJE ============================================
    const create = () => {
        // var params = {
        //     'naziv': objekat.ime,
        //     'trajanje': objekat.duration
        // };

        TestAxios.post('/korisnici', objekat)
        .then(res => {
            console.log(res);
           
            alert('Dodavanje je uspesno izvrseno!');
            navigate('/projections'); 
        })
        .catch(error => {           
            console.log(error);
            alert('Doslo je do greske, molimo pokusajte ponovo!');
         });
    }

    // ============= GENERICKA FUNKCIJA - OBAVEZNO IMATI OBJEKAT SA IMENIMA IZ DTO + "NAME" atribut u html!==============
    // ==============ALTERNATIVA JE  (e) => setNesto (e.target.value)=====================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;      
    
        setObjekat((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


   

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
return(
<div>
    <h1>Registration page</h1>

    <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                      <FormGroup>
                        <FormLabel htmlFor='ime'>Name</FormLabel>
                        <Form.Control type='text' id='ime' name='ime' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='prezime'>Last name</FormLabel>
                        <Form.Control type='text' id='prezime' name='prezime' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='eMail'>Email</FormLabel>
                        <Form.Control type='text' id='eMail' name='eMail' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='korisnickoIme'>Username</FormLabel>
                        <Form.Control type='text' id='korisnickoIme' name='korisnickoIme' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='lozinka'>Password</FormLabel>
                        <Form.Control type='password' id='lozinka' name='lozinka' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='ponovljenaLozinka'>Repeat password</FormLabel>
                        <Form.Control type='password' id='ponovljenaLozinka' name='ponovljenaLozinka' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>

 

                        <Button style={{ marginTop: '15px' }} onClick={() => create()}  >Create account</Button>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
                
            </Row>
</div>
)}

export default UserRegistration