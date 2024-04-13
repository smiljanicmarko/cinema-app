import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button, Card, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../services/formatDate";
import Multiselect from "multiselect-react-dropdown";


//kad se izaberu sedista, pa poniste, dugme Confirm ostaje aktivno!!!



const ChooseSeat = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
    const usernameToken = decoded?.sub

    const navigate = useNavigate()

    const urlParams = useParams()
    const projectionId = urlParams.id

    const [projection, setProjection] = useState({})
    const [seats, setSeats] = useState([])
    const [chosenSeats, setChosenSeats] = useState([])
    const [confirmed, setConfirmed] = useState(false)

    const getSeats = useCallback(() => {
        TestAxios.get("/projections/" + projectionId)
            .then(res => {
                setProjection(res.data);
                return TestAxios.get(`/theatres/${res.data.theaterId}/seats`, {
                    params: {
                        projectionId: projectionId
                    }
                });
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


    useEffect(() => {
        console.log(chosenSeats);
    }, [chosenSeats]);


    const buyTickets = () =>{
        var params = { 		  
	  	projectionId: projectionId, 	
	  	seatIds: chosenSeats.seats,  
	  	username: usernameToken
        };

        TestAxios.post('/tickets', params)
        .then(res => {
           
            console.log(res);           
            alert('Tickets bought successfully!');
            navigate('/user-details'); 
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
    }

    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            
{/* //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = KORAK 2 - IZABERI SEDISTE = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */}
        {!confirmed &&
        
        <div>
            <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Projection details</h1>
                    <p class="lead"></p>
                </div>
            </div>
                <Row>
                    <Col>
                        <Table>
                            <tr>
                                <th>Movie name:</th> <td> <Link to={'/movies/' + projection.movieId}>{projection.movieName}</Link> </td>
                            </tr>
                            <tr>
                                <th>Date and time: </th> <td><Link to={'/projections/' + projection.id}>{formatDate(projection.time)}</Link> </td>
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
            </div>
            <hr></hr>

            <div>
                <h3>Choose your seat(s)</h3>

                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <FormLabel htmlFor=''></FormLabel>
                            <Multiselect
                                options={seats.map(obj => ({ id: obj.id, name: obj.number }))}
                                displayValue="name"
                                onSelect={(selectedList) => setChosenSeats(prevState => ({ ...prevState, seats: selectedList.map(item => item.id) }))}
                                onRemove={(selectedList) => setChosenSeats(prevState => ({ ...prevState, seats: selectedList.map(item => item.id) }))}
                                placeholder="Select seat number"
                            />
                        </FormGroup>
                    </Col>

                    <Col>
                        <Button style={{ marginTop: '25px' }} className='btn btn-success' disabled={chosenSeats.length === 0} onClick={()=>setConfirmed(true)}>
                            Confirm
                        </Button>
                    </Col>

                </Row>
            </div>
            </div>
            }
{/* //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = KORAK 3 - POTVRDI KUPOVINU = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */}

            {
                confirmed &&
                 <div>
                    <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Purchase details</h1>
                    <p class="lead"></p>
                </div>
            </div>
                    <Row>
                    <Col>
                        <Table className="table table-striped">
                            <tbody>
                            <tr>
                                <th>Movie name:</th> <td> <Link to={'/movies/' + projection.movieId}>{projection.movieName}</Link> </td>
                            </tr>
                            <tr>
                                <th>Date and time: </th> <td><Link to={'/projections/' + projection.id}>{formatDate(projection.time)}</Link> </td>
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
                                <th>Seats chosen: </th> <td>{ Object.values(chosenSeats).join(', ') }</td>
                            </tr>
                            <tr>
                                <th>Total price: </th><td>{chosenSeats.seats.length * projection.price}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                        <Col>
                         <Button className="btn btn-success" onClick={buyTickets}>Buy tickets</Button>
                         </Col>
                    </Row>
                 </div>
            }




        </div>
    );
}

export default ChooseSeat