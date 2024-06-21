import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoObjetivoControl() {
    const navigate = useNavigate();
    const [objetivoControl, guardarObjetivoControl] = useState({
        nombre_objetivo: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarObjetivoControl({
            ...objetivoControl,
            [e.target.name]: e.target.value
        });
    };

    const agregarObjetivoControl = e => {
        e.preventDefault();
        clienteAxios.post('/objetivos-control', objetivoControl)
        .then(res => {
            Swal.fire('Agregado', 'El objetivo de control se agregó correctamente', 'success');
            navigate('/objetivos-control');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo agregar el objetivo de control', 'error');
        });
    };

    const validarObjetivoControl = () => {
        const { nombre_objetivo, descripcion } = objetivoControl;
        return !nombre_objetivo || !descripcion;
    };

    return (
        <div>
            <h2>Nuevo Objetivo de Control</h2>
            <form onSubmit={agregarObjetivoControl}>
                <div className="campo">
                    <label>Nombre del Objetivo:</label>
                    <input type="text" name="nombre_objetivo" placeholder="Nombre del Objetivo" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Objetivo de Control" disabled={validarObjetivoControl()} />
                </div>
            </form>
        </div>
    );
}

export default NuevoObjetivoControl;
