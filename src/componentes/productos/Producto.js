import React from 'react';
/**Importar router link */
import {Link} from 'react-router-dom';
/**importar sweetalert2 */
import Swal from 'sweetalert2';
/**importar cliente axios */
import clienteAxios from '../../config/axios';

function Producto({producto}){
    const {_id, nombre, precio, imagen} = producto;

     //elimina un producto
     const eliminarProducto = id => {
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Un producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.value) {
                //eliminar en la rest api
                clienteAxios.delete(`/productos/${id}`)
                    .then(res => {
                        if(res.status === 200){
                            Swal.fire(
                                'Deleted!',
                                res.data.mensaje,
                                'success'
                              ) 
                    }  
                })
              }
          })
    }

    return(
        <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">${precio}</p>
                        { imagen ? (
                            <img src={`http://localhost:5000/${imagen}`} alt="imagen"/>
                        ) : null}   
                    </div>
                    <div className="acciones">
                        <Link to={`/producto-editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li> 
    )
}
 export default Producto;