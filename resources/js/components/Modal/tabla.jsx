import { TiDelete } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

export default function FormularioPago({datos, eliminar, updateId, ocultarTablaPagar }){

    //ALMACENO TODOS LOS PRECIOS EN UN ARRAY Y LOS SUMO
    const  precios = [];
    const datosDescendente = datos;

    //RECORRO EL ARRAY DE PRECIOS
    datosDescendente.forEach(element => {
        precios.push(parseInt(element.precio))
    });
    
    //SUMO TODOS LOS PRECIOS DE ARRAY
    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return(
        <div className='containerPadrePagar'>
        <div onClick={ocultarTablaPagar} className="ocultarTablaPagar"><GrClose/></div>
        <div className='containerPagar'>
            <table className='tablaPagar' >
                <tr className="tr">
                <th>SALA</th>
                <th>PISO</th>
                <th>PRECIO</th>
                <th></th>
                <th></th>
                <th></th>
                </tr>
                {datosDescendente.map(ar => {
                    return(
                        <tr className="tr2">
                            <td className="nSala" id={ar.id} onClick={()=>updateId(ar.id)}>{ar.id}</td>
                            <td className="nPiso" id={ar.id} onClick={()=>updateId(ar.id)}>{ar.id[1]}</td>
                            <td className="precio" id={ar.id} onClick={()=>updateId(ar.id)}>{ar.precio}€</td>
                            <td className="borrar" onClick={()=>eliminar(ar.id)}><TiDelete /></td>
                        </tr>
                    )
                })}
            </table>
            </div>
                <div className="divTotal">
                        <button className='botonPagarr'>Pagar</button>
                        <p className='total'>Total : {total}€</p>
                </div>
            </div>
    )
}
