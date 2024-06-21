import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function Proceso({ proceso }) {
    const { _id, nombre_proceso, dominio, descripcion } = proceso;
    const [auth, ] = useContext(CRMContext);
    const navigate = useNavigate();
    
    const deleteProceso = id => {
        Swal.fire({
            title: "Confirmación",
            text: "No es posible revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/procesos/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                .then(res => {
                    Swal.fire("Eliminado", res.data.mensaje, "success");
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el proceso', 'error');
                });
            }
        });
    };

    return (
        <li className="proceso">
            <div className="info-proceso">
                <p className="nombre">Nombre: {nombre_proceso}</p>
                <p className="dominio">Dominio: {dominio}</p>
                <p className="descripcion">Descripcion: {descripcion}</p>
            </div>
            <div className="acciones">
                <Link to={`/procesos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Proceso
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteProceso(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Proceso
                </button>
            </div>
        </li>
    );
}

export default Proceso;
