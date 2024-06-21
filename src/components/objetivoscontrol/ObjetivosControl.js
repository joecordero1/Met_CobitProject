import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import ObjetivoControl from './ObjetivoControl'; // Importa el componente individual de ObjetivoControl

function ObjetivosControl() {
    const [objetivosControl, setObjetivosControl] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/objetivos-control');
                setObjetivosControl(respuesta.data);
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
            <h2>Objetivos de Control</h2>
            <Link to="/objetivos-control/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Objetivo de Control
            </Link>
            <ul className="listado-objetivosControl">
                {objetivosControl.map(objetivoControl => (
                    <ObjetivoControl key={objetivoControl._id} objetivoControl={objetivoControl} />
                ))}
            </ul>
        </Fragment>
    );
}

export default ObjetivosControl;
