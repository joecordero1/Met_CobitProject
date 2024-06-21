import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Control from './Control'; // Importa el componente individual de Control

function Controles() {
    const [controles, setControles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/controles');
                setControles(respuesta.data);
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
            <h2>Controles</h2>
            <Link to="/controles/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Control
            </Link>
            <ul className="listado-controles">
                {controles.map(control => (
                    <Control key={control._id} control={control} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Controles;
