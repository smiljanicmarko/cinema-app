import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const Movies = () => {

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
        genres: '',
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
    const [sortBy, setSortBy] = useState('')
    const [orderBy, setOrderBy] = useState('')
    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getZadaci();
    }, [pageNo, pretraga, sortBy, orderBy]);


    const getZadaci = useCallback(() => {
        TestAxios.get(`/movies?pageNo=${pageNo}`, {
            params: {
                ...pretraga,
                orderBy: orderBy,
                sortBy: sortBy
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
    }, [pageNo, pretraga, orderBy, sortBy]);


    //======================== NAVIGATE ============================================
    var navigate = useNavigate()

    const goToAdd = () => {
        navigate("/new-movie");
    }


    // ======================== BRISANJE ===========================================


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
        return tabela
            .filter(movie => !movie.deleted)
            .map((klasa, index) => {
                return (
                    <tr key={klasa.id}>
                        <td>{klasa.name}</td>
                        <td>{klasa.genres}</td>
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
                                <FormLabel htmlFor="genres">Genres</FormLabel>
                                <Form.Control type='text' name="genres" id="genres" onChange={valueInputChanged}></Form.Control>
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


                    <div style={{ marginTop: '23px' }}>
                        <Row>
                            <Col md={3}>
                                <Button type="button" onClick={pretragaClickHandler}>Search</Button>
                            </Col>



                        </Row>
                    </div>
                </Form>
            </div>

        )
    }
    useEffect(() => {
        console.log('SortBy: ' + sortBy)
    }, [sortBy])

    useEffect(() => {
        console.log('orderBy: ' + orderBy)
    }, [orderBy])

    const renderSort = () => {
        return (<Row>
            <Col md={2}>
                <FormGroup>
                    <FormLabel htmlFor="sortBy">Sort by:</FormLabel>
                    <Form.Control as='select' name="sortBy" id="sortBy" onChange={sortByChangeHandler}>
                        {/* <option value=''>Sort by</option> */}
                        <option value='name'>Movie name</option>
                        <option value='genres'>Genres</option>
                        <option value='duration'>Duration</option>
                        <option value='country'>Country</option>
                        <option value='year'>Year</option>
                        <option value='distributor'>Distributor</option>
                    </Form.Control>
                </FormGroup>
            </Col>

            <Col md={2}>
                <FormGroup>
                    <FormLabel htmlFor="orderBy">Order by:</FormLabel>
                    <Form.Control as='select' name="orderBy" id="orderBy" onChange={orderByChangeHandler}>
                        {/* <option value=''>Order by</option> */}
                        <option value='ASC'>Ascending</option>
                        <option value='DESC'>Descending</option>
                    </Form.Control>
                </FormGroup>
            </Col>

        </Row>)

    }

    const sortByChangeHandler = (e) => {
        setSortBy(e.target.value);
    };

    const orderByChangeHandler = (e) => {
        setOrderBy(e.target.value);
    };

    const handleSortClick = (field) => {
        // If the clicked field is already the current sortBy, toggle the orderBy
        if (sortBy === field) {
            setOrderBy(orderBy === 'ASC' ? 'DESC' : 'ASC');
        } else {
            // Otherwise, change sortBy and set orderBy to 'ASC'
            setSortBy(field);
            setOrderBy('ASC');
        }
    };


    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Movies</h1>
            {/* ================================== PRETRAGA meni================= */}

            <div>
                <Form.Check type="checkbox" label="Show search" onChange={formaHandler} />
                {prikaziFormu && renderFormu()}
                <br />
            </div>





            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}

            {isAdmin ? <Button className="btn btn-success" onClick={goToAdd} >+ New movie</Button> : <></>}


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
                {renderSort()}
                <Table id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th onClick={() => handleSortClick('name')}>Name {sortBy === 'name' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
                            <th onClick={() => handleSortClick('genres')}>Genres {sortBy === 'genres' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
                            <th onClick={() => handleSortClick('duration')}>Duration {sortBy === 'duration' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
                            <th onClick={() => handleSortClick('country')}>Country {sortBy === 'country' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
                            <th onClick={() => handleSortClick('year')}>Year {sortBy === 'year' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
                            <th onClick={() => handleSortClick('distributor')}>Distributor {sortBy === 'distributor' ? (orderBy === 'ASC' ? '↑' : '↓') : ''}</th>
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

export default Movies