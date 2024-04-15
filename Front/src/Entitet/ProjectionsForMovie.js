import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '../services/formatDate';


const ProjectionsForMovie = () => {

     //=================================== AUTORIZACIJA =========================================
     const token = localStorage.getItem("jwt");
     const decoded = token ? jwtDecode(token) : null;
     const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";
   

   

    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [movie, setMovie] = useState({})
    

    const urlParams = useParams()
    const movieId = urlParams.id
    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getProjections();
    }, []);
    
    
   
    // ======================== DOBAVLJANJE PODATAKA ================================
    // Kada budes ubacivao pretragu,  nakon (?pageNo=${pageNo}`)) stavis ZAREZ i onda {objekat}, da bi se sve slalo u istom zahtevu, i paginacija nastavila da radi.
    //u dependeci tu i iznad u useEffectu obavezno dodati parametar 'pretraga' , i tako imamo live search! 

    // Ako mora na dugme, onda f-ja pretragaClickHandler, useEffect ostaje samo pageNo, a u getZadaci pageNo i pretraga. 

    const getProjections = useCallback(() => {
        TestAxios.get('/projections/movie/' + movieId)
            .then(res => {
                console.log(res);
                setTabela(res.data)               
            })
            .catch(error => {
                console.log(error);
                alert('1');
            });
    }, []);
    const getMovie = useCallback(() => {
      TestAxios.get("/movies/" + movieId)
          .then(res => {
              console.log(res);
              setMovie(res.data)
          })
          .catch(error => {
              console.log(error);
              alert('Error occured please try again!');
          });
  }, []);

  useEffect(() => {
      getMovie()
  }, [])
   
     //======================== NAVIGATE ============================================
     var navigate = useNavigate()

     const goToChooseSeat = (id)=>{
      navigate('/projections/' + id + '/seat')
     }
 

   
    
    
  


    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
      if (tabela.length <= 0) {
        return (
            <tr>
                <td colSpan="5" style={{ fontWeight: 'bold', fontSize: '2.2em', textAlign: 'center'  }}>No projections available</td>
            </tr>
        );
    }
        return tabela     
        .map((klasa, index) => {
            return (
                <tr key={klasa.id}>
                    <td>{<Link to={'/movies/' + klasa.movieId}>{klasa.movieName}</Link>  }</td>
                    <td>{klasa.projectionType}</td>
                    <td>{klasa.theaterName}</td>
                    <td><Link to={'/projections/' +klasa.id}>{formatDate(klasa.time) }</Link> </td>
                    <td>{klasa.price}</td>
                    <td><Button className='btn btn-success' onClick={()=>goToChooseSeat(klasa.id)}>Choose projection</Button></td>
                   
                </tr>
            )
        })
    }


    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Choose projection for {movie.name}</h1>   
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

export default ProjectionsForMovie