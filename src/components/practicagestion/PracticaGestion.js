import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function PracticaGestion({ practicaGestion }) {
    const { _id, nombre_practica, descripcion, proceso_id } = practicaGestion;
    const navigate = useNavigate();

    const deletePracticaGestion = id => {
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
                clienteAxios.delete(`/practicas-gestion/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "La práctica de gestión ha sido eliminada", "success");
                    navigate('/practicas-gestion');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar la práctica de gestión', 'error');
                });
            }
        });
    };

    return (
        <li className="practicaGestion">
            <div className="info-practicaGestion">
                <p className="nombre">Nombre: {nombre_practica}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
                <p className="proceso">Proceso aplicado: {proceso_id}</p>
            </div>
            <div className="acciones">
                <Link to={`/practicas-gestion/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Práctica de Gestión
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deletePracticaGestion(_id)}>
                    <i className="fas fa-times"></i> Eliminar Práctica de Gestión
                </button>
            </div>
        </li>
    );
}

export default PracticaGestion;
