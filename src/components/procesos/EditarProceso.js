import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function EditarProceso() {
    const { _id } = useParams();
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();

    const [proceso, setProceso] = useState({
        nombre_proceso: '',
        dominio: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/procesos/${_id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setProceso(consulta.data);
        };
        consultarAPI();
    }, [_id, auth.token]);

    const actualizarState = e => {
        setProceso({
            ...proceso,
            [e.target.name]: e.target.value
        });
    };

    const actualizarProceso = e => {
        e.preventDefault();
        clienteAxios.put(`/procesos/${_id}`, proceso, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire(
                'Actualizado',
                'El proceso ha sido actualizado correctamente',
                'success'
            );
            navigate('/');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el proceso', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Proceso</h2>
            <form onSubmit={actualizarProceso}>
                <div className="campo">
                    <label>Nombre del Proceso:</label>
                    <input type="text" name="nombre_proceso" placeholder="Nombre del Proceso" value={proceso.nombre_proceso} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Dominio:</label>
                    <input type="text" name="dominio" placeholder="Dominio" value={proceso.dominio} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" value={proceso.descripcion} onChange={actualizarState}></textarea>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Proceso" />
                </div>
            </form>
        </div>
    );
}

export default EditarProceso;
