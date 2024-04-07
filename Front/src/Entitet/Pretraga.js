import { useState } from "react"
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';

const Pretraga = () => {
    // OBJEKAT I STATE ZA vrh komponente
  var pretragaObjekat = {
    naziv: '',
    id: null
  }
    const [prikaziFormu, setPrikaziFormu] = useState(false);
    const [pretraga, setPretraga] = useState(pretragaObjekat)


   //===================== HANDLERI I FUNKCIJE ======================= 
    const formaHandler = () => {
        setPrikaziFormu(!prikaziFormu);
    };

    const valueInputChanged = (e) => {
      const { name, value } = e.target;
      setPretraga((prevState) => ({
           ...prevState,
           [name]: value,
       }));
   };

 //=================================AKO NE MOZE LIVE, PRETRAGA NA DUGME SEARCH =============================
//  const pretragaClickHandler = () =>{
//   setPageNo(0); 
//   getZadaci();
// }
   //========================================== RENDER FORME ====================================================
   //=============================================================================================================
    const renderFormu = () => {
        return (
            <div>
            <Form>
              <Row className="align-items-end"> 
                <Col md={2}>
                  <FormGroup>
                    <FormLabel htmlFor="">Tekstualni input</FormLabel>
                    <Form.Control type='text' name="" id=""></Form.Control>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel htmlFor="">Broj</FormLabel>
                    <Form.Control type='number' name="" id=""></Form.Control>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel htmlFor="">Datum</FormLabel>
                    <Form.Control type='date' name="" id=""></Form.Control>
                  </FormGroup>
                </Col>

 {/*============== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! =========== */} 
                <Col md={3}>
                  <FormGroup>
                    <FormLabel htmlFor="">SELECT</FormLabel>
                    <Form.Control as='select' name="" id="" /*onChange={}*/>
                      <option value=''>Izaberi opciju</option>
    {/*<= KOMENTAR     {
                            nazivListe.map((obj, index) =>{
                                return (
                                    <option key={obj.id} value={obj.id}> {obj.ime} </option>
                                )
                            })
                        }                        KOMENTAR =>*/}
                    </Form.Control>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Button type="button">Pretrazi</Button>
                </Col>
 {/*============== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! =========== */} 
                                                                  
              </Row>
            </Form>
          </div>
          
        )
    }


//============================================ PONISTI PRETRAGU =====================================================
//mora se dodati i atribut value u inpute - value={pretraga.naziv || ''} 
   const resetPretraga = () =>{
    setPretraga({
        naziv: '',
        apotekaId: ''
    });
}

//dugme u render forme za pretragu, odmah ispod <row>
<Col><Button className='btn btn-danger' style={{ float: 'right' }} onClick={resetPretraga}>Ponisti pretragu</Button></Col>


//=============================================================================================================
//=============================================================================================================
    return (
       /*  OVAJ DIV IZNAD TABELE  */
        <div>            
            <Form.Check type="checkbox"  label="Prikazi meni za pretragu" onChange={formaHandler} />
            {prikaziFormu && renderFormu()}
            <br/>
        </div>
    )
}

export default Pretraga