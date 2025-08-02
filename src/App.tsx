// App.tsx
import React, { useState } from 'react';
import './App.css';

const Formulario = () => {
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
    const { name, value, type } = e.target as HTMLInputElement;
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
    console.log('Formulario enviado:', formulario);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Actualizar información</h2>

      <label>Nombre:</label>
      <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} /><br />

      <label>Apellido:</label>
      <input type="text" name="apellido" value={formulario.apellido} onChange={manejarCambio} /><br />

      <label><em>Deporte favorito:</em></label>
      <select name="deporte" value={formulario.deporte} onChange={manejarCambio}>
        <option value="">--Selecciona--</option>
        <option value="futbol">Fútbol</option>
        <option value="basket">Basket</option>
        <option value="natacion">Natación</option>
      </select><br />

      <label><em>Género:</em></label>
      <div className="grupo-opciones">
        <label><input type="radio" name="genero" value="masculino" onChange={manejarCambio} />masculino</label>
        <label><input type="radio" name="genero" value="femenino" onChange={manejarCambio} />femenino</label>
        <label><input type="radio" name="genero" value="otro" onChange={manejarCambio} />Prefiero no decirlo</label>
      </div>

      <label><em>Estado:</em></label>
      <select name="estado" value={formulario.estado} onChange={manejarCambio}>
        <option value="">--Selecciona--</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Quetzaltenango">Quetzaltenango</option>
        <option value="Petén">Petén</option>
      </select><br />

      <label>
        <input type="checkbox" name="mayorEdad" checked={formulario.mayorEdad} onChange={manejarCambio} />
        Mayor de edad
      </label><br />

      <label><em>Autos que posee:</em></label>
      <div className="grupo-opciones">
        <label><input type="checkbox" name="autos" value="Vado" onChange={manejarCambio} />Vado</label>
        <label><input type="checkbox" name="autos" value="Chrysler" onChange={manejarCambio} />Chrysler</label>
        <label><input type="checkbox" name="autos" value="Toyota" onChange={manejarCambio} />Toyota</label>
        <label><input type="checkbox" name="autos" value="Nissan" onChange={manejarCambio} />Nissan</label>
      </div>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default Formulario;
