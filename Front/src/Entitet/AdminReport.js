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
    var dates = {
        start: new Date(),
        end: new Date()
      }
       

    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])   
    const [params, setParams] = useState(dates)

 
    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
       

    const getZadaci = useCallback(() => {
        console.log("---------: ")
       
       

        // console.log(params.start)
        // console.log(params.end)
        TestAxios.get('/report', {           

            params:{
                start: params.start,
                end: params.end
            }
        })
            .then(res => {
                console.log(res);
                setTabela(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);



    //======================== NAVIGATE ============================================
    var navigate = useNavigate()

    const goToAdd = () => {
        navigate("/new-movie");
    }




    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    
    const valueInputChanged = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setParams((prevState) => ({
             ...prevState,
             [name]: value,
         }));
     };
     const handleDateChange = (name, value) => {
        setParams(prevState => ({
            ...prevState,
            [name]: new Date(value) // Convert the value to a Date object
        }));
    };


    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <tr key={klasa.movieId}>
                    <td>{klasa.movieName}</td>
                    <td>{klasa.totalProjections}</td>
                    <td>{klasa.totalTickets}</td>
                    <td>{klasa.totalPrice}</td>
                    
                </tr>
            )
        })
    }


    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Report</h1>
            <div>
                <Row>
                    <p>Please select dates, in order to generate Report for that period.</p>
                </Row>
                <Row>
                    <Col md={2}>
                    <FormGroup>
                        <FormLabel htmlFor='start'>Start date</FormLabel>
                        <Form.Control type='date' id='start' name='start' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      </Col>
                      <Col md={2}>
                      <FormGroup>
                        <FormLabel htmlFor='end'>End date</FormLabel>
                        <Form.Control type='date' id='end' name='end' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      </Col>
                      <Col>
                      <Button type='button' className='btn btn-warning' style={{marginTop: '30px'}} onClick={getZadaci}>Generate</Button>
                      </Col>
                </Row>

               

                   
            </div>


            <Row><Col>
                <Table id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th>Movie</th>
                            <th>Total projections</th>
                            <th>Total tickets sold</th>
                            <th>Total price</th>
                            
                        </tr>
                    </thead>
                    {/* ================================== TELO TABELE  ================= */}
                    <tbody>
                        {
                        tabela.length > 0 &&
                        renderTabela()}
                    </tbody>
                </Table>
            </Col></Row>

        </div>
    )

}

export default AdminReport