import { useState } from 'react';
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
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' && 'checked' in e.target ? e.target.checked : undefined;

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
    console.log(formulario); // Aquí iría la llamada al backend
    alert('Datos enviados');
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h1>Actualizar información</h1>

      <label>Nombre:</label>
      <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} />

      <label>Apellido:</label>
      <input type="text" name="apellido" value={formulario.apellido} onChange={manejarCambio} />

      <label>Deporte favorito:</label>
      <select name="deporte" value={formulario.deporte} onChange={manejarCambio}>
        <option value="">--Selecciona--</option>
        <option value="fútbol">Fútbol</option>
        <option value="baloncesto">Baloncesto</option>
        <option value="tenis">Tenis</option>
      </select>

      <label>Género:</label>
      <div className="linea-opciones">
        <label>
          <input
            type="radio"
            name="genero"
            value="masculino"
            checked={formulario.genero === 'masculino'}
            onChange={manejarCambio}
          />
          masculino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="femenino"
            checked={formulario.genero === 'femenino'}
            onChange={manejarCambio}
          />
          femenino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="no decirlo"
            checked={formulario.genero === 'no decirlo'}
            onChange={manejarCambio}
          />
          Prefiero no decirlo
        </label>
      </div>

      <label>Estado:</label>
      <select name="estado" value={formulario.estado} onChange={manejarCambio}>
        <option value="">--Selecciona--</option>
        <option value="guatemala">Guatemala</option>
        <option value="jalapa">Jalapa</option>
        <option value="quiché">Quiché</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="mayorEdad"
          checked={formulario.mayorEdad}
          onChange={manejarCambio}
        />
        Mayor de edad
      </label>

      <label>Autos que posee:</label>
      <div className="linea-opciones">
        <label>
          <input
            type="checkbox"
            name="autos"
            value="Vado"
            checked={formulario.autos.includes('Vado')}
            onChange={manejarCambio}
          />
          Vado
        </label>
        <label>
          <input
            type="checkbox"
            name="autos"
            value="Chrysler"
            checked={formulario.autos.includes('Chrysler')}
            onChange={manejarCambio}
          />
          Chrysler
        </label>
        <label>
          <input
            type="checkbox"
            name="autos"
            value="Toyota"
            checked={formulario.autos.includes('Toyota')}
            onChange={manejarCambio}
          />
          Toyota
        </label>
        <label>
          <input
            type="checkbox"
            name="autos"
            value="Nissan"
            checked={formulario.autos.includes('Nissan')}
            onChange={manejarCambio}
          />
          Nissan
        </label>
      </div>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default Formulario;
