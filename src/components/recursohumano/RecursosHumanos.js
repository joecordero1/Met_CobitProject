import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import RecursoHumano from './RecursoHumano';

function RecursosHumanos() {
    const [recursosHumanos, setRecursosHumanos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/recursos-humanos');
                setRecursosHumanos(respuesta.data);
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
            <h2>Recursos Humanos</h2>
            <Link to="/recursos-humanos/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Recurso Humano
            </Link>
            <ul className="listado-recursosHumanos">
                {recursosHumanos.map(recursoHumano => (
                    <RecursoHumano key={recursoHumano._id} recursoHumano={recursoHumano} />
                ))}
            </ul>
        </Fragment>
    );
}

export default RecursosHumanos;
