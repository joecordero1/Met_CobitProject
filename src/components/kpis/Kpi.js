import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Kpi({ kpi }) {
    const { _id, nombre_kpi, descripcion, proceso_id } = kpi;
    const navigate = useNavigate();

    const deleteKpi = id => {
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
                clienteAxios.delete(`/kpis/${_id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El KPI ha sido eliminado", "success");
                    navigate('/kpis');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el KPI', 'error');
                });
            }
        });
    };

    return (
        <li className="kpi">
            <div className="info-kpi">
                <p className="nombre">Nombre: {nombre_kpi}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
                <p className="proceso">Proceso aplicado: {proceso_id}</p>
            </div>
            <div className="acciones">
                <Link to={`/kpis/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar KPI
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteKpi(_id)}>
                    <i className="fas fa-times"></i> Eliminar KPI
                </button>
            </div>
        </li>
    );
}

export default Kpi;
