import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button,Card,  Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { logout } from "../services/auth";
const UserDetailsAdmin = () => {

      //=================================== AUTORIZACIJA =========================================
      const token = localStorage.getItem("jwt");
      const decoded = token ? jwtDecode(token) : null;
      const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
      const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
      const usernameToken = decoded?.sub

    const navigate = useNavigate()

    const urlParams = useParams()
    const userId = urlParams.id

    const [user, setUser] = useState({})


    const getUser = useCallback(() => {
        TestAxios.get("/korisnici/" + userId )
            .then(res => {
                console.log(res);
                setUser(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getUser()
    }, [])
    
   const goToEditMovie = (id) =>{
        navigate("/edit-movie/" +id)
    }


    const changeRole = () =>{       
// U slucaju da se admin sam promeni na korisnika, bice automatski izlogovan
        TestAxios.put('/korisnici/' + userId + '/change-role')
        .then(res => {           
            console.log(res);
            alert('User role was changed successfully!');
            res.data.uloga === 'KORISNIK'?
            logout() : navigate('/users');
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

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">{user.ime} {user.prezime}</h1>
                    <p class="lead"> </p>
                </div>
            </div>

            <div>
                <Row>
                <Col>
                <Table className="table table-dark" style={{ width: '40%' }}>
                   <tbody>
                    <tr>
                    <th>Name: </th> <td>{user.ime}</td>
                    </tr>
                    <tr>
                    <th>Last name: </th> <td>{user.prezime}</td>
                    </tr>
                    <tr>
                    <th>Username: </th> <td>{user.korisnickoIme}</td>
                    </tr>
                    <tr>
                    <th>Email: </th> <td>{user.eMail}</td>
                    </tr>
                    <tr>
                    <th>Role: </th> <td>{user.uloga}</td>
                    </tr>
                    <tr>
                    <th>Actions:</th>
                    <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <Button className='btn btn-warning' onClick={changeRole}>
                                                {user.uloga === "ADMIN"?'Change role to Korisnik':'Change role to Admin' }
                                                </Button>
                                        </div>
                                        <div >
                                            <Button className='btn btn-danger'>Delete</Button>
                                        </div>
                                    </div>

                    </td>
                    </tr>
                    
                    </tbody>
                </Table>
                </Col>
              
                </Row>
              
              

            </div>



        </div>
    )
}

export default UserDetailsAdmin