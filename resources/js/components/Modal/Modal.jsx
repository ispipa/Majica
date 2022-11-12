import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import Volver from '../assets/cerca.png';
import { BsFillBagCheckFill } from "react-icons/bs";

const Modal = ({ id, piso, disponibilidad, verModal, volver, setVerModal, 
                 setVolver, updateId, descripcion, precio1, precio2 }) => {

    const usuario = 1;
    
    //ESTADOS---
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [registros, setRegistros] = useState([]);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [contadorCompra, setContadorCompra] = useState(0);


     useEffect(() =>
     {
         dataBase();

     }, [])
    
    //CONSULTA A LA BASE DE DATOS
    const dataBase = async () => {
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const usuarioData = response.data;
        setContadorCompra(usuarioData.length)
        setRegistros(usuarioData)
    }

    //ALMACENO LOS DATOS EN UNA VARIABLE (...REGISTROS)---
    const setDatos = async () => {
        
        //si no han seleccionado un precio activo una alerta
        if (precio == ""){   
            setError(true);
        }
        else{

            const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
            const sala = response.data;
            //si ya existe en la base de datos, lo edito.
            if (sala.findIndex(element => element.sala_pagos == id) >= 0 ){
                editar();
            }
            //si no exite en la base de datos, lo agrego.
            else{
                axios.post('http://localhost:8000/api/pago', {
                    'usuario': usuario,
                    'pagado': 'false',
                    'precio':precio,
                    'piso':piso,
                    'sala':id
                });

                setError(false);
                setPrecio("");
                setcheck("");
                dataBase();
            }
        }
    }

    //CAMBIO EL COLOR DEL CHECK Y OBTENGO SU VALUE
    const actualizarCheck = (e) =>
    {
        setcheck(e.target.id)
        setPrecio(e.target.value)
    }

    //BOTON DE VOLVER
    const volverBtn1 = () =>
    {
        setVolver(false);
        setVerModal(false);
        document.querySelector(".botonesPisos").classList.remove("displayFlex");
        document.querySelector(".containerMapaGrande").classList.remove("paddingBottom");
    }

    //ELIMINAR UN REGISTRO DEL LOCALSTORAGE
    const eliminar = async (e) =>
    {
        await axios.delete("http://localhost:8000/api/pago/"+e);
        dataBase();
    }

    //EDITAR UN REGISTRO DEL LOCALSTORAGE
    const editar = async (e) =>
    {
        await axios.put("http://localhost:8000/api/pago/"+e , {
            'precio': precio
        });
        dataBase();
    }


    //MOSTRAR LA TABLA DE COMPRA
    const mostratTablaCompra = ()=>{
         setMostratTabla(false);
    }
    //OCULTAR LA TABLA DE COMPRA
    const ocultarTablaPagar =  ()=>{
        setMostratTabla(true);
    }

   


    return (
        <div>
            <div className='divContadorCompra'>
                <p className='contadorCompra'>
                    {contadorCompra}
                </p>
                <button 
                    onClick={mostratTablaCompra} 
                    className='btnMostrarTabla'>
                    <BsFillBagCheckFill />
                </button>
            </div>
            <div
                className={ volver ? 'volver2 volver2V' : 'volver2'} 
                onClick={() => volverBtn1()}>
                <img src={Volver}/>
            </div>
            <div className={ verModal ? 'modal modalVisible' : 'modal'}>
                <div
                    className='volver'
                    onClick={() => volverBtn1()}>
                    <img src={Volver} />
                </div>
                <div className='containerModal'>
                    <div className='containerModalHijo'>
                        <div className='headerModal'>
                            <h1
                                className='numPiso'>
                                {id ? "Sala " + id : null}
                            </h1>
                            <h1
                                className='disponibilidad'
                                style={{ color: disponibilidad == "true" ? "#afffad" : "red" }}>
                                {disponibilidad == "true" ? "Disponible" : "Ocupado"}
                            </h1>
                        </div>
                        <div className={ 
                             disponibilidad == "true" ? "descripcionMapa none" : "descripcionMapa" } >
                            <p 
                                className='descripcionSala'>
                                {descripcion}
                            </p>
                        </div>
                        <div className={ 
                             disponibilidad == "true" ? "descripcionModal" : "descripcionModal none" } >
                            <div className='preciosModal' >
                                <p  
                                    className='seleccione'
                                    style={{ display: errorr === true ? "block" : "none" }}>
                                    Selecccionar un precio
                                </p>
                                <p  
                                    style={{ display: errorr === false ? "block" : "none" }} 
                                    className='pPrecios'>
                                    Precios
                                </p>
                                <div className='precioBtn'>
                                    <label 
                                        className={errorr === true ? 'modalAbvertencia' : 'pSpan'}
                                        for="1" >
                                            <input 
                                                id="1"
                                                name='1'
                                                type="radio"
                                                value={precio1}
                                                className='checkbox'
                                                onClick={actualizarCheck}
                                                checked={check == "1" ? true : false}
                                            />
                                        <p> {" " + precio1} € </p>
                                        <p className='precio1'> 1 Mes </p>
                                    </label>
                                </div>
                                <div className='precioBtn'>
                                    <label 
                                        className={errorr === true ? 'modalAbvertencia' : 'pSpan'}
                                        for="2" >
                                            <input 
                                                id="2"
                                                type="radio"
                                                value={precio2}
                                                className='checkbox'
                                                onClick={actualizarCheck}
                                                checked={check == "2" ? true : false}
                                            />
                                        <p> {" " + precio2} €</p>
                                        <p className='precio2'> 3 Meses</p>
                                    </label>
                                </div>
                                <button 
                                    style={{ background: true ? "#ff2c5a" : "#440033" }} 
                                    className='botonAgregar' 
                                    onClick={setDatos}>
                                    { true ? "AÑADIR A LA COMPRA" : "Actualizar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={mostrarTabla === true ? 'tablaCompra': 'tablaCompra MostrartablaCompra'}>
                <FormularioPago 
                    datos={registros}
                    eliminar={eliminar}
                    updateId={updateId}
                    ocultarTablaPagar={ocultarTablaPagar}
                />
            </div>
        </div>
    )
}

export default Modal;
