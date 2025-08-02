import React, { useState } from 'react';
import './App.css';

export const Formulario = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    deporte: '',
    genero: '',
    estado: '',
    mayorEdad: false,
    autos: [] as string[],
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox' && name === 'autos') {
      const nuevosAutos = checked
        ? [...formulario.autos, value]
        : formulario.autos.filter((auto) => auto !== value);

      setFormulario({ ...formulario, autos: nuevosAutos });
    } else if (type === 'checkbox') {
      setFormulario({ ...formulario, [name]: checked });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formulario);
    // Aquí puedes hacer el fetch al backend si deseas
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h1>Actualizar información</h1>

      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="apellido"
          value={formulario.apellido}
          onChange={manejarCambio}
        />
      </label>
      <label>
        <i>Deporte favorito:</i>
        <select name="deporte" value={formulario.deporte} onChange={manejarCambio}>
          <option value="">--Selecciona--</option>
          <option value="fútbol">Fútbol</option>
          <option value="básquetbol">Básquetbol</option>
          <option value="natación">Natación</option>
        </select>
      </label>

      <label>
        <i>Género:</i>
        <label><input type="radio" name="genero" value="masculino" onChange={manejarCambio} />masculino</label>
        <label><input type="radio" name="genero" value="femenino" onChange={manejarCambio} />femenino</label>
        <label><input type="radio" name="genero" value="prefiero no decirlo" onChange={manejarCambio} />prefiero no decirlo</label>
      </label>

      <label>
        <i>Estado:</i>
        <select name="estado" value={formulario.estado} onChange={manejarCambio}>
          <option value="">--Selecciona--</option>
          <option value="guatemala">Guatemala</option>
          <option value="jalapa">Jalapa</option>
          <option value="santa rosa">Santa Rosa</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          name="mayorEdad"
          checked={formulario.mayorEdad}
          onChange={manejarCambio}
        />
        Mayor de edad
      </label>

      <label>
        <i>Autos que posee:</i>
        <label><input type="checkbox" name="autos" value="Ford" onChange={manejarCambio} />Ford</label>
        <label><input type="checkbox" name="autos" value="Chrysler" onChange={manejarCambio} />Chrysler</label>
        <label><input type="checkbox" name="autos" value="Toyota" onChange={manejarCambio} />Toyota</label>
        <label><input type="checkbox" name="autos" value="Nissan" onChange={manejarCambio} />Nissan</label>
      </label>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default Formulario;
