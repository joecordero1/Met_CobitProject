import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Kpi from './Kpi'; // Importa el componente individual de Kpi

function Kpis() {
    const [kpis, setKpis] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/kpis');
                setKpis(respuesta.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/iniciar-sesion');
                }
            }
        };
        consultarAPI();
    }, [navigate]);

    return (
        <Fragment>
            <h2>KPIs</h2>
            <Link to="/kpis/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo KPI
            </Link>
            <ul className="listado-kpis">
                {kpis.map(kpi => (
                    <Kpi key={kpi._id} kpi={kpi} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Kpis;
