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
import EditMovie from './Entitet/EditMovie';
import Projections from './Entitet/Projections';
import AddProjection from './Entitet/AddProjection';
import OneProjection from './Entitet/OneProjection';
import UserRegistration from './Entitet/UserRegistration';
import UserAccount from './Entitet/UserAccount';
import { jwtDecode } from 'jwt-decode';
import Users from './Entitet/Users';
import UserDetailsAdmin from './Entitet/UserDetailsAdmin';
import ChangePassword from './Entitet/ChangePassword';
import ProjectionsForMovie from './Entitet/ProjectionsForMovie';
import ChooseSeat from './Entitet/ChooseSeat';
import TicketDetails from './Entitet/TicketDetails';
import AdminReport from './Entitet/AdminReport';




const App = () => {
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
    const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
    const usernameToken = decoded?.sub
    if (window.localStorage["jwt"]) {
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            Cinema
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/user-details">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                                {usernameToken}'sAccount
                            </Nav.Link>
                            <Nav.Link as={Link} to="/movies">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16">
                                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
                                </svg>

                                Movies
                            </Nav.Link>
                            <Nav.Link as={Link} to="/projections">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                </svg>

                                All-Projections
                            </Nav.Link>

                            {isAdmin ?
                                <Nav.Link as={Link} to="/users">
                                    Users
                                </Nav.Link> : <></>
                            }
                             {isAdmin ?
                                <Nav.Link as={Link} to="/report">
                                    Report
                                </Nav.Link> : <></>
                            }

                            <Button onClick={logout}>Logout</Button>

                        </Nav>
                    </Navbar>
                    <Container style={{ paddingTop: "10px" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Navigate replace to="/" />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path='/movies/:id' element={<OneMovie />} />
                            <Route path='/new-movie' element={<AddMovie />} />
                            <Route path="/edit-movie/:id" element={<EditMovie />} />
                            <Route path='/projections' element={<Projections />} />
                            <Route path='/projections/:id' element={<OneProjection />} />
                            <Route path='/projections/movie/:id' element={<ProjectionsForMovie />} />
                            <Route path='/projections/:id/seat' element={<ChooseSeat />} />
                            <Route path='/new-projection' element={<AddProjection />} />
                            <Route path='/user-details' element={<UserAccount />} />
                            <Route path='/users/:id' element={<UserDetailsAdmin />} />
                            <Route path='/users/:id/change-password' element={<ChangePassword />} />
                            <Route path='/tickets/:id' element={<TicketDetails />} />
                            <Route path='/report' element={<AdminReport/>}/>
                            {isAdmin ? <Route path='/users' element={<Users />} /> : <></>}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </Router>
            </>
        );
    } else {
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            Cinema
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/movies">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16">
                                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
                                </svg>

                                Movies
                            </Nav.Link>
                            <Nav.Link as={Link} to="/projections">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                </svg>

                                All-Projections
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">  
                             Register/Login
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                    <Container style={{ paddingTop: "10px" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/movies/:id" element={<OneMovie />} />
                            <Route path='/projections' element={<Projections />} />
                            <Route path='/projections/:id' element={<OneProjection />} />
                            <Route path='/user-registration' element={<UserRegistration />} />
                            <Route path="*" element={<Navigate replace to="/login" />} />
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
    <App />,
);