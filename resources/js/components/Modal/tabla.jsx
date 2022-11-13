import { TiDelete } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

export default function FormularioPago({datos, eliminar, updateId, ocultarTablaPagar }){

    //ALMACENO TODOS LOS PRECIOS EN UN ARRAY
    const  precios = [];
    //RECORRO EL ARRAY DE PRECIOS
    datos.forEach(element => {
        precios.push(parseInt(element.precio_pagos))
    });
    //SUMO TODOS LOS PRECIOS DE ARRAY
    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return(
        <div className='containerPadrePagar'>
        <div 
            onClick={ocultarTablaPagar} 
            className="ocultarTablaPagar">
            <GrClose/>
        </div>
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
                {datos.map(ar => {
                    return(
                        <tr className="tr2">
                            <td 
                                className="nSala" 
                                id={ar.sala_pagos} 
                                onClick={()=>updateId(ar.sala_pagos)}>
                                {ar.sala_pagos}
                            </td>
                            <td 
                                className="nPiso" 
                                id={ar.sala_pagos} 
                                onClick={()=>updateId(ar.sala_pagos)}>
                                {ar.piso_pagos}
                            </td> 
                            <td 
                                className="precio" 
                                id={ar.sala_pagos} 
                                onClick={()=>updateId(ar.sala_pagos)}>
                                {ar.precio_pagos}€
                            </td> 
                            <td 
                                className="borrar" 
                                onClick={()=>eliminar(ar.sala_pagos)}>
                                <TiDelete />
                            </td>
                        </tr>
                    )
                })}
            </table>
            </div>
                <div className="divTotal">
                    <button 
                        className='botonPagarr'>
                        Pagar
                    </button>
                    <p className='total'>
                        Total : {total}€
                    </p>
                </div>
            </div>
    )
}
