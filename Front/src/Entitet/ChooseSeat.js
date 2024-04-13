import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button, Card, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../services/formatDate";

const ChooseSeat = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";

    const navigate = useNavigate()

    const urlParams = useParams()
    const projectionId = urlParams.id

    const [projection, setProjection] = useState({})
    const [seats, setSeats] = useState([])
    
   

    const getSeats = useCallback(() => {
        TestAxios.get("/projections/" + projectionId)
            .then(res => {
                setProjection(res.data);
                return TestAxios.get(`/theatres/${res.data.theaterId}/seats`);
            })
            .then(res => {
                console.log(res);
                setSeats(res.data);
            })
            .catch(error => {
                console.log(error);
                alert('Error occurred, please try again!');
            });
    }, [projectionId]); // Ensure projectionId is included in the dependency array
    
    useEffect(() => {
        getSeats();
    }, []); 

   

   


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
                        <Table>
                            <tr>
                                <th>Movie name:</th> <td> <Link to={'/movies/' + projection.movieId}>{projection.movieName}</Link> </td>
                            </tr>
                            <tr>
                                <th>Date and time: </th> <td><Link to={'/projections/'+projection.id}>{formatDate(projection.time)}</Link> </td>
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
                    <Col></Col>
                    <Col></Col>
                </Row>     
              <hr></hr>
              <h3>Choose seat</h3>

            </div>

           


        </div>
    )
}

export default ChooseSeat