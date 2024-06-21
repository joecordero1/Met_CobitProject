import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoRiesgo() {
    const navigate = useNavigate();
    const [riesgo, guardarRiesgo] = useState({
        nombre_riesgo: '',
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
        guardarRiesgo({
            ...riesgo,
            [e.target.name]: e.target.value
        });
    };

    const agregarRiesgo = e => {
        e.preventDefault();
        clienteAxios.post('/riesgos', riesgo)
        .then(res => {
            Swal.fire('Agregado', 'El riesgo se agregó correctamente', 'success');
            navigate('/riesgos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el riesgo', 'error');
        });
    };

    const validarRiesgo = () => {
        const { nombre_riesgo, descripcion, proceso_id } = riesgo;
        return !nombre_riesgo || !descripcion || !proceso_id;
    };

    return (
        <div>
            <h2>Nuevo Riesgo</h2>
            <form onSubmit={agregarRiesgo}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre_riesgo" 
                        placeholder="Nombre del Riesgo" 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        onChange={actualizarState}>
                    </textarea>
                </div>

                <div className="campo">
                    <label>Proceso:</label>
                    <select name="proceso_id" onChange={actualizarState} value={riesgo.proceso_id}>
                        <option value="">-- Selecciona un Proceso --</option>
                        {procesos.map(proceso => (
                            <option key={proceso._id} value={proceso._id}>{proceso.nombre_proceso}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Riesgo" 
                        disabled={validarRiesgo()} 
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoRiesgo;
