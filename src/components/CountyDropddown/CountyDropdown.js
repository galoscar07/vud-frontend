import React, { useEffect, useState } from "react";

const CountyDropdown = ({sendData}) =>{
    const [cities, setCities] = useState([{"nume":"Abrud"},{"nume":"Aiud"},{"nume":"Alba Iulia"},{"nume":"Albac"},{"nume":"Almaşu Mare","simplu":"Almasu Mare"}])

    const passCities =() =>{
        sendData(cities)
    }
    const getCities=(val)=>{
        console.log(val, 'child')
        fetch('https://cors-anywhere.herokuapp.com/https://roloca.coldfuse.io/orase/'+val, {
              method: 'GET',
              mode: 'cors',

            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }})
            .then((resp) => resp.json())
            .then((response) => {
               console.log(response)
    
            })
            .catch((err) => { })
        
        passCities();
    }
     return(
<select name="judet" id="judet"  onChange={(e) => getCities(e.target.value)}>
         <option value="AB">Alba</option>
         <option value="AG">Arges</option>
            <option value="AR">Arad</option>
            <option value="B" >Bucuresti</option>
            <option value="BC">Bacau</option>
           <option value="BH">Bihor</option>
            <option value="BN">Bistrita</option>
            <option value="BR">Braila</option>
            <option value="BT">Botosani</option>
           <option value="BV">Brasov</option>
          <option value="BZ">Buzau</option>
           <option value="CJ">Cluj</option>
            <option value="CL">Calarasi</option>
            <option value="CS">Caras-Severin</option>
           <option value="CT">Constanta</option>
        <option value="CV">Covasna</option>
        <option value="DB">Dambovita</option>
        <option value="DJ">Dolj</option>
        <option value="GJ">Gorj</option>
        <option value="GL">Galati</option>
        <option value="GR">Giurgiu</option>
            <option value="HD">Hunedoara</option>
            <option value="HG">Harghita</option>
            <option value="IF">Ilfov</option>
            <option value="IL">Ialomita</option>
            <option value="IS">Iasi</option>
            <option value="MH">Mehedinti</option>
            <option value="MM">Maramures</option>
            <option value="MS">Mures</option>
            <option value="NT">Neamt</option>
        <option value="OT">Olt</option>
            <option value="PH">Prahova</option>
        <option value="SB">Sibiu</option>
        <option value="SJ">Salaj</option>
        <option value="SM">Satu-Mare</option>
        <option value="SV">Suceava</option>
        <option value="TL">Tulcea</option>
        <option value="TM">Timis</option>
        <option value="TR">Teleorman</option>
        <option value="VL">Valcea</option>
        <option value="VN">Vrancea</option>
        <option value="VS">Vaslui</option>
    </select>
)}
export default CountyDropdown;