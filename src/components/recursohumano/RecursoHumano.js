import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function RecursoHumano({ recursoHumano }) {
    const { _id, nombre, rol_id, contacto } = recursoHumano;
    const navigate = useNavigate();

    const deleteRecursoHumano = id => {
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
                clienteAxios.delete(`/recursos-humanos/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El recurso humano ha sido eliminado", "success");
                    navigate('/recursos-humanos');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el recurso humano', 'error');
                });
            }
        });
    };

    return (
        <li className="recursoHumano">
            <div className="info-recursoHumano">
                <p className="nombre">Nombre: {nombre}</p>
                <p className="rol">Rol: {rol_id}</p>
                <p className="contacto">Contacto: {contacto}</p>
            </div>
            <div className="acciones">
                <Link to={`/recursos-humanos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Recurso Humano
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteRecursoHumano(_id)}>
                    <i className="fas fa-times"></i> Eliminar Recurso Humano
                </button>
            </div>
        </li>
    );
}

export default RecursoHumano;
