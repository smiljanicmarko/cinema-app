import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';


const AddProjection = () => {
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const usernameToken = decoded?.sub

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin]); 



//DEKLARACIJA OBJEKTA, SA IMENIMA IZ DTO! OBAVEZNO ISTA IMENA U NAME ATRIBUT U HTML!
    var kostur = {
    movieId: '',    
	projectionTypeId: '',	
	theaterId: '',	
	time: '',	
	price: '',		
    };

//============================================= S T A T E ============================================================    
const [objekat, setObjekat] = useState(kostur);
const [types, setTypes] = useState([])
const [movies, setMovies] = useState([]) 
const [theatres, setTheatres] = useState([]) 
const [currentTheater, setCurrentTheater] = useState(null)
const [errors, setErrors] = useState({});

    
// ==================================== GLAVNA AXIOS FUNKCIJA ZA KREIRANJE ============================================
    const create = () => {
        if (!validate()) return;
        var params = {
            ...objekat,
            username: usernameToken
        };

        TestAxios.post('/projections', params)
        .then(res => {
            console.log(res);
           
            alert('Dodavanje je uspesno izvrseno!');
            navigate('/projections'); 
        })
        .catch(error => {           
            console.log(error);
            error.response.data.message?
            alert(error.response.data.message):
            alert('Error, please try again!');
         });
    }

    // ============= GENERICKA FUNKCIJA - OBAVEZNO IMATI OBJEKAT SA IMENIMA IZ DTO + "NAME" atribut u html!==============
    // ==============ALTERNATIVA JE  (e) => setNesto (e.target.value)=====================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;      
    
        if (name === "theaterId"){
            setCurrentTheater(value);
            if (value === "") {
                setTypes([]);
            }
        }

        setObjekat((prevState) => ({
            ...prevState,
            [name]: value,
        }));



    };    

    // ======================== DOBAVLJANJE PODATAKA ZA SELECT================================
    const getMovies = useCallback(() => {
        TestAxios.get("/movies")
            .then(res => {
               
                console.log(res);
                setMovies(res.data)               
            })
            .catch(error => {
              
                console.log(error);
                alert('Doslo je do greske, molimo pokusajte ponovo!');
            });
    }, []);
   
    const getTheatres = useCallback(() => {
        TestAxios.get("/theatres")
            .then(res => {
               
                console.log(res);
                setTheatres(res.data)               
            })
            .catch(error => {
              
                console.log(error);
                alert('Doslo je do greske, molimo pokusajte ponovo!');
            });
    }, []);

    const getTypes = useCallback(() => {
        TestAxios.get("/theatres/" + currentTheater + "/projection-types")
            .then(res => {
               
                console.log(res);
                setTypes(res.data)               
            })
            .catch(error => {
              
                console.log(error);
                alert('3');
            });
    }, [currentTheater]);
    useEffect(() => {
        getMovies()
        getTheatres()
       
    }, []);
    useEffect(() => {
        if (currentTheater)
        getTypes();
    }, [currentTheater]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.time = objekat.time ? "" : "This field can't be empty!";
        tempErrors.price = objekat.price ? "" : "This field can't be empty!";
        if (objekat.price < 0){            
            tempErrors.price =   "Price can't be negative!";
        }
       
        if (new Date(objekat.time) < new Date()) {
            tempErrors.time =  "Date and time can't be in the past!";
        }
       
        tempErrors.movieId = objekat.movieId ? "" : "You must choose a movie!";
        tempErrors.theaterId = objekat.theaterId ? "" : "You must choose a theater!";
        tempErrors.projectionTypeId = objekat.projectionTypeId ? "" : "You must choose a projection type!";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
return(
<div>
    <h1>Add new projection</h1>

    <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                    <FormGroup>
                        <FormLabel htmlFor='time'>Date and time</FormLabel>
                        <Form.Control isInvalid={!!errors.time} type='datetime-local' id='time' name='time' onChange={valueInputChanged}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.time} </Form.Control.Feedback> 
                      </FormGroup>

                      <FormGroup>
                        <FormLabel htmlFor='price'>Price</FormLabel>
                        <Form.Control isInvalid={!!errors.price} type='number' id='price' name='price' onChange={valueInputChanged}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.price} </Form.Control.Feedback> 
                      </FormGroup>

                     

                    
 {/*===================================== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! ========================== */} 
                      <FormGroup>
                        <FormLabel htmlFor='movieId'>Movie</FormLabel>
                        <Form.Control isInvalid={!!errors.movieId} as='select' id='movieId' name='movieId' onChange={valueInputChanged}>
                        <option value=''>Choose movie</option>
                        {
                            movies
                            .filter(movie => !movie.deleted)
                            .map((obj, index) =>{
                                return (
                                    <option key={obj.id} value={obj.id}> {obj.name} </option>
                                )
                            })
                        }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.movieId} </Form.Control.Feedback> 
                      </FormGroup>
  {/*===================================== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! ========================== */} 
                         <FormGroup>
                        <FormLabel htmlFor='theaterId'>Theater</FormLabel>
                        <Form.Control isInvalid={!!errors.theaterId} as='select' id='theaterId' name='theaterId' onChange={valueInputChanged}>
                        <option value=''>Choose theater</option>
                        {
                            theatres.map((obj, index) =>{
                                return (
                                    <option key={obj.id} value={obj.id}> {obj.name} </option>
                                )
                            })
                        }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.theaterId} </Form.Control.Feedback> 
                      </FormGroup>
                    
                      <FormGroup>
                        <FormLabel htmlFor='projectionTypeId'>Projection Type</FormLabel>
                        <Form.Control isInvalid={!!errors.projectionTypeId} as='select' id='projectionTypeId' name='projectionTypeId' onChange={valueInputChanged}>
                        <option value=''>Choose type</option>
                        {types.length > 0 &&
                            types.map((obj, index) =>{
                                return (
                                    <option key={obj.id} value={obj.id}> {obj.type} </option>
                                )
                            })
                        }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.projectionTypeId} </Form.Control.Feedback> 
                      </FormGroup>
           



                        <Button type="button" className="btn btn-success"  onClick={() => create()}>Create Projection</Button>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
                
            </Row>
</div>
)}

export default AddProjection