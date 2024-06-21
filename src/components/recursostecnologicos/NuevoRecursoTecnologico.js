import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoRecursoTecnologico() {
    const navigate = useNavigate();
    const [recurso, guardarRecurso] = useState({
        nombre_recurso: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarRecurso({
            ...recurso,
            [e.target.name]: e.target.value
        });
    };

    const agregarRecurso = e => {
        e.preventDefault();
        clienteAxios.post('/recursos-tecnologicos', recurso)
        .then(res => {
            Swal.fire('Agregado', 'El recurso tecnológico se agregó correctamente', 'success');
            navigate('/recursos-tecnologicos');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el recurso tecnológico', 'error');
        });
    };

    const validarRecurso = () => {
        const { nombre_recurso, descripcion } = recurso;
        return !nombre_recurso || !descripcion;
    };

    return (
        <div>
            <h2>Nuevo Recurso Tecnológico</h2>
            <form onSubmit={agregarRecurso}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre_recurso" 
                        placeholder="Nombre del Recurso Tecnológico" 
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

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Recurso Tecnológico" 
                        disabled={validarRecurso()} 
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoRecursoTecnologico;
