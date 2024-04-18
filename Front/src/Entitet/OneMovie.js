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

    const navigate = useNavigate()

    const urlParams = useParams()
    const movieId = urlParams.id

    const [movie, setMovie] = useState({})
    const [available, setAvailable] = useState(true)

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

    const getAvailability = useCallback(() => {
        TestAxios.get("/movies/" + movieId + '/available')
            .then(res => {                        
                setAvailable(res.data.movieAvailable)
                console.log(res.data)    
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);


    useEffect(() => {
        getMovie()
        getAvailability()
    }, [movieId])
    const getGenresStringFromMap = (genresMap) => {
        if (!genresMap || typeof genresMap !== 'object') {
            return '';
        }
        return Object.values(genresMap).join(', ');
    };

   const goToEditMovie = (id) =>{
        navigate("/edit-movie/" +id)
    }

    const goToBuyTickets = (id) =>{
        if (!isAdmin && !isKorisnik){
            alert("You have to be logged in!")
        }
        navigate("/projections/movie/" +id)
    }

    const deleteMovie = (id) =>{
        movie.projectionsNumber > 0 ?

       ( TestAxios.delete('/movies/' + id + '/logically')
        .then(res => {           
            console.log(res);
            alert('Movie was deleted successfully!');
           navigate('/movies')
 		
        })
        .catch(error => {           
            console.log(error);
            alert('Error occured please try again!');
         })) :

         ( TestAxios.delete('/movies/' + id)
        .then(res => {            
            console.log(res);
            alert('Movie was deleted successfully!');
            navigate('/movies')
        })
        .catch(error => {          
            console.log(error);
            alert('Error occured please try again!');
         }))
    }

 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">{movie.name}  {movie.deleted? '- D E L E T E D' : <></>}</h1>
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
                    <th>Genre: </th> <td>{movie.genres}</td>
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
                        <Button disabled={movie.deleted} className="btn btn-warning" style={{ marginRight: '10px' }}
                         onClick={()=>{goToEditMovie(movieId)}}>Edit movie</Button>
                        <Button disabled={movie.deleted} className="btn btn-danger" onClick={()=>deleteMovie(movie.id)}>
                            
                            Delete</Button>
                        </Col>                        
                    </Row> :
                    <Row>
                        <Col>
                         <Button disabled={!available} className="btn btn-success" onClick={()=>goToBuyTickets(movie.id)}>Buy tickets</Button>
                         </Col>
                    </Row>
                }
                {!available && isKorisnik? <p style={{ color: 'red' }} className="fw-lighter">Sorry, no tickets or projections available at the moment. </p>:<></>}
              

            </div>

                <hr style={{ width: '73%' }}></hr>


        </div>
    )
}

export default OneMovie