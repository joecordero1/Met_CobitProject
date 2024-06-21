import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Control({ control }) {
    const { _id, nombre_control, descripcion, proceso_id } = control;
    const navigate = useNavigate();

    const deleteControl = id => {
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
                clienteAxios.delete(`/controles/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El control ha sido eliminado", "success");
                    navigate('/controles');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el control', 'error');
                });
            }
        });
    };

    return (
        <li className="control">
            <div className="info-control">
                <p className="nombre">Nombre: {nombre_control}</p>
                <p className="descripcion">Descripcion: {descripcion}</p>
                <p className="proceso">Proceso aplicado: {proceso_id}</p>
            </div>
            <div className="acciones">
                <Link to={`/controles/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Control
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteControl(_id)}>
                    <i className="fas fa-times"></i> Eliminar Control
                </button>
            </div>
        </li>
    );
}

export default Control;
