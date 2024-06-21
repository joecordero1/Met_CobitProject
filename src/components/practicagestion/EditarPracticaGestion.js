import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarPracticaGestion() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [procesos, setProcesos] = useState([]);
    const [practica, setPractica] = useState({
        nombre_practica: '',
        descripcion: '',
        proceso_id: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/practicas-gestion/${_id}`);
            setPractica(consulta.data);
        };
        const cargarDatos = async () => {
            try {
                const respuesta = await clienteAxios.get('/procesos');
                setProcesos(respuesta.data);
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar los procesos', 'error');
            }
        };
        cargarDatos();
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        setPractica({
            ...practica,
            [e.target.name]: e.target.value
        });
    };

    const actualizarPractica = e => {
        e.preventDefault();
        clienteAxios.put(`/practicas-gestion/${_id}`, practica)
        .then(res => {
            Swal.fire('Actualizado', 'La práctica de gestión ha sido actualizada correctamente', 'success');
            navigate('/practicas-gestion');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar la práctica de gestión', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Práctica de Gestión</h2>
            <form onSubmit={actualizarPractica}>
                <div className="campo">
                    <label>Nombre de la Práctica:</label>
                    <input type="text" name="nombre_practica" placeholder="Nombre de la Práctica" value={practica.nombre_practica} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" value={practica.descripcion} onChange={actualizarState}></textarea>
                </div>

                <div className="campo">
                    <label>Proceso:</label>
                    <select name="proceso_id" onChange={actualizarState} value={practica.proceso_id}>
                        <option value="">-- Selecciona un Proceso --</option>
                        {procesos.map(proceso => (
                            <option key={proceso._id} value={proceso._id}>{proceso.nombre_proceso}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Práctica de Gestión" />
                </div>
            </form>
        </div>
    );
}

export default EditarPracticaGestion;
