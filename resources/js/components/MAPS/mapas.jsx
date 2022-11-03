import logo from '../assets/logo.png';

import Modal from '../Modal/Modal';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import PisoUno_Rojo_SVG from './pisoUno_Rojo_SVG';
import PisoDos_Verde_SVG from './pisoDos_verde_SVG';
import PisoTres_Azul_SVG from './pisoTres_Azul_SVG';
import MapaPequeno_piso1_SVG from './mapaPequeno_piso1_SVG';
import MapaPequeno_piso2_SVG from './mapaPequeno_piso2_SVG';
import MapaPequeno_piso3_SVG from './mapaPequeno_piso3_SVG';

const URI = "http://localhost:8000/sala/";

export default function Map() {
    
    const [idSala, setIdsala] = useState(null);
    const [disponibilidad, setIDisponibilidad] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [volver, setVolver] = useState(false)
    const [verPiso1, setVerPiso1] = useState(false);
    const [verPiso2, setVerPiso2] = useState(false);
    const [verPiso3, setVerPiso3] = useState(false);
    const [verMapaGrande1, setVerMapaGrande1] = useState(true);
    const [verMapaGrande2, setVerMapaGrande2] = useState(false);
    const [verMapaGrande3, setVerMapaGrande3] = useState(false);
    const [boleano, setBoleano] = useState(false);
    
    //OBTENGO EL ID DE LA SALA
    const setId = (e) => {
        const id = e.target.id;
        setVerModal(true);
        setVolver(true);
        setIdsala(id);
        setIDisponibilidad(true);
        document.querySelector(".containerMapaGrande").classList.add("paddingBottom");
        document.querySelector(".botonesPisos").classList.add("displayFlex");
    }
    
    //AL DAR CLICK EN UNA FILA DE LA TABLA SE ACTUALIZA EL ID DE LA SALA
    const updateId = (id) =>{
        setIdsala(id);
        setBoleano(true)
    }
 
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
                disponibilidad={disponibilidad}
                precio1={60}
                precio2={150}
                verModal={verModal}
                setVerModal={setVerModal}
                volver={volver}
                setVolver={setVolver}
                updateId={updateId}
            />
            <div className='container2'>
                <div className='containerMapaGrande'>
                    <div 
                        className={verMapaGrande1 ? 'piso1MapaGrandeSVG' : 'piso1MapaGrandeSVG noneMapa'}>
                        <PisoUno_Rojo_SVG funcion={setId} />
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