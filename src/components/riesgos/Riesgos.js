import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Riesgo from './Riesgo';

function Riesgos() {
    const [riesgos, setRiesgos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/riesgos');
                setRiesgos(respuesta.data);
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
            <h2>Riesgos</h2>
            <Link to="/riesgos/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Riesgo
            </Link>
            <ul className="listado-riesgos">
                {riesgos.map(riesgo => (
                    <Riesgo key={riesgo._id} riesgo={riesgo} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Riesgos;
