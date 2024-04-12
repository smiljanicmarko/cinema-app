import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { useCallback, useEffect, useState } from "react"
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';

const ChangePassword = () => {

    const urlParams = useParams()
    const userId = urlParams.id

    var navigate = useNavigate()
//========================================= promenljiva =======================================
    var obj ={
    korisnickoIme: '',        
    staraLozinka: '',       
    lozinka: '',        
    ponovljenaLozinka: ''    
    }
//=========================================== STATE ============================================
const [editObj, setEditObj] = useState(obj);

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

    TestAxios.put('/korisnici/' +userId + '?promenaLozinke', editObj)
    .then(res => {      
        console.log(res);
        alert('Your password has been successfully changed!');
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
            <h1>Change password</h1>

            <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                      <FormGroup>
                        <FormLabel htmlFor='korisnickoIme'>Username</FormLabel>
                        <Form.Control type='text' id='korisnickoIme' name='korisnickoIme' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='staraLozinka'>Old password</FormLabel>
                        <Form.Control type='password' id='staraLozinka' name='staraLozinka' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='lozinka'>New password</FormLabel>
                        <Form.Control type='password' id='lozinka' name='lozinka' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='ponovljenaLozinka'>Repeat new password</FormLabel>
                        <Form.Control type='password' id='ponovljenaLozinka' name='ponovljenaLozinka' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                     
 

                        <Button className='btn btn-success' onClick={edit} >Submit</Button>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
                
            </Row>




        </div>
    )
}

export default ChangePassword