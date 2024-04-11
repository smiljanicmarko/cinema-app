import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { formatDate } from '../services/formatDate';
import TestAxios from '../apis/TestAxios';

const Home = () =>{

  const [projections, setProjections] = useState([])

  
  const getProjections = useCallback(() => {
    TestAxios.get(`/projections/today`)
        .then(res => {
            console.log(res);
            setProjections(res.data)
          
        })
        .catch(error => {
            console.log(error);
            alert('1');
        });
}, []);

  useEffect(()=>{
    getProjections()
  },[])


  {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
      return projections.map((klasa, index) => {
          return (
              <tr key={klasa.id}>
                  <td>{klasa.movieName}</td>
                  <td>{klasa.projectionType}</td>
                  <td>{klasa.theaterName}</td>
                  <td>{formatDate(klasa.time) }</td>
                  <td>{klasa.price}</td>
                  {/* === DUGMICI ===*/}
                  {/* <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td> */}
              </tr>
          )
      })
  }

  return (
    <div>
    <h1 style={{align: 'center'}}>Today on Repertoire</h1>
    

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
                            <th></th>
                        </tr>
                    </thead>
                    {/* ================================== TELO TABELE  ================= */}
                    <tbody>
                        {renderTabela()}
                    </tbody>
                </Table>
            </Col></Row>

  </div>
  )
}


export default Home;