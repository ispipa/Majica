import React from 'react';
import axios from 'axios';
import Volver from '../assets/cerca.png';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import { BsFillBagCheckFill } from "react-icons/bs";
import { identity } from 'lodash';

const Modal = ({ id, disponibilidad, verModal, volver, setVerModal, setVolver, updateId, descripcion, precio1, precio2}) => {

     const usuario = 1;

    
    //ESTADOS---
    const [piso, setpiso] = useState("");
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [registros, setRegistros] = useState([]);
    const [contadorCompra, setContadorCompra] = useState(0);


     useEffect(() =>
     {
         dataBase();

     }, [])
    
    //CONSULTA A LA BASE DE DATOS
    const dataBase = async () => {
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const usuarioData = response.data;
        setRegistros(usuarioData)
        setContadorCompra(usuarioData.length)
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
                    'precio':precio,
                    'piso':"1",
                    'sala':id,
                    'usuario': usuario,
                    'pagado': 'false'
                });

                setcheck("");
                setPrecio("");
                setError(false);
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
        setVerModal(false);
        setVolver(false);
        document.querySelector(".containerMapaGrande").classList.remove("paddingBottom");
        document.querySelector(".botonesPisos").classList.remove("displayFlex");
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
                <p className='contadorCompra'>{contadorCompra}</p>
                <button onClick={mostratTablaCompra} className='btnMostrarTabla'><BsFillBagCheckFill /></button>
            </div>
            <div
                className={volver ? 'volver2 volver2V' : 'volver2'}
                onClick={() => volverBtn1()}>
                <img
                    src={Volver} />
            </div>
            <div className={verModal ? 'modal modalVisible' : 'modal'}>
                <div
                    className='volver'
                    onClick={() => volverBtn1()}>
                    <img src={Volver} />
                </div>
                <div className='containerModal'>
                    <div className='containerModalHijo'>
                        <div className='headerModal'>
                            <h1
                                className='numPiso'>{id ? "Sala " + id : null}
                            </h1>
                            <h1
                                className='disponibilidad'
                                style={{ color: disponibilidad == "true" ? "#afffad" : "red" }}>
                                {disponibilidad == "true" ? "Disponible" : "Ocupado"}
                            </h1>
                        </div>
                        <div className={disponibilidad == "true" ? "descripcionMapa none" : "descripcionMapa"} >
                            <p className='descripcionSala'>
                                {descripcion}
                            </p>
                        </div>
                        <div className={disponibilidad == "true" ? "descripcionModal" : "descripcionModal none"} >
                           
                            <div className='preciosModal' >
                                <p className='seleccione'
                                    style={{ display: errorr === true ? "block" : "none" }}>Selecccionar un precio
                                </p>
                                <p style={{ display: errorr === false ? "block" : "none" }} className='pPrecios'>
                                    Precios
                                </p>
                                <div className='precioBtn'>
                                    <label for="1" className={errorr === true ? 'modalAbvertencia' : 'pSpan'}>
                                        <input type="radio"
                                            checked={check == "1" ? true : false}
                                            onClick={actualizarCheck}
                                            id="1"
                                            name='1'
                                            value={precio1}
                                            className='checkbox'
                                        />
                                        {" " + precio1} €
                                    <p className='precio1'>1 Mes </p>
                                    </label>
                                </div>
                                <div className='precioBtn'>
                                    <label for="2" className={errorr === true ? 'modalAbvertencia' : 'pSpan'}>
                                        <input type="radio"
                                            checked={check == "2" ? true : false}
                                            onClick={actualizarCheck}
                                            id="2"
                                            value={precio2}
                                            className='checkbox'
                                        />
                                        {" " + precio2} €
                                    <p className='precio2'>3 Meses </p>
                                    </label>
                                </div>
                                <button style={{ background: true ? "#ff2c5a" : "#440033" }} className='botonAgregar' onClick={setDatos}>{ true ? "AÑADIR A LA COMPRA" : "Actualizar"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={mostrarTabla === true ? 'tablaCompra': 'tablaCompra MostrartablaCompra'}>
                <FormularioPago datos={registros}
                    eliminar={eliminar}
                    updateId={updateId}
                    ocultarTablaPagar={ocultarTablaPagar}
                />
            </div>
        </div>
    )
}

export default Modal;
