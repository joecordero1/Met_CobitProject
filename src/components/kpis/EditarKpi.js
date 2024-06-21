import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function EditarKpi() {
    const { _id } = useParams();
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();
    const [kpi, setKpi] = useState({
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
        consultarAPI();
    }, []);

    // Query a la API
    const consultarAPI = async () => {
        const Consulta = await clienteAxios.get(`/kpis/${_id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        // Colocar en el state
        setKpi(Consulta.data);
    }

    const actualizarState = e => {
        setKpi({
            ...kpi,
            [e.target.name]: e.target.value
        });
    };

    const actualizarKpi = e => {
        e.preventDefault();
        clienteAxios.put(`/kpis/${_id}`, kpi)
        .then(res => {
            Swal.fire('Actualizado', 'El KPI ha sido actualizado correctamente', 'success');
            navigate('/kpis');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el KPI', 'error');
        });
    };

    return (
        <div>
            <h2>Editar KPI</h2>
            <form onSubmit={actualizarKpi}>
                <div className="campo">
                    <label>Nombre del KPI:</label>
                    <input type of="text" name="nombre_kpi" placeholder="Nombre del KPI" value={kpi.nombre_kpi} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" value={kpi.descripcion} onChange={actualizarState}></textarea>
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
                    <input type="submit" className="btn btn-azul" value="Actualizar KPI" />
                </div>
            </form>
        </div>
    );
}

export default EditarKpi;
