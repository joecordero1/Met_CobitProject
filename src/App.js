import React, {Fragment, useContext, useState} from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

import Procesos from './components/procesos/Procesos';
import NuevoProceso from './components/procesos/NuevoProceso';
import EditarProceso from './components/procesos/EditarProceso';
import Controles from './components/controles/Controles';
import NuevoControl from './components/controles/NuevoControl';
import EditarControl from './components/controles/EditarControl';
import Kpis from './components/kpis/Kpis';
import NuevoKpi from './components/kpis/NuevoKpi';
import EditarKpi from './components/kpis/EditarKpi';
import ObjetivosControl from './components/objetivoscontrol/ObjetivosControl';
import NuevoObjetivoControl from './components/objetivoscontrol/NuevoObjetivoControl';
import EditarObjetivoControl from './components/objetivoscontrol/EditarObjetivoControl';
import PracticasGestion from './components/practicagestion/PracticasGestion';
import NuevaPracticaGestion from './components/practicagestion/NuevaPracticaGestion';
import EditarPracticaGestion from './components/practicagestion/EditarPracticaGestion';
import Roles from './components/roles/Roles';
import NuevoRol from './components/roles/NuevoRol';
import EditarRol from './components/roles/EditarRol';
import RecursosHumanos from './components/recursohumano/RecursosHumanos';
import NuevoRecursoHumano from './components/recursohumano/NuevoRecursoHumano';
import EditarRecursoHumano from './components/recursohumano/EditarRecursoHumano';
import RecursosTecnologicos from './components/recursostecnologicos/RecursosTecnologicos';
import NuevoRecursoTecnologico from './components/recursostecnologicos/NuevoRecursoTecnologico';
import EditarRecursoTecnologico from './components/recursostecnologicos/EditarRecursoTecnologico';
import Riesgos from './components/riesgos/Riesgos';
import NuevoRiesgo from './components/riesgos/NuevoRiesgo';
import EditarRiesgo from './components/riesgos/EditarRiesgo';
import Login from './components/auth/Login';
import { CRMContext, CRMProvider } from './context/CRMContext';

function App () {

  //UTILIZAR EL CONTEXT
  const [auth, guardarAuth] = useContext(CRMContext);


  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Procesos/>}/>
              <Route path="/procesos/nuevo" element={<NuevoProceso/>}/>
              <Route path="/procesos/editar/:_id" element={<EditarProceso/>}/>

              <Route path="/controles" element={<Controles/>}/>
              <Route path="/controles/nuevo" element={<NuevoControl/>}/>
              <Route path="/controles/editar/:_id" element={<EditarControl/>}/>

              <Route path="/kpis" element={<Kpis/>}/>
              <Route path="/kpis/nuevo" element={<NuevoKpi/>}/>
              <Route path="/kpis/editar/:_id" element={<EditarKpi/>}/>

              <Route path="/objetivos-control" element={<ObjetivosControl/>}/>
              <Route path="/objetivos-control/nuevo" element={<NuevoObjetivoControl/>}/>
              <Route path="/objetivos-control/editar/:_id" element={<EditarObjetivoControl/>}/>

              <Route path="/practicas-gestion" element={<PracticasGestion/>}/>
              <Route path="/practicas-gestion/nuevo" element={<NuevaPracticaGestion/>}/>
              <Route path="/practicas-gestion/editar/:_id" element={<EditarPracticaGestion/>}/>

              <Route path="/roles" element={<Roles/>}/>
              <Route path="/roles/nuevo" element={<NuevoRol/>}/>
              <Route path="/roles/editar/:_id" element={<EditarRol/>}/>

              <Route path="/recursos-humanos" element={<RecursosHumanos/>}/>
              <Route path="/recursos-humanos/nuevo" element={<NuevoRecursoHumano/>}/>
              <Route path="/recursos-humanos/editar/:_id" element={<EditarRecursoHumano/>}/>

              <Route path="/recursos-tecnologicos" element={<RecursosTecnologicos/>}/>
              <Route path="/recursos-tecnologicos/nuevo" element={<NuevoRecursoTecnologico/>}/>
              <Route path="/recursos-tecnologicos/editar/:_id" element={<EditarRecursoTecnologico/>}/>

              <Route path="/riesgos" element={<Riesgos/>}/>
              <Route path="/riesgos/nuevo" element={<NuevoRiesgo/>}/>
              <Route path="/riesgos/editar/:_id" element={<EditarRiesgo/>}/>
              {/* 
              <Route path="/intervenciones" element={<Intervenciones/>}/>
              <Route path="/intervenciones/nueva" element={<NuevaIntervencion/>}/>
              <Route path="/intervenciones/editar/:_id" element={<EditarIntervencion/>}/>
              */}
              <Route path="/iniciar-sesion" element={<Login/>}/>
            </Routes>


          </main>
        </div>
          
        </CRMProvider>
      </Fragment>
    </Router>

    
  )

}


export default App;
