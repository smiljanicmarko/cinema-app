import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '../services/formatDate';


const Projections = () => {

     //=================================== AUTORIZACIJA =========================================
     const token = localStorage.getItem("jwt");
     const decoded = token ? jwtDecode(token) : null;
     const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    //========================== OBJEKAT PRETRAGE ==================================
    var pretragaObjekat = {
        movie: '',
        projectionTypeId: '',
        theaterId: '',
        timeFrom: '',
        timeTo: '',
        priceFrom: '',
        priceTo: ''
      }

    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [prikaziFormu, setPrikaziFormu] = useState(false);
    const [pretraga, setPretraga] = useState(pretragaObjekat)
    const [theatres, setTheatres] = useState ([])
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
        TestAxios.get(`/projections?pageNo=${pageNo}`)
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

    const getTheatres = useCallback(() => {
        TestAxios.get('/theatres')
            .then(res => {
                console.log(res);
                
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);
     //======================== NAVIGATE ============================================
     var navigate = useNavigate()

     const goToAdd = () => {
         navigate("/dodavanje");
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




    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{klasa.movieName}</td>
                    <td>{klasa.projectionType}</td>
                    <td>{klasa.theaterName}</td>
                    <td>{formatDate(klasa.time) }</td>
                    <td>{klasa.price}</td>
                    {/* === DUGMICI ===*/}
                    {/* <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td> */}
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
                <FormLabel htmlFor="movie">Movie name</FormLabel>
                <Form.Control type='text' name="movie" id="movie"></Form.Control>
              </FormGroup>
            </Col>

          <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor="timeFrom">Time from</FormLabel>
                <Form.Control type='datetime-local' name="timeFrom" id="timeFrom"></Form.Control>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor="timeTo">Time to</FormLabel>
                <Form.Control type='datetime-local' name="timeTo" id="timeTo"></Form.Control>
              </FormGroup>
            </Col>
           
            <Col md={3}>
              <FormGroup>
                <FormLabel htmlFor="theater">Theater</FormLabel>
                <Form.Control as='select' name="theater" id="theater" /*onChange={}*/>
                  <option value=''>Izaberi opciju</option>
{/*<= KOMENTAR     {
                        nazivListe.map((obj, index) =>{
                            return (
                                <option key={obj.id} value={obj.id}> {obj.ime} </option>
                            )
                        })
                    }                        KOMENTAR =>*/}
                </Form.Control>
              </FormGroup>
            </Col>
            </Row>
            <Row>

            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor="projectionType">Projection type</FormLabel>
                <Form.Control as='select' name="projectionType" id="projectionType" /*onChange={}*/>
                  <option value=''>Choose option</option>
                  <option value='1'>2D</option> 
                  <option value='2'>3D</option>  
                  <option value='3'>4D</option>         
                </Form.Control>
              </FormGroup>
            </Col>
           



            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor="priceFrom">Price from</FormLabel>
                <Form.Control type='number' name="priceFrom" id="priceFrom"></Form.Control>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor="priceTo">Price to</FormLabel>
                <Form.Control type='number' name="priceTo" id="priceTo"></Form.Control>
              </FormGroup>
            </Col>                                                             
          </Row>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Row>
            <Col md={3}>
              <Button type="button">Pretrazi</Button>
            </Col>
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
            <h1>All projections</h1>
            {/* ================================== PRETRAGA meni================= */}
            <div>            
            <Form.Check type="checkbox"  label="Show search" onChange={formaHandler} />
            {prikaziFormu && renderFormu()}
            <br/>
        </div>






            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}
            {isAdmin? <Button className="btn btn-success" onClick={goToAdd} >New projection</Button> : <></> }
            

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
                            <th>Movie name</th>
                            <th>Projection type</th>
                            <th>Theater</th>
                            <th>Date and time</th>
                            <th>Price</th>
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

export default Projections