import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button, Card, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../services/formatDate";

const OneProjection = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";

    const navigate = useNavigate()

    const urlParams = useParams()
    const projectionId = urlParams.id

    const [projection, setProjection] = useState({})
    const [tickets, setTickets] = useState([])
    const [showTickets, setShowTickets] = useState(false);
    const getProjection = useCallback(() => {
        TestAxios.get("/projections/" + projectionId)
            .then(res => {
                console.log(res);
                setProjection(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getProjection()
    }, [])
    const getGenresStringFromMap = (genresMap) => {
        if (!genresMap || typeof genresMap !== 'object') {
            return '';
        }
        return Object.values(genresMap).join(', ');
    };

    const goToEditMovie = (id) => {
        navigate("/edit-movie/" + id)
    }

    const today = new Date();
    const projectionTime = new Date(projection.time)


    // ======================== BRISANJE ===========================================
    const deleteProjection = (id) => {
        projection.ticketsSold == 0 ? (
            TestAxios.delete("/projections/" + projection.id)
                .then(res => {
                    alert('Projection successfully deleted!');
                    navigate("/projections")
                }
                )
                .catch(error => {
                    alert('Error in delete!');
                })

        ) : (
            TestAxios.delete("/projections/" + projection.id + "/logical")
                .then(res => {
                    alert('Projection successfully deleted!');
                    navigate("/projections")
                }
                )
                .catch(error => {
                    alert('Error in delete!');
                })
        );
    }
    //===================================================================TICKET DETAILS============================================================
    const getTickets = useCallback(() => {
        TestAxios.get("/tickets/projection/" + projectionId)
            .then(res => {
                console.log(res);
                setTickets(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getTickets()
    }, [])
    const renderTickets = () => {
        return tickets.length > 0 ? (
            tickets.map((klasa, index) => {
                return (
                    <tr key={klasa.id}>
                        <td>{klasa.id}</td>
                        <td>{formatDate(klasa.purchaseTime)}</td>
                        <td>{klasa.username}</td>
                        {/* === DUGMICI ===*/}
                        {/* <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td> */}
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3"> <h4>There are no sold tickets for this projection!</h4></td>
            </tr>
        );
    }

    const formHandler = () => {
        setShowTickets(!showTickets);
    };

    const renderTable = () => {
        return (
            <Table className="table table-striped" style={{ width: '40%' }}>
                <thead>
                    <tr>
                        <th>Ticket id</th> <th>Purchase time</th> <th>User details</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTickets()}
                </tbody>

            </Table>
        )
    }
    const goToChooseSeat = (id)=>{
        navigate('/projections/' + id + '/seat')
       }

    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Projection details</h1>
                    <p class="lead"></p>
                </div>
            </div>

            <div>
                <Row>
                    <Col>
                        <Table style={{ width: '40%' }}>
                            <tr>
                                <th>Movie name:</th> <td> <Link to={'/movies/' + projection.movieId}>{projection.movieName}</Link> </td>
                            </tr>
                            <tr>
                                <th>Date and time: </th> <td>{formatDate(projection.time)}</td>
                            </tr>
                            <tr>
                                <th>Projection type: </th> <td>{projection.projectionType}</td>
                            </tr>
                            <tr>
                                <th>Theater: </th> <td>{projection.theaterName}</td>
                            </tr>
                            <tr>
                                <th>Price: </th> <td>{projection.price}</td>
                            </tr>
                            <tr>
                                <th>Number of tickets available:</th> <td>{projection.seatsAvailable}</td>
                            </tr>

                        </Table>
                    </Col>
                   
                    
                </Row>

                {

                    (isKorisnik && projection.seatsAvailable > 0 && today < projectionTime) ?
                        (<Row>
                            <Col>
                                <Button className="btn btn-success" onClick={()=>goToChooseSeat(projection.id)}>Buy tickets</Button>
                            </Col>
                        </Row>) : (!isAdmin? <span>Can't but tickets for this projection.</span> : <></>)

                }
                {
                    (isAdmin) ?
                        <Row>
                            <Col>
                                <Button disabled={projection.deleted} className="btn btn-danger" onClick={() => deleteProjection(projection.id)}>Delete</Button>
                            </Col>
                        </Row> : <></>

                }
                <hr></hr>

            </div>

            <div>
                {isAdmin ?
                    <div>
                        <Form.Check type="checkbox" label="Show sold tickets" onChange={formHandler} />
                        {showTickets && renderTable()}
                        <br />
                    </div> : <></>}


            </div>


        </div>
    )
}

export default OneProjection