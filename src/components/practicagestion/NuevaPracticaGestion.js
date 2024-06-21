import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevaPracticaGestion() {
    const navigate = useNavigate();
    const [practica, guardarPractica] = useState({
        nombre_practica: '',
        descripcion: '',
        proceso_id: ''
    });
    const [procesos, setProcesos] = useState([]);

    useEffect(() => {
        const cargarProcesos = async () => {
            try {
                const respuesta = await clienteAxios.get('/procesos');
                setProcesos(respuesta.data);
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar los procesos', 'error');
            }
        };
        cargarProcesos();
    }, []);

    const actualizarState = e => {
        guardarPractica({
            ...practica,
            [e.target.name]: e.target.value
        });
    };

    const agregarPractica = e => {
        e.preventDefault();
        clienteAxios.post('/practicas-gestion', practica)
        .then(res => {
            Swal.fire('Agregado', 'La práctica de gestión se agregó correctamente', 'success');
            navigate('/practicas-gestion');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar la práctica de gestión', 'error');
        });
    };

    const validarPractica = () => {
        const { nombre_practica, descripcion, proceso_id } = practica;
        return !nombre_practica || !descripcion || !proceso_id;
    };

    return (
        <div>
            <h2>Nueva Práctica de Gestión</h2>
            <form onSubmit={agregarPractica}>
                <div className="campo">
                    <label>Nombre de la Práctica:</label>
                    <input type="text" name="nombre_practica" placeholder="Nombre de la Práctica" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
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
                    <input type="submit" className="btn btn-azul" value="Agregar Práctica de Gestión" disabled={validarPractica()} />
                </div>
            </form>
        </div>
    );
}

export default NuevaPracticaGestion;
