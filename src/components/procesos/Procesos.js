import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Proceso from './Proceso';
import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function Procesos() {
    const [procesos, setProcesos] = useState([]);
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get('/procesos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    setProcesos(respuesta.data);
                } catch (error) {
                    if (error.response.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            };
            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, [auth.token, navigate]);

    return (
        <Fragment>
            <h2>Procesos</h2>
            <Link to="/procesos/nuevo" className="btn btn-verde nvo-proceso">
                <i className="fas fa-plus-circle"></i>
                Nuevo Proceso
            </Link>
            <ul className="listado-procesos">
                {procesos.map(proceso => (
                    <Proceso key={proceso._id} proceso={proceso} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Procesos;
