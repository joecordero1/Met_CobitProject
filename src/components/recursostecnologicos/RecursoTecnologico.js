import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function RecursoTecnologico({ recursoTecnologico }) {
    const { _id, nombre_recurso, descripcion } = recursoTecnologico;
    const navigate = useNavigate();

    const deleteRecursoTecnologico = id => {
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
                clienteAxios.delete(`/recursos-tecnologicos/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El recurso tecnológico ha sido eliminado", "success");
                    navigate('/recursos-tecnologicos');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el recurso tecnológico', 'error');
                });
            }
        });
    };

    return (
        <li className="recursoTecnologico">
            <div className="info-recursoTecnologico">
                <p className="nombre">Nombre: {nombre_recurso}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
            </div>
            <div className="acciones">
                <Link to={`/recursos-tecnologicos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Recurso Tecnológico
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteRecursoTecnologico(_id)}>
                    <i className="fas fa-times"></i> Eliminar Recurso Tecnológico
                </button>
            </div>
        </li>
    );
}

export default RecursoTecnologico;
