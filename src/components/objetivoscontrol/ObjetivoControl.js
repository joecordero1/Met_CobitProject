import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function ObjetivoControl({ objetivoControl }) {
    const { _id, nombre_objetivo, descripcion } = objetivoControl;
    const navigate = useNavigate();

    const deleteObjetivoControl = id => {
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
                clienteAxios.delete(`/objetivos-control/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El objetivo de control ha sido eliminado", "success");
                    navigate('/objetivo-control');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el objetivo de control', 'error');
                });
            }
        });
    };

    return (
        <li className="objetivoControl">
            <div className="info-objetivoControl">
                <p className="nombre">Nombre: {nombre_objetivo}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
            </div>
            <div className="acciones">
                <Link to={`/objetivos-control/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Objetivo Control
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteObjetivoControl(_id)}>
                    <i className="fas fa-times"></i> Eliminar Objetivo Control
                </button>
            </div>
        </li>
    );
}

export default ObjetivoControl;
