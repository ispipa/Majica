import React from 'react';
import { useState } from 'react';
import Volver from '../assets/cerca.png';
import Boton from '../Button/boton';


const Modal = ({id, disponibilidad, precio1, precio2, descripcion }) => {




const volver = () =>{
   document.querySelector(".modal").classList.toggle("modalVisible");
   document.querySelector(".volver2").classList.toggle("volver2V");
   document.querySelector(".containerMapaGrande").style.paddingBottom="0px";
}


  return (

   <div>
   <div className='volver2' onClick={volver}><img src={Volver}/></div>
   <div className='modal'>
         <div className='volver' onClick={volver}><img src={Volver}/></div>
         <div className='containerModal'>
            <div className='descripcionModal'>
               <h1 className='numPiso'>{id}</h1>
               <h1 className='disponibilidad'  style={{color: disponibilidad == "true" ? "#01cf35" : "red" }}>{disponibilidad == "true" ? "Disponible" : "Ocupado"}</h1>
               <p className='descripcion'>{descripcion}</p>
            </div>
            <div className='preciosModal'>
               <h2>Precios</h2>
               <p className='precio1'>1 mes <span>{precio1}€</span></p>
               <p className='precio2'>3 meses <span>{precio2}€</span></p>
               < Boton redireccion="#" texto="Comprar sala"/>
            </div>
         </div>
   </div>
   </div>

  )
}

export default Modal
