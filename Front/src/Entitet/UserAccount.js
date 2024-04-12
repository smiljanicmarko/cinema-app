import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button,Card,  Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
const UserAccount = () => {

      //=================================== AUTORIZACIJA =========================================
      const token = localStorage.getItem("jwt");
      const decoded = token ? jwtDecode(token) : null;
      const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
      const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
      const usernameToken = decoded?.sub

    const navigate = useNavigate()

    const urlParams = useParams()
    const movieId = urlParams.id

    const [user, setUser] = useState({})


    const getUser = useCallback(() => {
        TestAxios.get("/korisnici/" + usernameToken +'/details')
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
    // const getGenresStringFromMap = (genresMap) => {
    //     if (!genresMap || typeof genresMap !== 'object') {
    //         return '';
    //     }
    //     return Object.values(genresMap).join(', ');
    // };

   const goToEditMovie = (id) =>{
        navigate("/edit-movie/" +id)
    }

 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">{user.ime}   {user.prezime}</h1>
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
                    </tbody>
                </Table>
                </Col>
              
                </Row>
              
              

            </div>



        </div>
    )
}

export default UserAccount