import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TestAxios from "../apis/TestAxios";
import { jwtDecode } from "jwt-decode";
import { formatDate, formatOnlyDate } from '../services/formatDate';

const AdminReport = () => {
  //=================================== AUTORIZACIJA =========================================
  const token = localStorage.getItem("jwt");
  const decoded = token ? jwtDecode(token) : null;
  const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
  const isKorisnik = decoded?.role?.authority === "ROLE_KORISNIK";
  //========================== OBJEKAT PRETRAGE ==================================


  // ========================== STATE ============================================
  const [tabela, setTabela] = useState([]);


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //======================== USE EFFECT ============================================



  //======================== NAVIGATE ============================================
  var navigate = useNavigate();


  //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================



  { /* ================================================ RENDER TABELE ========================================= */ }
  //=============================================================================================================
  const renderTabela = () => {
    return tabela.map((klasa, index) => {
      return (
        <tr key={klasa.movieId}>
          <td>{klasa.movieName}</td>
          <td>{klasa.totalProjections}</td>
          <td>{klasa.totalTickets}</td>
          <td>{klasa.totalPrice}</td>
        </tr>
      );
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();   

    try {
      const res = await TestAxios.get("/report", {
        params: {
          start: startDate,
          end: endDate,
        },
      });

      console.log(res);
      setTabela(res.data);
      
    } catch (err) {
      console.log(err);
    }
  }



  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  return (
    <div>
      <h1>Report</h1>
      <div style={{ marginBottom: '50px' }}>
        <Row>
          <p>
            Please select dates, in order to generate Report for that period.
          </p>
        </Row>

        <form onSubmit={handleSubmit}>
          <Row>


            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor='start'>Start date</FormLabel>
                <Form.Control type='date' id='start' name='start' onChange={(e) => {
                  console.log(e.target.value); setStartDate(e.target.value);
                }}></Form.Control>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <FormLabel htmlFor='end'>End date</FormLabel>
                <Form.Control type='date' id='end' name='end' onChange={(e) => { console.log(e.target.value); setEndDate(e.target.value) }}></Form.Control>
              </FormGroup>
            </Col>


            <Col>
              <Button
                type="submit"
                className="btn btn-warning"
                style={{ marginTop: '33px' }}
              >
                Generate
              </Button>
            </Col>
          </Row>
        </form>
      </div>



      <Row>
        <Col>
          {tabela.length > 0 ? <h3>Report for the period {formatOnlyDate(startDate)} - {formatOnlyDate(endDate)}</h3> : ""}
          <Table id="movies-table">
            <thead>
              <tr>
                {/* ================================== ZAGLAVLJE TABELE ================= */}
                <th>Movie</th>
                <th>Total projections</th>
                <th>Total tickets sold</th>
                <th>Total price</th>
              </tr>
            </thead>
            {/* ================================== TELO TABELE  ================= */}
            <tbody>{tabela.length > 0 && renderTabela()}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default AdminReport;
