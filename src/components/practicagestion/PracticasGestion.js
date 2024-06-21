import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import PracticaGestion from './PracticaGestion'; // Importa el componente individual de PracticaGestion

function PracticasGestion() {
    const [practicasGestion, setPracticasGestion] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/practicas-gestion');
                setPracticasGestion(respuesta.data);
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
            <h2>Prácticas de Gestión</h2>
            <Link to="/practicas-gestion/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nueva Práctica de Gestión
            </Link>
            <ul className="listado-practicasGestion">
                {practicasGestion.map(practicaGestion => (
                    <PracticaGestion key={practicaGestion._id} practicaGestion={practicaGestion} />
                ))}
            </ul>
        </Fragment>
    );
}

export default PracticasGestion;
