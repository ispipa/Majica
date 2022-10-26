import logo from '../assets/logo.png';
import Volver from '../assets/cerca.png';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import PisoUno_Rojo_SVG from './pisoUno_Rojo_SVG';
import PisoDos_Verde_SVG from './pisoDos_verde_SVG';
import PisoTres_Azul_SVG from './pisoTres_Azul_SVG';
import MapaPequeno_piso1_SVG from './mapaPequeno_piso1_SVG';
import MapaPequeno_piso2_SVG from './mapaPequeno_piso2_SVG';
import MapaPequeno_piso3_SVG from './mapaPequeno_piso3_SVG';

export default function Map() {

    const [idSala, setIdsala] = useState(null);
    const [disponibilidad, setIDisponibilidad] = useState("");


    const setId = (e) => {
        document.querySelector(".modal").classList.add("modalVisible");
        document.querySelector(".volver2").classList.add("volver2V");
        document.querySelector(".containerMapaGrande").style.paddingBottom="250px";
        setIdsala(e.target.id)
        setIDisponibilidad("true")

    }

    const VerPiso1 = () => {
        document.querySelector(".piso3").classList.add("none");
        document.querySelector(".piso2").classList.add("none");
        document.querySelector(".piso1MapaGrandeSVG").classList.remove("noneMapa");
        document.querySelector(".piso2MapaGrandeSVG").classList.add("noneMapa");
        document.querySelector(".piso3MapaGrandeSVG").classList.add("noneMapa");
    }

    const VerPiso2 = () => {
        document.querySelector(".piso2").classList.remove("none");
        document.querySelector(".piso3").classList.add("none");
        document.querySelector(".piso1MapaGrandeSVG").classList.add("noneMapa");
        document.querySelector(".piso2MapaGrandeSVG").classList.remove("noneMapa");
        document.querySelector(".piso3MapaGrandeSVG").classList.add("noneMapa");

    }

    const VerPiso3 = () => {
        document.querySelector(".piso3").classList.remove("none");
        document.querySelector(".piso2").classList.remove("none");
        document.querySelector(".piso1MapaGrandeSVG").classList.add("noneMapa");
        document.querySelector(".piso2MapaGrandeSVG").classList.add("noneMapa");
        document.querySelector(".piso3MapaGrandeSVG").classList.remove("noneMapa");
    }

    // const volver = ()=>{
    //     document.querySelector(".volver2").classList.toggle("volver2V");
    //     document.querySelector(".modal").classList.toggle("modalVisible");
    // }


    return (
        <section className='seccionMapas'>

            <div className='headerMovil'>
                <div className='botonesHeaderMovil'>
                    <button onClick={VerPiso1} className="boton">Piso 1</button>
                    <button onClick={VerPiso2} className="boton">Piso 2</button>
                    <button onClick={VerPiso3} className="boton">Piso 3</button>
                </div>

            </div>



             <Modal
                id={idSala}
                disponibilidad={disponibilidad}
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing
                             elit, sed do eiusmod tempor incididunt ut labore et dolore
                             magna aliqua. Ut enim ad minim veniam, quis nostrud
                             exercitation ullamco laboris nisi ut aliquip ex ea commodo
                             consequat. Duis aute irure dolor in reprehenderit in voluptate
                             velit esse cillum dolore eu fugiat nulla pariatur."
                precio1={60}
                precio2={150}

            />

            <div className='container2'>

                <div className='containerMapaGrande'>
                    <div className='piso1MapaGrandeSVG'>
                        <PisoUno_Rojo_SVG funcion={setId} />
                    </div>
                    <div className='piso2MapaGrandeSVG noneMapa'>
                        <PisoDos_Verde_SVG funcion={setId} />
                    </div>
                    <div className='piso3MapaGrandeSVG noneMapa'>
                        <PisoTres_Azul_SVG funcion={setId} />
                    </div>
                </div>
                <div className='containerMapaPequeno'>
                    <div className='mapasPequenos'>
                        <div className='piso1'>
                            <MapaPequeno_piso1_SVG />
                        </div>
                        <div className='piso2 none'>
                            <MapaPequeno_piso2_SVG />
                        </div>
                        <div className='piso3 none'>
                            <MapaPequeno_piso3_SVG />
                        </div>
                    </div>
                    <div className='botonesPisos'>
                        <button onClick={VerPiso3} className="boton">Piso 3</button>
                        <button onClick={VerPiso2} className="boton">Piso 2</button>
                        <button onClick={VerPiso1} className="boton">Piso 1</button>
                    </div>
                    <img src={logo} alt="logo virtual museum" className='logo' />
                </div>
            </div>
        </section>

    )
}
