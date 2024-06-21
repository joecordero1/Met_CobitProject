import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarRecursoTecnologico() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [recurso, setRecurso] = useState({
        nombre_recurso: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/recursos-tecnologicos/${_id}`);
            setRecurso(consulta.data);
        };
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
        clienteAxios.put(`/recursos-tecnologicos/${_id}`, recurso)
        .then(res => {
            Swal.fire('Actualizado', 'El recurso tecnológico ha sido actualizado correctamente', 'success');
            navigate('/recursos-tecnologicos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el recurso tecnológico', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Recurso Tecnológico</h2>
            <form onSubmit={actualizarRecurso}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre_recurso" 
                        placeholder="Nombre del Recurso Tecnológico" 
                        value={recurso.nombre_recurso} 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        value={recurso.descripcion} 
                        onChange={actualizarState}>
                    </textarea>
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Actualizar Recurso Tecnológico" 
                    />
                </div>
            </form>
        </div>
    );
}

export default EditarRecursoTecnologico;
