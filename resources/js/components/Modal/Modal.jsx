import React from 'react';
import Volver from '../assets/cerca.png';
import Boton from '../Button/boton';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './formulario';



const Modal = ({ id, disponibilidad, precio1, precio2, descripcion, verModal, volver, setVerModal, setVolver }) => {

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
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [check, setcheck] = useState("");
    const [mes, setMes] = useState("");



    const setDatos = () => {
        if (mes == "") {
            alert("debe seleccionar un precio");

        } else {
            setRegistros([...registros, { "id": id, "mes": mes }]);
            setcheck("");
            setMes("");
            reset();
        }
    }

    //CAMBIO EL COLOR DEL CHECK
    const actualizarCheck = (e) => {
        setcheck(e.target.id)
        setMes(e.target.value)
    }

    //BORON DE VOLVER
    const volverBtn1 = () => {
        setVerModal(false);
        setVolver(false);
        document.querySelector(".containerMapaGrande").style.paddingBottom = "0px";
    }


     //ELIMINAR UN REGISTRO DEL LOCALSTORAGE
    const eliminar = (e)=>{
        const items = JSON.parse(localStorage.getItem("datos"));
        const indice = items.findIndex(element => element.id === e); //con el find optengo el indice del array
        items.splice(indice,1);
        setRegistros(items);
        
    }


    //GUARDO EN EL LOCALSTORAGE---
    useEffect(() => {
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
                            <div className='descripcionDiv'>
                                <h2>Descripcion</h2>
                                <p className='descripcion'>{descripcion}</p>
                            </div>
                            <div className='preciosModal' >
                                <p className='seleccione'>Selecccionar precio</p>
                                <div className='precioBtn'>
                                    <p className='precio1'>1 mes </p>
                                    <label for="1" className='pSpan'>
                                            <input type="radio"
                                                checked={check == "1" ? true : false}
                                                onClick={actualizarCheck} 
                                                id="1" 
                                                value='60' {...register('opcion1')} 
                                            />
                                        {" "+precio1}€
                                    </label>
                                </div>
                                <div className='precioBtn'>
                                    <p className='precio2'>3 meses </p>
                                    <label for="2" className='pSpan'>
                                            <input type="radio" 
                                                checked={check == "2" ? true : false} 
                                                onClick={actualizarCheck} 
                                                id="2" 
                                                value='150' {...register('opcion2')} 
                                            />
                                        {" "+precio2}€
                                    </label>
                                </div>
                                <button className='botonAgregar' onClick={setDatos}>Agregar a la compra</button>
                            </div>
                        </div>
                    </div>
                    <FormularioPago datos={registros} eliminar={eliminar}/>
                </div>
            </div>
        </div>
    )
}

export default Modal
