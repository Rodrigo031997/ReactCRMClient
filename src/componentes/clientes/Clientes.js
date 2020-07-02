import React, {useEffect, useState, Fragment} from 'react';
/**importar cliente axios */
import clienteAxios from '../../config/axios';
/**Importar el componente cliente */
import Cliente from './Cliente';
/**Importar router link */
import {Link} from 'react-router-dom';
/**Importar el Spinner */
import Spinner from '../layout/Spinner';

function Clientes (){
    
    //Trabajar con el state
    //clientes = state, guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    //use effect es similar a componentdidmount y willmount
    useEffect(()=>{
        //Query a la API
    const consultarAPI = async () =>{
        const clientesConsulta = await clienteAxios.get('/clientes');
        
        //colocar el resultado en el state
        guardarClientes(clientesConsulta.data);
    }
      consultarAPI();
    },[]);

    //Spinner de carga
    if(!clientes.length) return <Spinner/>

    return(
        <Fragment>
            <h2>Clientes</h2>
            <Link to={"/cliente-nuevo"} className="btn btn-verde nvo-cliente"> 
            <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente 
                    key= {cliente._id}
                        cliente= {cliente}/>
                ))}
                
            </ul>
        </Fragment>
    )
}
export default Clientes;