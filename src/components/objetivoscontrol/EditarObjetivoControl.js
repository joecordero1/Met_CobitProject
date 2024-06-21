import React, { Fragment, useEffect, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function EditarObjetivoControl() {
    const { _id } = useParams();
    const [auth] = useContext(CRMContext);
    const navigate = useNavigate();

    const [objetivoControlActual, guardarObjetivoControlActual] = useState({
        nombre_objetivo: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const objetivoControlConsulta = await clienteAxios.get(`/objetivos-control/${_id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarObjetivoControlActual(objetivoControlConsulta.data);
        }
        consultarAPI();
    }, [_id, auth.token]);

    const actualizarState = e => {
        guardarObjetivoControlActual({
            ...objetivoControlActual,
            [e.target.name]: e.target.value
        });
    }

    const actualizarObjetivoControl = e => {
        e.preventDefault();

        clienteAxios.put(`/objetivos-control/${objetivoControlActual._id}`, objetivoControlActual, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire('Actualizado', res.data.mensaje, 'success');
            navigate('/objetivos-control');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el objetivo de control', 'error');
        });
    }

    const validarObjetivoControl = () => {
        const { nombre_objetivo, descripcion } = objetivoControlActual;
        return !nombre_objetivo || !nombre_objetivo.length || !descripcion || !descripcion.length;
    }

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Editar Objetivo de Control</h2>

            <form onSubmit={actualizarObjetivoControl}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre del Objetivo:</label>
                    <input type="text"
                        placeholder="Nombre del Objetivo"
                        name="nombre_objetivo"
                        onChange={actualizarState}
                        value={objetivoControlActual.nombre_objetivo}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input type="text"
                        placeholder="Descripción del Objetivo"
                        name="descripcion"
                        onChange={actualizarState}
                        value={objetivoControlActual.descripcion}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Actualizar Objetivo de Control"
                        disabled={validarObjetivoControl()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarObjetivoControl;
