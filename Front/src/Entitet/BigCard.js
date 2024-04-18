import React from 'react';
import {  Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage
  } from 'mdb-react-ui-kit';
const BigCard = (props) => {
    return (
        <MDBCard background='dark' className='text-white'>
        <MDBCardImage overlay src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='...' />
        <MDBCardOverlay>
          <MDBCardTitle>{props.title}</MDBCardTitle>
          <MDBCardText>
          <Row><Col>
                <Table id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th>Movie name</th>
                            <th>Projection type</th>
                            <th>Theater</th>
                            <th>Date and time</th>
                            <th>Price</th>
                           
                        </tr>
                    </thead>
                    {/* ================================== TELO TABELE  ================= */}
                    <tbody>
                        {props.render}
                    </tbody>
                </Table>
            </Col></Row>
          </MDBCardText>
          <MDBCardText></MDBCardText>
        </MDBCardOverlay>
      </MDBCard>
    );
}

export default BigCard;