import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { useCallback, useEffect, useState } from "react"
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown'
const EditMovie = () => {

    const urlParams = useParams()
    const trazeniId = urlParams.id

    var navigate = useNavigate()
    //========================================= promenljiva =======================================
    var obj = {
        id: '',
        name: '',
        director: '',
        actors: '',
        genres: '',
        duration: '',
        distributor: '',
        country: '',
        year: '',
        description: '',
    }
    //=========================================== STATE ============================================
    const [editObj, setEditObj] = useState(obj);
    const [rezultat, setRezultat] = useState([]) // STATE ZA SELECT OPCIJU
    //=================================== DOBAVLJANJE PODATAKA ======================================

    const getDataById = useCallback((id) => {
        TestAxios.get('/movies/' + id)
            .then(res => {
                // handle success
                console.log(res);
                setEditObj({
                    id: res.data.id,
                    name: res.data.name,
                    director: res.data.director,
                    actors: res.data.actors,
                    genres: res.data.genres,
                    duration: res.data.duration,
                    distributor: res.data.distributor,
                    country: res.data.country,
                    year: res.data.year,
                    description: res.data.description
                });
               
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getDataById(trazeniId)

    }, []);

   


    //============================== HANDLERI =============================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;

        setEditObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //=============================== FUNKCIJA ZA EDIT ==================================
    const edit = () => {
        var params = {
            ...editObj
        };

        TestAxios.put('/movies/' + trazeniId, params)
            .then(res => {
                console.log(res);
                alert('Movie has been edited!');
                navigate('/movies');
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
            <h1>Edit movie</h1>

            <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">

                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor='name'>Movie title</FormLabel>
                                    <Form.Control type='text' value={editObj.name} id='name' name='name' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='director'>Director</FormLabel>
                                    <Form.Control type='text' value={editObj.director} id='director' name='director' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='actors'>Actors</FormLabel>
                                    <Form.Control as='textarea' value={editObj.actors} id='actors' name='actors' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel htmlFor='country'>Country</FormLabel>
                                    <Form.Control type='text' value={editObj.country} id='country' name='country' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='distributor'>Distributor</FormLabel>
                                    <Form.Control type='text' value={editObj.distributor} id='distributor' name='distributor' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>
                            </Col>
                            <Col>


                                <FormGroup>
                                    <FormLabel htmlFor='duration'>Duration</FormLabel>
                                    <Form.Control type='number' value={editObj.duration} id='duration' name='duration' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='year'>Year</FormLabel>
                                    <Form.Control type='number' value={editObj.year} id='year' name='year' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>




                                <FormGroup>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Form.Control as='textarea' value={editObj.description} id='description' name='description' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='genres'>Genres</FormLabel>
                                    <Form.Control type='text' value={editObj.genres} id='genres' name='genres' onChange={valueInputChanged}></Form.Control>
                                </FormGroup>


                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-right">
                               <Button type="button" className="btn btn-success" style={{ marginTop: '20px' }} onClick={() => edit()}>Edit movie</Button> 
                            </Col>
                        </Row>

                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>

            </Row>




        </div>
    )
}

export default EditMovie