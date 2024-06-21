import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function EditarControl() {
    const { _id } = useParams();
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();
    const [control, setControl] = useState({
        nombre_control: '',
        descripcion: '',
        proceso_id: ''
    });

    const [procesos, setProcesos] = useState([]);

    useEffect(() => {
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
    }, []);
    // Query a la API
    const consultarAPI = async () => {
        const controlConsulta = await clienteAxios.get(`/controles/${_id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        // Colocar en el state
        setControl(controlConsulta.data);
    }
    const actualizarState = e => {
        setControl({
            ...control,
            [e.target.name]: e.target.value
        });
    };

    const actualizarControl = e => {
        e.preventDefault();
        clienteAxios.put(`/controles/${_id}`, control)
        .then(res => {
            Swal.fire('Actualizado', 'El control ha sido actualizado correctamente', 'success');
            navigate('/controles');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el control', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Control</h2>
            <form onSubmit={actualizarControl}>
                <div className="campo">
                    <label>Nombre del Control:</label>
                    <input type="text" name="nombre_control" placeholder="Nombre del Control" value={control.nombre_control} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" value={control.descripcion} onChange={actualizarState}></textarea>
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
                    <input type="submit" className="btn btn-azul" value="Actualizar Control" />
                </div>
            </form>
        </div>
    );
}

export default EditarControl;
