import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button,Card,  Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
const OneMovie = () => {

      //=================================== AUTORIZACIJA =========================================
      const token = localStorage.getItem("jwt");
      const decoded = token ? jwtDecode(token) : null;
      const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
      const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";

    const urlParams = useParams()
    const movieId = urlParams.id

    const [movie, setMovie] = useState({})


    const getMovie = useCallback(() => {
        TestAxios.get("/movies/" + movieId)
            .then(res => {
                console.log(res);
                setMovie(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getMovie()
    }, [])
    const getGenresStringFromMap = (genresMap) => {
        if (!genresMap || typeof genresMap !== 'object') {
            return '';
        }
        return Object.values(genresMap).join(', ');
    };

 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">{movie.name}</h1>
                    <p class="lead">Duration: {movie.duration} min. | Genre: {getGenresStringFromMap(movie.genres)}</p>
                </div>
            </div>

            <div>
                <Row>
                <Col>
                <Table>
                    <tr>
                    <th>Director: </th> <td>{movie.director}</td>
                    </tr>
                    <tr>
                    <th>Actors: </th> <td>{movie.actors}</td>
                    </tr>
                    <tr>
                    <th>Genre: </th> <td>{getGenresStringFromMap(movie.genres)}</td>
                    </tr>
                    <tr>
                    <th>Duration: </th> <td>{movie.duration}</td>
                    </tr>
                    <tr>
                    <th>Distributor: </th> <td>{movie.distributor}</td>
                    </tr>
                    <tr>
                    <th>Country: </th> <td>{movie.country}</td>
                    </tr>
                    <tr>
                    <th>Year: </th> <td>{movie.year}</td>
                    </tr>
                </Table>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{movie.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Storyline</Card.Subtitle>
                            <Card.Text>
                               {movie.description}
                            </Card.Text>
                          {/*  <Card.Link href="#">Card link</Card.Link>  Change 'href' to 'to' if using React Router 
                            <Card.Link href="#">Another link</Card.Link> {/* Change 'href' to 'to' if using React Router */}
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                {
                    isAdmin? 
                    <Row>
                        <Col>
                        <Button className="btn btn-warning" style={{ marginRight: '10px' }}>Edit movie</Button>
                        <Button className="btn btn-danger" >Delete</Button>
                        </Col>                        
                    </Row> :
                    <Row>
                        <Col>
                         <Button className="btn btn-success" >Buy tickets</Button>
                         </Col>
                    </Row>
                }
              

            </div>



        </div>
    )
}

export default OneMovie