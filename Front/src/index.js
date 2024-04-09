import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Link, Navigate, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import Login from './components/auth/Login';
import { logout } from './services/auth';
import Zadaci from './Entitet/Zadaci';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dodavanje from './Entitet/Dodavanje';
import Movies from './Entitet/Movies';
import OneMovie from './Entitet/OneMovie';
import AddMovie from './Entitet/AddMovie';


const App = () => {

    if(window.localStorage["jwt"]){
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            Cinema
                        </Navbar.Brand>
                        <Nav>
                        <Nav.Link as={Link} to="/movies">
                            Movies
                        </Nav.Link>  
                                         
                        <Button  onClick={logout}>Logout</Button>
                       
                        </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Navigate replace to = "/" />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path='/movies/:id' element={<OneMovie/>} />
                        <Route path='/new-movie' element={<AddMovie/>}/>                       
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
                </Router>
            </>
        );
        }else{
            return(
           <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            Cinema
                        </Navbar.Brand>
                        <Nav>         
                        <Nav.Link as={Link} to="/movies">
                            Movies
                        </Nav.Link>                
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                        </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />   
                        <Route path="/movies" element={<Movies />} />    
                        <Route path="/movies/:id" element={<OneMovie/>} />                 
                        <Route path="*" element={<Navigate replace to = "/login" />} />
                    </Routes>
                </Container>
                </Router>
            </>
            );
        }
    
    };


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App/>,
);