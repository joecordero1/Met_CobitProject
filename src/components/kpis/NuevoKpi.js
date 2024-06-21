import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoKpi() {
    const navigate = useNavigate();
    const [kpi, guardarKpi] = useState({
        nombre_kpi: '',
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
        guardarKpi({
            ...kpi,
            [e.target.name]: e.target.value
        });
    };

    const agregarKpi = e => {
        e.preventDefault();
        clienteAxios.post('/kpis', kpi)
        .then(res => {
            Swal.fire('Agregado', 'El KPI se agregó correctamente', 'success');
            navigate('/kpis');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el KPI', 'error');
        });
    };

    const validarKpi = () => {
        const { nombre_kpi, descripcion, proceso_id } = kpi;
        return !nombre_kpi || !descripcion || !proceso_id;
    };

    return (
        <div>
            <h2>Nuevo KPI</h2>
            <form onSubmit={agregarKpi}>
                <div className="campo">
                    <label>Nombre del KPI:</label>
                    <input type="text" name="nombre_kpi" placeholder="Nombre del KPI" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="campo">
                    <label>Proceso:</label>
                    <select name="proceso_id" onChange={actualizarState} value={kpi.proceso_id}>
                        <option value="">-- Selecciona un Proceso --</option>
                        {procesos.map(proceso => (
                            <option key={proceso._id} value={proceso._id}>{proceso.nombre_proceso}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar KPI" disabled={validarKpi()} />
                </div>
            </form>
        </div>
    );
}

export default NuevoKpi;
