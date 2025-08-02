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
    const checked = type === 'checkbox' && 'checked' in e.target ? e.target.checked : undefined;

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

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3001/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });

      if (!respuesta.ok) {
        throw new Error('Error al guardar los datos');
      }

      const resultado = await respuesta.json();
      alert(resultado.mensaje);

      // Limpia el formulario
      setFormulario({
        nombre: '',
        apellido: '',
        deporte: '',
        genero: '',
        estado: '',
        mayorEdad: false,
        autos: [],
      });
    } catch (error) {
      alert('❌ Hubo un error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h1>Actualizar información</h1>

      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={formulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label>Apellido:</label>
      <input
        type="text"
        name="apellido"
        value={formulario.apellido}
        onChange={manejarCambio}
        required
      />

      <label>Deporte favorito:</label>
      <select name="deporte" value={formulario.deporte} onChange={manejarCambio} required>
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
            value="Masculino"
            checked={formulario.genero === 'Masculino'}
            onChange={manejarCambio}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="Femenino"
            checked={formulario.genero === 'Femenino'}
            onChange={manejarCambio}
          />
          Femenino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="No decirlo"
            checked={formulario.genero === 'No decirlo'}
            onChange={manejarCambio}
          />
          Prefiero no decirlo
        </label>
      </div>

      <label>Estado:</label>
      <select name="estado" value={formulario.estado} onChange={manejarCambio} required>
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
        {['Mazda', 'Mitsubishi', 'Toyota', 'Nissan'].map((marca) => (
          <label key={marca}>
            <input
              type="checkbox"
              name="autos"
              value={marca}
              checked={formulario.autos.includes(marca)}
              onChange={manejarCambio}
            />
            {marca}
          </label>
        ))}
      </div>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default Formulario;
