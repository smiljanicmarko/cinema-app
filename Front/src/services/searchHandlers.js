

export const formaHandler = () =>{
    setPrikaziFormu(!prikaziFormu);
}


export const valueInputChanged = (e) => {
  const { name, value } = e.target;
  setPretraga((prevState) => ({
       ...prevState,
       [name]: value,
   }));
};