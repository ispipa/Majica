import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../Modal/Modal';
import logo from '../assets/logo.png';
import PisoUno_Rojo_SVG from './pisoUno_Rojo_SVG';
import PisoDos_Verde_SVG from './pisoDos_verde_SVG';
import PisoTres_Azul_SVG from './pisoTres_Azul_SVG';
import MapaPequeno_piso1_SVG from './mapaPequeno_piso1_SVG';
import MapaPequeno_piso2_SVG from './mapaPequeno_piso2_SVG';
import MapaPequeno_piso3_SVG from './mapaPequeno_piso3_SVG';
import { parsePath } from 'react-router-dom';
import { parse, stringify } from 'postcss';


export default function Map() {

    const [datos, setDatos] = useState([]);
    const [idSala, setIdsala] = useState(null);
    const [precios, setPrecios] = useState([]);
    const [volver, setVolver] = useState(false);
    const [boleano, setBoleano] = useState(false);
    const [verPiso1, setVerPiso1] = useState(false);
    const [verPiso2, setVerPiso2] = useState(false);
    const [verPiso3, setVerPiso3] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [verMapaGrande1, setVerMapaGrande1] = useState(true);
    const [verMapaGrande2, setVerMapaGrande2] = useState(false);
    const [verMapaGrande3, setVerMapaGrande3] = useState(false);
    const [disponibilidad, setIDisponibilidad] = useState(false);


    useEffect(() =>
    {
        getAllData();

    }, [idSala]);


    //CONSULTA A LA BASE DE LOS DATOS
    const getAllData  = async ()=>{
        const response = await axios.get("http://localhost:8000/api/sala")
        setDatos(response.data);

    }


    //SE OBTINEN TODOS LOS DATOS DE LA SALA SELECCIONADA
    const setId = async (e) => {
        const id = parseInt(e.target.id);
        const sala = datos.find(indice => indice.id === id)
        setIdsala(sala.nombre_sala);
        setIDisponibilidad(sala.activo);
        setPrecios({"precio1": sala.precio_sala, "precio2":sala.precio_sala})
        setVolver(true);
        setVerModal(true);
        document.querySelector(".botonesPisos").classList.add("displayFlex");
        document.querySelector(".containerMapaGrande").classList.add("paddingBottom");
        pintarSalasOcupadas(101,129);
        pintarSalasOcupadas(201,229);
        pintarSalasOcupadas(301,329);
    }


    //SE PINTAN LAS SALAS QUE ESTAN OCUPADAS
    const pintarSalasOcupadas = (min, max)=>{
        for(let i = min; max > i; i++){
            if(datos.find(indice => indice.id === i).activo === "false"){
                document.querySelector(".sala"+i).classList.add("ocupado");
            }
            else{
                document.querySelector(".sala"+i).classList.remove("ocupado");
            }
        }
    }

    //AL DAR CLICK EN UNA FILA DE LA TABLA SE ACTUALIZA EL ID DE LA SALA
    const updateId = (id) =>{
        setIdsala(id);
        setBoleano(true)
    }

    //SE OCULTAN Y SE MUESTRAN LOS MAPAS GRANDES Y PEQUEÑOS
    const mostrarPiso1 = () => {
        setVerPiso2(false);
        setVerPiso3(false);
        setVerMapaGrande1(true)
        setVerMapaGrande2(false);
        setVerMapaGrande3(false);
    }

    const mostrarPiso2 = () => {
        setVerPiso2(true);
        setVerPiso3(false);
        setVerMapaGrande1(false);
        setVerMapaGrande2(true);
        setVerMapaGrande3(false);
    }

    const mostrarPiso3 = () => {
        setVerPiso1(true);
        setVerPiso2(true);
        setVerPiso3(true);
        setVerMapaGrande1(false);
        setVerMapaGrande2(false);
        setVerMapaGrande3(true);
    }


    return (
        <section className='seccionMapas'>
            <div className='headerMovil'>
                <div className='botonesHeaderMovil'>
                    <button
                        onClick={() => mostrarPiso1()}
                        className="boton">Piso 1
                    </button>
                    <button
                        onClick={() => mostrarPiso2()}
                        className="boton">Piso 2
                    </button>
                    <button
                        onClick={() => mostrarPiso3()}
                        className="boton">Piso 3
                    </button>
                </div>
            </div>
            <Modal
                id={idSala}
                volver={volver}
                updateId={updateId}
                verModal={verModal}
                setVolver={setVolver}
                setVerModal={setVerModal}
                precio1={precios.precio1}
                precio2={precios.precio2}
                disponibilidad={disponibilidad}
            />
            <div className='container2'>
                <div className='containerMapaGrande'>
                    <div
                        className={verMapaGrande1 ? 'piso1MapaGrandeSVG' : 'piso1MapaGrandeSVG noneMapa'}>
                        <PisoUno_Rojo_SVG funcion={setId} datos={datos}/>
                    </div>
                    <div
                        className={verMapaGrande2 ? 'piso2MapaGrandeSVG' : 'piso2MapaGrandeSVG noneMapa'}>
                        <PisoDos_Verde_SVG funcion={setId} />
                    </div>
                    <div
                        className={verMapaGrande3 ? 'piso3MapaGrandeSVG' : 'piso3MapaGrandeSVG noneMapa'}>
                        <PisoTres_Azul_SVG funcion={setId} />
                    </div>
                </div>
                <aside className='containerMapaPequeno'>

                    <div className='mapasPequenos'>
                        <div className={verPiso1 ? 'piso1' : 'piso1'}>
                            <MapaPequeno_piso1_SVG />
                        </div>
                        <div className={verPiso2 ? 'piso2' : 'piso2 none'}>
                            <MapaPequeno_piso2_SVG />
                        </div>
                        <div className={verPiso3 ? 'piso3' : 'piso3 none'}>
                            <MapaPequeno_piso3_SVG />
                        </div>
                    </div>
                    <div className='botonesPisos'>
                        <button
                            onClick={() => mostrarPiso1()}
                            className={verMapaGrande1 ? 'boton activo' : 'boton'}>Piso 1
                        </button>
                        <button
                            onClick={() => mostrarPiso2()}
                            className={verMapaGrande2 ? 'boton activo' : 'boton'}>Piso 2
                        </button>
                        <button
                            onClick={() => mostrarPiso3()}
                            className={verMapaGrande3 ? 'boton activo' : 'boton'}>Piso 3
                        </button>
                    </div>
                    <img
                        src={logo}
                        alt="logo virtual museum"
                        className='logo' />
                </aside>
            </div>
        </section>
    )
}
