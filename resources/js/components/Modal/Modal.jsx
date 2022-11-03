import React from 'react';
import Volver from '../assets/cerca.png';
import Boton from '../Button/boton';
//import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';







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
    
    const [registros, setRegistros] = useState(obtenerRegistros());
    const [check, setcheck] = useState("");
    const [piso, setpiso] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);

    //ALMACENO LOS DATOS EN UNA VARIABLE (...REGISTROS)---
    const setDatos = () => {
        if (precio == "")
        {   
            setError(true);
        }
        else
        {
            if (localStorage.getItem("datos").indexOf(id) > 1)
            {
                editar(id);
            }
            else
            {
                setRegistros([ { "id": id, "piso": piso, "precio": precio, "check": check } , ...registros]);
                setError(false);
                setcheck("");
                setPrecio("");
                
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
        document.querySelector(".containerMapaGrande").style.paddingBottom = "0px";
    }

    //ELIMINAR UN REGISTRO DEL LOCALSTORAGE
    const eliminar = (e) =>
    {
        const items = JSON.parse(localStorage.getItem("datos"));
        const indice = items.findIndex(element => element.id === e); //con el find optengo el indice del array
        items.splice(indice, 1);
        setRegistros(items);

    }

    //EDITAR UN REGISTRO DEL LOCALSTORAGE
    const editar = (e) =>
    {
        const items = JSON.parse(localStorage.getItem("datos"));
        const indice = items.findIndex(element => element.id === e); //con el find optengo el indice del array
        items[indice] = {"id": id, "piso": piso, "precio": precio, "check": check  };
        setRegistros(items); 
    }

    //GUARDO EN EL LOCALSTORAGE---
    useEffect(() =>
    {
        localStorage.setItem("datos", JSON.stringify(registros));

    }, [registros])


    return (
        <div>
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
                                style={{ color: disponibilidad == true ? "#146300" : "red" }}>
                                {disponibilidad == true ? "Disponible" : "Ocupado"}
                            </h1>
                        </div>
                        <div className='descripcionModal'>
                           
                            <div className='preciosModal' >
                                <p className='seleccione'
                                    style={{ display: errorr === true ? "block" : "none" }}>Selecccionar un precio
                                </p>
                                <div className='precioBtn'>
                                    <p className='precio1'>1 mes </p>
                                    <label for="1" className={errorr === true ? 'modalAbvertencia' : 'pSpan'}>
                                        <input type="radio"
                                            checked={check == "1" ? true : false}
                                            onClick={actualizarCheck}
                                            id="1"
                                            name='1'
                                            value='60'
                                        />

                                        {" " + precio1}€
                                    </label>
                                </div>
                                <div className='precioBtn'>
                                    <p className='precio2'>3 meses </p>
                                    <label for="2" className={errorr === true ? 'modalAbvertencia' : 'pSpan'}>
                                        <input type="radio"
                                            checked={check == "2" ? true : false}
                                            onClick={actualizarCheck}
                                            id="2"
                                            value='150'
                                        />
                                        {" " + precio2}€
                                    </label>
                                </div>
                                <button style={{ background: true ? "#ff2c5a" : "#440033" }} className='botonAgregar' onClick={setDatos}>{ true ? "Agregar" : "Actualizar"}</button>
                            </div>
                        </div>
                    </div>

                    <FormularioPago datos={registros}
                        eliminar={eliminar}
                        updateId={updateId}
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal;
