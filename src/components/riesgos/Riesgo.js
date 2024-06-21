import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Riesgo({ riesgo }) {
    const { _id, nombre_riesgo, descripcion, proceso_id } = riesgo;
    const navigate = useNavigate();

    const deleteRiesgo = id => {
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
                clienteAxios.delete(`/riesgos/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El riesgo ha sido eliminado", "success");
                    navigate('/riesgos');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el riesgo', 'error');
                });
            }
        });
    };

    return (
        <li className="riesgo">
            <div className="info-riesgo">
                <p className="nombre">Nombre: {nombre_riesgo}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
                <p className="proceso">Proceso asociado: {proceso_id}</p>
            </div>
            <div className="acciones">
                <Link to={`/riesgos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Riesgo
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteRiesgo(_id)}>
                    <i className="fas fa-times"></i> Eliminar Riesgo
                </button>
            </div>
        </li>
    );
}

export default Riesgo;
