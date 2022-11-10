import React from 'react';
import Volver from '../assets/cerca.png';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import { BsFillBagCheckFill } from "react-icons/bs";

const Modal = ({ id, disponibilidad, precio1, precio2, verModal, volver, setVerModal, setVolver, updateId}) => {


    //RECUPERO DATOS DEL LOCAL STORAGE---
    const obtenerRegistros = () => {
        if (localStorage.getItem("datos")) {
            return JSON.parse(localStorage.getItem("datos"));
        } else {
            return [];
        }
    }

    //ESTADOS---
    const [piso, setpiso] = useState("");
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [registros, setRegistros] = useState(obtenerRegistros());
    const [contadorCompra, setContadorCompra] = useState(0);

    //ALMACENO LOS DATOS EN UNA VARIABLE (...REGISTROS)---
    const setDatos = () => {
        if (precio == ""){   
            setError(true);
        }
        else{

            if (localStorage.getItem("datos").indexOf(id) > 1){
                editar(id);
            }
            else{
                setRegistros([ { "id": id, "piso": piso, "precio": precio, "check": check }, ...registros]);
                setcheck("");
                setPrecio("");
                setError(false);
                setContadorCompra(JSON.parse(localStorage.getItem("datos")).length + 1);  
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
    const eliminar = (e) =>
    {
        const items = JSON.parse(localStorage.getItem("datos"));
        const indice = items.findIndex(element => element.id === e); //con el find optengo el indice del array
        items.splice(indice, 1);
        setRegistros(items);
        setContadorCompra(JSON.parse(localStorage.getItem("datos")).length - 1);

    }

    //EDITAR UN REGISTRO DEL LOCALSTORAGE
    const editar = (e) =>
    {
        const items = JSON.parse(localStorage.getItem("datos"));
        const indice = items.findIndex(element => element.id === e); //con el find optengo el indice del array
        items[indice] = {"id": id, "piso": piso, "precio": precio, "check": check  };
        setRegistros(items); 
    }


    //MOSTRAR LA TABLA DE COMPRA
    const mostratTablaCompra = ()=>{
         setMostratTabla(false);
    }
    //OCULTAR LA TABLA DE COMPRA
    const ocultarTablaPagar =  ()=>{
        setMostratTabla(true);
    }

    //GUARDO EN EL LOCALSTORAGE---
    useEffect(() =>
    {
        localStorage.setItem("datos", JSON.stringify(registros));

    }, [registros])


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
                        <div className='descripcionModal'>
                           
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
                                            value='60'
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
                                            value='150'
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
