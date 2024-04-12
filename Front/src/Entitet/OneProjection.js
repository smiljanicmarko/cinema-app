import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button,Card,  Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
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

   const goToEditMovie = (id) =>{
        navigate("/edit-movie/" +id)
    }

    const today = new Date();
    const projectionTime = new Date(projection.time)

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
                    <th>Movie name:</th> <td> <Link to={'/movies/' +projection.movieId}>{projection.movieName}</Link> </td>
                    </tr>
                    <tr>
                    <th>Date and time: </th> <td>{ formatDate(projection.time) }</td>
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
                {
                console.log(today < projectionTime )         
                    
                
                }
                {
                    console.log(projection.time)
                }
                {console.log(new Date())}
                {                
                  
                        (isKorisnik && projection.seatsAvailable>0 && today < projectionTime )?
                        (<Row>
                            <Col>
                            <Button className="btn btn-success">Buy tickets</Button>
                            </Col>
                          </Row>) :<></>  
                   
                }

              

            </div>



        </div>
    )
}

export default OneProjection