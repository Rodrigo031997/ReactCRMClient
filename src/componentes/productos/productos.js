import React, {useEffect, useState, Fragment} from 'react';
/**Importar router link */
import {Link} from 'react-router-dom';
/**importar cliente axios */
import clienteAxios from '../../config/axios';
/**Importar el componente hijo */
import Producto from './Producto';
/**Importar el Spinner */
import Spinner from '../layout/Spinner';

function Productos (){
     //productos = state, guardarproductos = funcion para guardar el state
     const [productos, guardarProductos] = useState([]);

     //useEffect para consultar la api cuando cargue
     useEffect( () =>{
      //Query a la API
      const consultarAPI = async () => {
          const productosConsulta = await clienteAxios.get('/productos');
          guardarProductos(productosConsulta.data);
      }

      //Llamado a la api
      consultarAPI();
     },[]);

    //Spinner de carga
    if(!productos.length) return <Spinner/>
    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={"/producto-nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
              {productos.map(producto => (
                 <Producto key={producto._id} producto={producto}/>
              ))}
            </ul>
    
        </Fragment>
    )
}
 export default Productos;