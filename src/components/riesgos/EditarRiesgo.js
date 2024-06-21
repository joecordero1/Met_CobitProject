import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarRiesgo() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [procesos, setProcesos] = useState([]);
    const [riesgo, setRiesgo] = useState({
        nombre_riesgo: '',
        descripcion: '',
        proceso_id: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/riesgos/${_id}`);
            setRiesgo(consulta.data);
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
        setRiesgo({
            ...riesgo,
            [e.target.name]: e.target.value
        });
    };

    const actualizarRiesgo = e => {
        e.preventDefault();
        clienteAxios.put(`/riesgos/${_id}`, riesgo)
        .then(res => {
            Swal.fire('Actualizado', 'El riesgo ha sido actualizado correctamente', 'success');
            navigate('/riesgos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el riesgo', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Riesgo</h2>
            <form onSubmit={actualizarRiesgo}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre_riesgo" 
                        placeholder="Nombre del Riesgo" 
                        value={riesgo.nombre_riesgo} 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        value={riesgo.descripcion} 
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
                        value="Actualizar Riesgo" 
                    />
                </div>
            </form>
        </div>
    );
}

export default EditarRiesgo;
