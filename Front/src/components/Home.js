import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { formatDate, formatOnlyDate } from '../services/formatDate';
import TestAxios from '../apis/TestAxios';
import { Link } from 'react-router-dom';

const Home = () =>{

  const [projections, setProjections] = useState([])

  
  const getProjections = useCallback(() => {
    TestAxios.get(`/projections/today`)
        .then(res => {
            console.log(res);

            const sortedProjections = res.data.sort((a, b) => {
              if (a.movieName !== b.movieName) {
                  return a.movieName.localeCompare(b.movieName);
              } else {
                  return new Date(a.time) - new Date(b.time);
              }
          });


            setProjections(sortedProjections)
          
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

if (projections.length>0){
  return projections.map((klasa, index) => {
    return (
        <tr key={klasa.id}>
            <td>{<Link to={'/movies/' + klasa.movieId}>{klasa.movieName}</Link>  }</td>
            <td>{klasa.projectionType}</td>
            <td>{klasa.theaterName}</td>
            <td><Link to={'/projections/' +klasa.id}>{formatDate(klasa.time) }</Link> </td>
            {/* DODATI LINK KAD BUDU GOTOVE STRANICE ZA PROJEKCIJE */}
            <td>{klasa.price}</td>
            {/* === DUGMICI ===*/}
            {/* <td><Button className='btn btn-danger' onClick={() => izbrisi(klasa.id)}>Izbrisi</Button></td> */}
        </tr>
    )
})

}else{
  return (
    <h2>No movies available today</h2>
  )
}
      

  }

  return (
    <div>
      <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Welcome to our Cinema!</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div>

    <h1 style={{align: 'center'}}>Today ({formatOnlyDate(new Date())}) on Repertoire</h1>
    

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