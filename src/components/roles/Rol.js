import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Rol({ rol }) {
    const { _id, rol: nombreRol, descripcion } = rol;
    const navigate = useNavigate();

    const deleteRol = id => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/roles/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
                    navigate('/roles');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el rol', 'error');
                });
            }
        });
    };

    return (
        <li className="rol">
            <div className="info-rol">
                <p className="nombre">Rol: {nombreRol}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
            </div>
            <div className="acciones">
                <Link to={`/roles/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Rol
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteRol(_id)}>
                    <i className="fas fa-times"></i> Eliminar Rol
                </button>
            </div>
        </li>
    );
}

export default Rol;
