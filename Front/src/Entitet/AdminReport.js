import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const AdminReport = () => {

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
        TestAxios.get(`/movies?pageNo=${pageNo}`)
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

    const goToAdd = () => {
        navigate("/new-movie");
    }


    

    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const getGenresStringFromMap = (genresMap) => {
        if (!genresMap || typeof genresMap !== 'object') {
            return '';
        }
        return Object.values(genresMap).join(', ');
    };

  

   
    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{klasa.name}</td>
                    <td>{getGenresStringFromMap(klasa.genres)}</td>
                    <td>{klasa.duration}</td>
                    <td>{klasa.country}</td>
                    <td>{klasa.year}</td>
                    <td>{klasa.distributor}</td>
                    {/* === DUGMICI ===*/}                   
                    <td> <Button onClick={() => navigate("/movies/" + klasa.id)}>Details</Button> </td>
                </tr>
            )
        })
    }


    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Movies</h1>
            {/* ================================== PRETRAGA meni================= */}
                          

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
                <Table id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th>Name</th>
                            <th>Genres</th>
                            <th>Duration</th>
                            <th>Country</th>
                            <th>Year</th>
                            <th>Distributor</th>
                            <th></th>
                            <th></th>
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

export default AdminReport