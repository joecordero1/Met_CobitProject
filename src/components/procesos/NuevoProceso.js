import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function NuevoProceso() {
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();

    const [proceso, guardarProceso] = useState({
        nombre_proceso: '',
        dominio: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarProceso({
            ...proceso,
            [e.target.name]: e.target.value
        });
    };

    const agregarProceso = e => {
        e.preventDefault();
        clienteAxios.post('/procesos', proceso, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
            
        })
        .then(res => {
            Swal.fire(
                'Agregado',
                'El proceso se agregó correctamente',
                'success'
            );
            navigate('/');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el proceso', 'error');
        });
    };

    const validarProceso = () => {
        const { nombre_proceso, dominio, descripcion } = proceso;
        let valido = !nombre_proceso.length || !dominio.length || !descripcion.length;
        return valido;
    };

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <div>
            <h2>Nuevo Proceso</h2>
            <form onSubmit={agregarProceso}>
                <div className="campo">
                    <label>Nombre del Proceso:</label>
                    <input type="text" name="nombre_proceso" placeholder="Nombre del Proceso" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Dominio:</label>
                    <input type="text" name="dominio" placeholder="Dominio" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Proceso" disabled={validarProceso()} />
                </div>
            </form>
        </div>
    );
}

export default NuevoProceso;
