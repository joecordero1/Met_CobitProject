import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Rol from './Rol';

function Roles() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/roles');
                setRoles(respuesta.data);
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
            <h2>Roles</h2>
            <Link to="/roles/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Rol
            </Link>
            <ul className="listado-roles">
                {roles.map(rol => (
                    <Rol key={rol._id} rol={rol} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Roles;
