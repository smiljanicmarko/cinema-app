import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button, Card, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../services/formatDate";

const TicketDetails = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";

    const navigate = useNavigate()

    const urlParams = useParams()
    const ticketId = urlParams.id

    const [ticket, setTicket] = useState({})


    const getTicket = useCallback(() => {
        TestAxios.get("/tickets/" + ticketId)
            .then(res => {
                console.log(res);
                setTicket(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getTicket()
    }, [])
    //    const getGenresStringFromMap = (genresMap) => {
    //        if (!genresMap || typeof genresMap !== 'object') {
    //            return '';
    //        }
    //        return Object.values(genresMap).join(', ');
    //    };

    //   const goToEditMovie = (id) =>{
    //        navigate("/edit-movie/" +id)
    //    }

    //    const goToBuyTickets = (id) =>{
    //        navigate("/projections/movie/" +id)
    //    }
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Ticket details</h1>

                </div>
            </div>

            <div>
                <Row>
                    <Col>

                        <Table className="table table-striped" style={{ width: '30%' }}>
                            <tbody>
                                <tr>
                                    <th>Ticket id: </th><td>{ticket.id}</td>
                                </tr>
                                <tr>
                                    <th>Movie name: </th><td><Link to={'/movies/'+ticket.movieId}>{ticket.movie}</Link></td>
                                </tr>
                                <tr>
                                    <th>Projection type: </th> <td>{ticket.projectionType}</td>
                                </tr>
                                <tr>
                                    <th>Theater: </th> <td>{ticket.theaterName}</td>
                                </tr>
                                <tr>
                                    <th>Seat number: </th> <td>{ticket.seatNumber}</td>
                                </tr>
                                <tr>
                                    <th>Purchase time: </th><td><Link to={'/projections/' +ticket.projectionId}>{formatDate(ticket.purchaseTime)}</Link> </td>
                                </tr>
                                <tr>
                                    <th>Price: </th><td>{ticket.price},00</td>
                                </tr>
                                {isAdmin?
                                (<tr><th>User: </th><td><Link to={`/users/${ticket.userId}`}>{ticket.username}</Link></td></tr>):(<></>)}
                            </tbody>
                            {/* <tr>
                   <th>Country: </th> <td>{movie.country}</td>
                   </tr>
                   <tr>
                   <th>Year: </th> <td>{movie.year}</td>
                   </tr> */}
                        </Table>
                    </Col>

                </Row>


            </div>



        </div>
    )
}

export default TicketDetails