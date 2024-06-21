import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {
    const [auth, guardarAuth] = useContext(CRMContext);
    if(!auth.auth) return null;
    return (
        <aside className="sidebar col-3">
            <h2>Administrar</h2>
            <nav className="navegacion">
                <Link to={"/"} className="procesos">Procesos</Link>
                <Link to={"/controles"} className="controles">Controles</Link>
                <Link to={"/kpis"} className="kpis">Kpis</Link>
                <Link to={"/objetivos-control"} className="objetivos-control">Objetivos control</Link>
                <Link to={"/practicas-gestion"} className="practicas-gestion">Practicas gestion</Link>
                <Link to={"/roles"} className="roles">Roles</Link>
                <Link to={"/recursos-humanos"} className="recursos-humanos">Recursos humanos</Link>
                <Link to={"/recursos-tecnologicos"} className="recursos-tecnologicos">Recursos tecnologicos</Link>
                <Link to={"/riesgos"} className="riesgos">Riesgos</Link>
                {/* <a href="productos.html" className="productos">Productos</a> */}
                {/* <a href="pedidos.html" className="pedidos">Pedidos</a> */}
            </nav>
        </aside>
    );
}

export default Navegacion;
