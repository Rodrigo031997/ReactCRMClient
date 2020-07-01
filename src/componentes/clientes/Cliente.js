import React from 'react';
import {Link} from 'react-router-dom';
/**importar sweetalert2 */
import Swal from 'sweetalert2';
/**importar el cliente axios */
import clienteAxios from '../../config/axios';

function Cliente({cliente}){    

    //extraer los valores 
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    //eliminar Cliente
    const eliminarCliente = idCliente => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {

            clienteAxios.delete(`/clientes/${idCliente}`)
                .then(res => {
                    Swal.fire(
                        'Eliminado!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
            }
          })
    }

    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre} {apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>{email}</p>
                        <p>Tel: {telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/cliente-editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={()=>eliminarCliente(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    )
}
export default Cliente;