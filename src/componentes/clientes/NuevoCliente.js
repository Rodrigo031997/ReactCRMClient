import React, {Fragment, useState} from 'react';
/**importar el cliente axios */
import clienteAxios from '../../config/axios';
/**Habilitar redirecciones */
import {withRouter} from 'react-router-dom';
/**importar sweetalert2 */
import Swal from 'sweetalert2';

function NuevoCliente({history}){
    //cliente = state , guardarcliente = funcion para guardar el state
    const[cliente,guardarCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    });

    //  Leer los datos del formulario
    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        guardarCliente({
        ...cliente,
        [e.target.name] : e.target.value 
        });
        
    }

    //Añadir un nuevo cliente a la Rest API 
    const agregarCliente = e =>{
        e.preventDefault();
        //enviar peticion
        clienteAxios.post('/clientes',cliente)
        .then(res=>{
            //validar si hay errores en mongo
            if (res.data.code === 11000) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                Toast.fire({
                    type:'error',
                    icon: 'error',
                    title: 'Este correo ya esta registrado'
                  })
            }else{
                Swal.fire(
                    'Se agregó el cliente',
                    res.data.mensaje,
                    'success'
                )

                //Redireccionar
                 history.push('/');
            }
        });
    }

    //Validar el formulario
    const validarCliente = () =>{
        //Destructuring
        const { nombre, apellido, email, empresa, telefono} = cliente;

        //revisar que las propiedades del state tengan contenido
        let valido = !nombre.length ||   !apellido.length  ||  !email.length || !empresa.length ||  !telefono.length;

        //retorna true o false
        return valido;

    }
 return(
    <Fragment>
        <h2>Nuevo Cliente</h2>
        <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()}/>
                </div>

            </form>
    </Fragment>
 )
}

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);