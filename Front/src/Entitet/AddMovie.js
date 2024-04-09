import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown'


const AddMovie = () => {

    //DEKLARACIJA OBJEKTA, SA IMENIMA IZ DTO! OBAVEZNO ISTA IMENA U NAME ATRIBUT U HTML!
    var kostur = {
        
        name: '',
        director: '',
        actors: '',
        genres: [],
        duration: '',
        distributor: '',
        country: '',
        year: '',

        description: '',
    };

    //============================================= S T A T E ============================================================    
    const [rezultat, setRezultat] = useState([]) // STATE ZA SELECT OPCIJU
    const [objekat, setObjekat] = useState(kostur);

    var navigate = useNavigate();
    // ==================================== GLAVNA AXIOS FUNKCIJA ZA KREIRANJE ============================================
    const create = () => {
        const genreMap = {};
        objekat.genres.forEach(genreId => {
            genreMap[genreId] = null;
        });

        const params = {
            ...objekat,
            genres: genreMap
        }
        TestAxios.post('/movies', params)
            .then(res => {
                console.log(res);

                alert('Movie was added successfully!');
                navigate('/movies');
            })
            .catch(error => {
                console.log(error);
                alert('Greska u create');
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


    // ======================== DOBAVLJANJE PODATAKA ZA SELECT================================
    const dobaviPodatke = useCallback(() => {
        TestAxios.get('/genres')
            .then(res => {

                console.log(res);
                setRezultat(res.data)
            })
            .catch(error => {

                console.log(error);
                alert('Greska u dobaviPodatke');
            });
    }, []);


    useEffect(() => {
        dobaviPodatke();
    }, []);

    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Add new movie</h1>

            <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">

                    <Form>
                        <Row>
                     <Col>
                        <FormGroup>
                            <FormLabel htmlFor='name'>Movie title</FormLabel>
                            <Form.Control type='text' id='name' name='name' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor='director'>Director</FormLabel>
                            <Form.Control type='text' id='director' name='director' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor='actors'>Actors</FormLabel>
                            <Form.Control as ='textarea' id='actors' name='actors' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor='country'>Country</FormLabel>
                            <Form.Control type='text' id='country' name='country' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor='distributor'>Distributor</FormLabel>
                            <Form.Control type='text' id='distributor' name='distributor' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>
                        </Col>
                        <Col>
                                        

                        <FormGroup>
                            <FormLabel htmlFor='duration'>Duration</FormLabel>
                            <Form.Control type='number' id='duration' name='duration' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor='year'>Year</FormLabel>
                            <Form.Control type='number' id='year' name='year' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>

                       
                      
                        
                        <FormGroup>
                            <FormLabel htmlFor='description'>Description</FormLabel>
                            <Form.Control as ='textarea' id='description' name='description' onChange={valueInputChanged}></Form.Control>
                        </FormGroup>     
                        <FormGroup>
                            <FormLabel htmlFor=''>Genres</FormLabel>
                            <Multiselect
                                options={rezultat.map(obj => ({ id: obj.id, name: obj.name }))}
                                displayValue="name"
                                onSelect={(selectedList) => setObjekat(prevState => ({ ...prevState, genres: selectedList.map(item => item.id) }))}
                                onRemove={(selectedList) => setObjekat(prevState => ({ ...prevState, genres: selectedList.map(item => item.id) }))}
                                placeholder="Select genres"
                            />
                        </FormGroup>   
                        
                        </Col>
                        </Row>

                        <Row>
                        <Col className="text-right">
                            <Button type="button" className="btn btn-success" style={{ float: 'right' }} onClick={() => create()}>Add movie</Button>
                        </Col>
                    </Row>

                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>

            </Row>
        </div>
    )
}

export default AddMovie