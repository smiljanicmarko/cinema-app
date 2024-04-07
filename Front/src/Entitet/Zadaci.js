import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const Zadaci = () => {

     //=================================== AUTORIZACIJA =========================================
     const token = localStorage.getItem("jwt");
     const decoded = token ? jwtDecode(token) : null;
     const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    //========================== OBJEKAT PRETRAGE ==================================


    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

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
        TestAxios.get(`/zadaci?pageNo=${pageNo}`)
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
         navigate("/dodavanje");
     }
 

    // ======================== BRISANJE ===========================================
    const izbrisi = (id) => {
        TestAxios.delete('/zadaci/' + id)
            .then(res => {
                // handle success
                console.log(res);
                alert('Brisanje je uspesno izvrseno!');
                setTabela(tabela.filter(el => el.id !==id))
               // window.location.reload();

            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Doslo je do greske, molimo pokusajte ponovo!');
            });
    }

    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================





    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{klasa.ime}</td>
                    <td>{klasa.zaduzeni}</td>
                    <td>{klasa.bodovi}</td>
                    <td>{klasa.sprint}</td>
                    <td>{klasa.stanje}</td>
                    {/* === DUGMICI ===*/}
                    <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td>
                </tr>
            )
        })
    }

//========================================== RENDER FORME ZA PRETRAGU====================================================
//=======================================================================================================================










    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>ZADACI</h1>
            {/* ================================== PRETRAGA meni================= */}







            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}
            <Button className="btn btn-primary" onClick={goToAdd} >Dodaj</Button>

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
                            <th>Duration (min)</th>
                            <th>Genres</th>
                            <th></th>
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

export default Zadaci