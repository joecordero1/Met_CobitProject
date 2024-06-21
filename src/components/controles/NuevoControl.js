import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoControl() {
    const navigate = useNavigate();
    const [control, guardarControl] = useState({
        nombre_control: '',
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
        guardarControl({
            ...control,
            [e.target.name]: e.target.value
        });
    };

    const agregarControl = e => {
        e.preventDefault();
        clienteAxios.post('/controles', control)
        .then(res => {
            Swal.fire('Agregado', 'El control se agregó correctamente', 'success');
            navigate('/controles');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el control', 'error');
        });
    };

    const validarControl = () => {
        const { nombre_control, descripcion, proceso_id } = control;
        return !nombre_control || !descripcion || !proceso_id;
    };

    return (
        <div>
            <h2>Nuevo Control</h2>
            <form onSubmit={agregarControl}>
                <div className="campo">
                    <label>Nombre del Control:</label>
                    <input type="text" name="nombre_control" placeholder="Nombre del Control" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="campo">
                    <label>Proceso:</label>
                    <select name="proceso_id" onChange={actualizarState} value={control.proceso_id}>
                        <option value="">-- Selecciona un Proceso --</option>
                        {procesos.map(proceso => (
                            <option key={proceso._id} value={proceso._id}>{proceso.nombre_proceso}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Control" disabled={validarControl()} />
                </div>
            </form>
        </div>
    );
}

export default NuevoControl;
