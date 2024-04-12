import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { login } from "../../services/auth"
import { Link } from "react-router-dom"


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
        <Row className="justify-content-center">
            <Col md={6}>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
                <Button onClick={() => login(username, password)}>Login</Button>
            </Col>
        </Row>
       
        <Row className="text-center">
            <span>First time here? <Link to={'/user-registration'}>Register</Link></span>
        </Row>
       
        </div>
    )
}

export default Login