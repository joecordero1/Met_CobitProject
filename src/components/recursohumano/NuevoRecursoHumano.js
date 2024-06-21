import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoRecursoHumano() {
    const navigate = useNavigate();
    const [recurso, guardarRecurso] = useState({
        nombre: '',
        rol_id: '',
        contacto: ''
    });
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const cargarRoles = async () => {
            try {
                const respuesta = await clienteAxios.get('/roles');
                setRoles(respuesta.data);
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar los roles', 'error');
            }
        };
        cargarRoles();
    }, []);

    const actualizarState = e => {
        guardarRecurso({
            ...recurso,
            [e.target.name]: e.target.value
        });
    };

    const agregarRecurso = e => {
        e.preventDefault();
        clienteAxios.post('/recursos-humanos', recurso)
        .then(res => {
            Swal.fire('Agregado', 'El recurso humano se agregó correctamente', 'success');
            navigate('/recursos-humanos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el recurso humano', 'error');
        });
    };

    const validarRecurso = () => {
        const { nombre, rol_id, contacto } = recurso;
        return !nombre || !rol_id || !contacto;
    };

    return (
        <div>
            <h2>Nuevo Recurso Humano</h2>
            <form onSubmit={agregarRecurso}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del Recurso Humano" 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select name="rol_id" onChange={actualizarState} value={recurso.rol_id}>
                        <option value="">-- Selecciona un Rol --</option>
                        {roles.map(rol => (
                            <option key={rol._id} value={rol._id}>{rol.rol}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Contacto:</label>
                    <input 
                        type="text" 
                        name="contacto" 
                        placeholder="Información de Contacto" 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Recurso Humano" 
                        disabled={validarRecurso()} 
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoRecursoHumano;
