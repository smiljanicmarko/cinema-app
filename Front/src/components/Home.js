import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Home = () =>{
  return (
    <div>
    <h1 style={{align: 'center'}}>HOME</h1>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <img src="slika.webp" className="img-fluid" alt="Responsive" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <img src="ftn.png" className="img-fluid" alt="Responsive" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        </Col>
      </Row>
    </Container>
  </div>
  )
}


export default Home;