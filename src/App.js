import React, { Fragment } from 'react';
/**importar routing */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/**Layout*/
import Header from './componentes/layout/header';
import Navegacion from './componentes/layout/navegacion';

/**Componentes Cliente */
import Clientes from './componentes/clientes/Clientes';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import EditarCliente from './componentes/clientes/EditarCliente';

/**Componentes Productos */
import Productos from './componentes/productos/Productos';
import EditarProducto from './componentes/productos/EditarProducto';
import NuevoProducto from './componentes/productos/NuevoProducto';
/**Componentes Pedidos */
import Pedidos from './componentes/pedidos/pedidos';

function App(){
  return(
    <Router>
      <Fragment>
       <Header/>
       <div className="grid contenedor contenido-principal">
         <Navegacion/>

         <main className="caja-contenido col-9">
           <Switch>
             <Route exact path="/" component={Clientes}></Route>
             <Route exact path="/cliente-nuevo" component={NuevoCliente}></Route>
             <Route exact path="/cliente-editar/:id" component={EditarCliente}></Route>

             <Route exact path="/productos" component={Productos}></Route>
             <Route exact path="/producto-nuevo" component={NuevoProducto}></Route>
             <Route exact path="/producto-editar/:id" component={EditarProducto}></Route>

             <Route exact path="/pedidos" component={Pedidos}></Route>
           </Switch>
         </main>
       </div>
    </Fragment>
    </Router>
  )
}

export default App;
