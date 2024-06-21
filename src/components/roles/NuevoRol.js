import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoRol() {
    const navigate = useNavigate();
    const [rol, guardarRol] = useState({
        rol: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarRol({
            ...rol,
            [e.target.name]: e.target.value
        });
    };

    const agregarRol = e => {
        e.preventDefault();
        clienteAxios.post('/roles', rol)
        .then(res => {
            Swal.fire('Agregado', 'El rol se agregó correctamente', 'success');
            navigate('/roles');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el rol', 'error');
        });
    };

    const validarRol = () => {
        const { rol: nombreRol } = rol;
        return !nombreRol.trim();
    };

    return (
        <div>
            <h2>Nuevo Rol</h2>
            <form onSubmit={agregarRol}>
                <div className="campo">
                    <label>Rol:</label>
                    <input 
                        type="text" 
                        name="rol" 
                        placeholder="Nombre del Rol" 
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
                        value="Agregar Rol" 
                        disabled={validarRol()} 
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoRol;
