import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { Button,Card,  Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../services/formatDate";
const UserAccount = () => {

      //=================================== AUTORIZACIJA =========================================
      const token = localStorage.getItem("jwt");
      const decoded = token ? jwtDecode(token) : null;
      const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
      const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
      const usernameToken = decoded?.sub

    const navigate = useNavigate()

    const urlParams = useParams()
   

    const [user, setUser] = useState({})
    const [tickets, setTickets] = useState([])
    const [showTickets, setShowTickets] = useState(false);

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
        getUser();      
    }, [])

    

   const goToChangePassword = (id) =>{
        navigate("/users/" +id +'/change-password')
    }


    //===================================================================TICKET DETAILS============================================================
const getTickets = useCallback(() => {
    if (user.id) {
        TestAxios.get("/tickets/user/" + user.id)
            .then(res => {
                console.log(res);
                setTickets(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occurred, please try again!');
            });
    }
}, [user.id, tickets]);

useEffect(() => {
    if (user.id) {
        getTickets();
    }
}, [user.id]);

const renderTickets = () => {
    return tickets.length > 0 ? (
        tickets.map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{klasa.id}</td>
                    <td><Link to={'/tickets/'+klasa.id}>{formatDate(klasa.purchaseTime)}</Link></td>                    
                    {/* === DUGMICI ===*/}
                    {/* <td><Button className='btn btn-warning' onClick={() => navigate('/tickets/'+klasa.id)}>Details</Button></td> */}
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="3">Your tickets list is empty!</td>
        </tr>
    );
}
   
const formHandler = () => {
    setShowTickets(!showTickets);
};

const renderTable = () =>{
return (
    <Table className="table table-striped" style={{ width: '30%' }}>
            <thead>
            <tr>
            <th>Ticket id</th> <th>Purchase time</th>
            </tr>
            </thead>
            <tbody>
            {renderTickets()}
            </tbody>

          </Table>
)
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
                        <th>Actions:</th> <td> <Button className='btn btn-warning' onClick={()=> goToChangePassword(user.id)}>Change password</Button></td>
                    </tr>
                    </tbody>
                </Table>
                </Col>
              
                </Row>
              {!isAdmin?
               <div>            
               <Form.Check type="checkbox"  label="Show my tickets" onChange={formHandler} />
               {showTickets && renderTable()}
               <br/>
           </div>: <></>}
               
              

            </div>



        </div>
    )
}

export default UserAccount