import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarRecursoHumano() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [recurso, setRecurso] = useState({
        nombre: '',
        rol_id: '',
        contacto: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/recursos-humanos/${_id}`);
            setRecurso(consulta.data);
        };
        const cargarRoles = async () => {
            try {
                const respuesta = await clienteAxios.get('/roles');
                setRoles(respuesta.data);
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar los roles', 'error');
            }
        };
        cargarRoles();
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        setRecurso({
            ...recurso,
            [e.target.name]: e.target.value
        });
    };

    const actualizarRecurso = e => {
        e.preventDefault();
        clienteAxios.put(`/recursos-humanos/${_id}`, recurso)
        .then(res => {
            Swal.fire('Actualizado', 'El recurso humano ha sido actualizado correctamente', 'success');
            navigate('/recursos-humanos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el recurso humano', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Recurso Humano</h2>
            <form onSubmit={actualizarRecurso}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del Recurso Humano" 
                        value={recurso.nombre} 
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
                        value={recurso.contacto} 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Actualizar Recurso Humano" 
                    />
                </div>
            </form>
        </div>
    );
}

export default EditarRecursoHumano;
