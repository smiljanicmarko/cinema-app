import { useState } from "react";

const Validacija = () =>{

    //============================================== STATE ==================================================
   // const [errors, setErrors] = useState({});

    //============================================== POZIV FUNKCIJE ============================================
                 
    // U CREATE, izmedju naziva i paramsa
    //const create = () => {
       //>>>>>>  if (!validate()) return;

//===================================================== FUNKCIJA ================================================
// const validate = () => {
//     let tempErrors = {};
//     tempErrors.naziv = objekat.naziv ? "" : "Naziv je obavezan.";
//     tempErrors.datumPocetka = objekat.datumPocetka ? "" : "Datum početka je obavezan.";
//     tempErrors.datumZavrsetka = objekat.datumZavrsetka ? "" : "Datum završetka je obavezan.";
//     if (objekat.datumPocetka && objekat.datumZavrsetka) {
//         tempErrors.datumZavrsetka = objekat.datumPocetka <= objekat.datumZavrsetka ? "" : "Datum završetka mora biti nakon datuma početka.";
//     }
//     tempErrors.cena = objekat.cena >= 0 ? "" : "Cena ne sme biti negativna.";
//     tempErrors.brojKarata = objekat.brojKarata >= 0 ? "" : "Broj karata ne sme biti negativan.";
//     tempErrors.mestoId = objekat.mestoId ? "" : "Mesto je obavezno.";

//     setErrors(tempErrors);
//     return Object.values(tempErrors).every(x => x === "");
// };
//================================================ IMPLEMENTACIJA U FORMI ============================================
// 1. Unutar FormControl dodati atribut: 
       // isInvalid={!!errors.datumZavrsetka}

// 2. Unutar FormGroup dodati:

    //<Form.Control.Feedback type="invalid">{errors.naziv} </Form.Control.Feedback> 

//===========================================================================================================================


    return (
<div>
    <h1></h1>
</div>
    )
}

export default Validacija