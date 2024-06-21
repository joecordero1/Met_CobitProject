import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import RecursoTecnologico from './RecursoTecnologico';

function RecursosTecnologicos() {
    const [recursosTecnologicos, setRecursosTecnologicos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/recursos-tecnologicos');
                setRecursosTecnologicos(respuesta.data);
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
            <h2>Recursos Tecnológicos</h2>
            <Link to="/recursos-tecnologicos/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Recurso Tecnológico
            </Link>
            <ul className="listado-recursosTecnologicos">
                {recursosTecnologicos.map(recursoTecnologico => (
                    <RecursoTecnologico key={recursoTecnologico._id} recursoTecnologico={recursoTecnologico} />
                ))}
            </ul>
        </Fragment>
    );
}

export default RecursosTecnologicos;
