import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const Users = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
    //========================== OBJEKAT PRETRAGE ==================================


    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [showDeleted, setShowDeleted] = useState(false);

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
        TestAxios.get(`/korisnici?pageNo=${pageNo}`)
            .then(res => {
                console.log(res);
                setTabela(res.data)
                setTotalPages(res.headers["total-pages"])
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, [pageNo]);



    //======================== NAVIGATE ============================================
    var navigate = useNavigate()




    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const formHandler = () => {
        setShowDeleted(!showDeleted);
    };

    // const valueInputChanged = (e) => {
    //     const { name, value } = e.target;
    //     setPretraga((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    const pretragaClickHandler = () => {
        setPageNo(0);
        getZadaci();
    }


    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = (data, showDeleted = false) => {
        return data
            .filter(user => showDeleted ? user.deleted : !user.deleted)
            .map((klasa, index) => {
                return (
                    <tr key={klasa.id}>
                        <td>{klasa.ime}</td>
                        <td>{klasa.prezime}</td>
                        <td><Link to={'/users/' + klasa.id}>{klasa.korisnickoIme}</Link> </td>
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











    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Users details</h1>

            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}



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
            <h4>ACTIVE USERS</h4>
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
                        {renderTabela(tabela, false)}
                    </tbody>
                </Table>
            </Col></Row>
            <hr></hr>
            <div>
                <Form.Check type="checkbox" label="Show deleted users" onChange={formHandler} />                
                <br />
            </div>

            {showDeleted &&
                <Row>

                    <Col>
                        <h4>DELETED USERS</h4>
                        <Table className='table table-striped'>
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
                            <tbody>
                                {renderTabela(tabela, true)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>}

        </div>
    )

}

export default Users