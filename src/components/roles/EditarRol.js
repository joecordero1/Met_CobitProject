import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarRol() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [rol, setRol] = useState({
        rol: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const consulta = await clienteAxios.get(`/roles/${_id}`);
            setRol(consulta.data);
        };
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        });
    };

    const actualizarRol = e => {
        e.preventDefault();
        clienteAxios.put(`/roles/${_id}`, rol)
        .then(res => {
            Swal.fire('Actualizado', 'El rol ha sido actualizado correctamente', 'success');
            navigate('/roles');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
        });
    };

    return (
        <div>
            <h2>Editar Rol</h2>
            <form onSubmit={actualizarRol}>
                <div className="campo">
                    <label>Rol:</label>
                    <input 
                        type="text" 
                        name="rol" 
                        placeholder="Nombre del Rol" 
                        value={rol.rol} 
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        value={rol.descripcion} 
                        onChange={actualizarState}>
                    </textarea>
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Actualizar Rol" 
                    />
                </div>
            </form>
        </div>
    );
}

export default EditarRol;
