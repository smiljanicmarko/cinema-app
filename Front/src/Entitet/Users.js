import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const Users = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
    //========================== OBJEKAT PRETRAGE ==================================
    var pretragaObjekat = {
        name: '',
        distributor: '',
        country: '',
        genreId: '',
        durationFrom: '',
        durationTo: '',
        yearFrom: '',
        yearTo: ''
    }

    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [prikaziFormu, setPrikaziFormu] = useState(false);
    const [pretraga, setPretraga] = useState(pretragaObjekat)
    const [genres, setGenres] = useState([])
    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getZadaci();
    }, [pageNo]);

 


    // ======================== DOBAVLJANJE PODATAKA ================================
    // Kada budes ubacivao pretragu,  nakon (?pageNo=${pageNo}`)) stavis ZAREZ i onda {objekat}, da bi se sve slalo u istom zahtevu, i paginacija nastavila da radi.
    //u dependeci tu i iznad u useEffectu obavezno dodati parametar 'pretraga' , i tako imamo live search! 

    // Ako mora na dugme, onda f-ja pretragaClickHandler, useEffect ostaje samo pageNo, a u getZadaci pageNo i pretraga. 

    const getZadaci = useCallback(() => {
        TestAxios.get(`/korisnici?pageNo=${pageNo}`, {
            params: {
                ...pretraga
            }
        })
            .then(res => {
                console.log(res);
                setTabela(res.data)
                setTotalPages(res.headers["total-pages"])
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, [pageNo, pretraga]);


    
    //======================== NAVIGATE ============================================
    var navigate = useNavigate()

    const goToAdd = () => {
        navigate("/new-movie");
    }


    // ======================== BRISANJE ===========================================
    const izbrisi = (id) => {
        TestAxios.delete('/movies/' + id)
            .then(res => {
                // handle success
                console.log(res);
                alert('Brisanje je uspesno izvrseno!');
                setTabela(tabela.filter(el => el.id !== id))
                // window.location.reload();

            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Doslo je do greske, molimo pokusajte ponovo!');
            });
    }

    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const formaHandler = () => {
        setPrikaziFormu(!prikaziFormu);
    };

    const valueInputChanged = (e) => {
        const { name, value } = e.target;
        setPretraga((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const pretragaClickHandler = () => {
        setPageNo(0);
        getZadaci();
    }

    
    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{klasa.ime}</td>
                    <td>{klasa.prezime}</td>
                    <td>{klasa.korisnickoIme}</td>
                    <td>{klasa.eMail}</td>
                    <td>{klasa.uloga}</td>
                    <td>{klasa.distributor}</td>
                    {/* === DUGMICI ===*/}
                    {/* {isAdmin? <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td>: <td></td>}
                    <td> <Button onClick={() => navigate("/movies/" + klasa.id)}>Details</Button> </td> */}
                </tr>
            )
        })
    }

    //========================================== RENDER FORME ZA PRETRAGU====================================================
    //=======================================================================================================================
    const renderFormu = () => {
        return (
            <div>
                <Form>
                    <Row className="align-items-end">
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Form.Control type='text' name="name" id="name" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="distributor">Distributor</FormLabel>
                                <Form.Control type='text' name="distributor" id="distributor" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="country">Country</FormLabel>
                                <Form.Control type='text' name="country" id="country" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="genreId">Genre</FormLabel>
                                <Form.Control as='select' name="genreId" id="genreId" onChange={valueInputChanged}>
                                    <option value=''>Choose genre</option>
                                    {
                                        genres.map((obj, index) => {
                                            return (
                                                <option key={obj.id} value={obj.id}> {obj.name} </option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="durationFrom">Duration from</FormLabel>
                                <Form.Control type='number' name="durationFrom" id="durationFrom" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="durationTo">Duration to</FormLabel>
                                <Form.Control type='number' name="durationTo" id="durationTo" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="yearFrom">Year from</FormLabel>
                                <Form.Control type='number' name="yearFrom" id="yearFrom" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="yearTo">Year to</FormLabel>
                                <Form.Control type='number' name="yearTo" id="yearTo" onChange={valueInputChanged}></Form.Control>
                            </FormGroup>
                        </Col>
                    </Row>

                    {/*============== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! =========== */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Row>
                            <Col md={3}>
                                <Button type="button" onClick={pretragaClickHandler}>Search</Button>
                            </Col>

                            {/*============== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! =========== */}

                        </Row>
                    </div>
                </Form>
            </div>

        )
    }









    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Users details</h1>
            {/* ================================== PRETRAGA meni================= */}

            <div>
                <Form.Check type="checkbox" label="Show search" onChange={formaHandler} />
                {prikaziFormu && renderFormu()}
                <br />
            </div>

            



            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}
           
           {isAdmin?<Button className="btn btn-success" onClick={goToAdd} >New movie</Button> : <></> }
            

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Row>
                    <Col>
                        <Button disabled={pageNo <= 0} onClick={() => setPageNo(pageNo - 1)}>Previous</Button>
                    </Col>
                    <Col>
                        <Button disabled={pageNo >= totalPages - 1} onClick={() => setPageNo(pageNo + 1)}>Next</Button>
                        <span> {pageNo + 1}/{totalPages}</span>
                    </Col>
                </Row>
            </div>
            <Row><Col>
                <Table className='table table-striped' id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th>Name</th>
                            <th>Last name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Registration date</th>
                            
                        </tr>
                    </thead>
                    {/* ================================== TELO TABELE  ================= */}
                    <tbody>
                        {renderTabela()}
                    </tbody>
                </Table>
            </Col></Row>

        </div>
    )

}

export default Users