import { useState } from "react";
import { useEffect } from "react";

export default function FormularioPago({datos, eliminar}){

    const  precios = [];

    datos.forEach(element => {
        precios.push(parseInt(element.mes))
    });

    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(total);









    return(
        <div className='containerPagar'>
            <table className='tablaPagar' >
                <tr>
                <th>SALA</th>
                <th>MES</th>
                <th>PRECIO</th>
                <th>Borrar</th>
                </tr>
                {datos.map(ar => {
                    return(
                        <tr>
                            <td>{ar.id}</td>
                            <td>{ar.precio}</td>
                            <td>{ar.mes}</td>
                            <td onClick={()=>eliminar(ar.id)}><button>x</button></td>
                        </tr>
                    )
                })}
            </table>
            
            <button className='botonPagarr'>Pagar</button>
            
            <p className='total'>Total : {total}</p>
        </div>
    )
}