import { useState } from "react";
import axios from "axios";

const Formulario = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    deporte: "",
    genero: "",
    estado: "",
    mayorEdad: false,
    autos: {
      Ford: false,
      Chrysler: false,
      Toyota: false,
      Nissan: false,
    },
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (name.startsWith("autos.")) {
        const auto = name.split(".")[1];
        setDatos((prev) => ({
          ...prev,
          autos: {
            ...prev.autos,
            [auto]: isChecked,
          },
        }));
      } else {
        setDatos((prev) => ({
          ...prev,
          [name]: isChecked,
        }));
      }
    } else {
      setDatos((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/registro", datos);
      alert("Información enviada correctamente.");
    } catch (error) {
      alert("Error al enviar los datos.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Actualizar Información</h2>

      <label>
        <em>Nombre:</em>
        <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} />
      </label>
      <br />

      <label>
        <em>Apellido:</em>
        <input type="text" name="apellido" value={datos.apellido} onChange={manejarCambio} />
      </label>
      <br />

      <label>
        <em>Deporte favorito:</em>
        <select name="deporte" value={datos.deporte} onChange={manejarCambio}>
          <option value="">--Selecciona--</option>
          <option value="futbol">Fútbol</option>
          <option value="basketball">Basketball</option>
          <option value="tenis">Tenis</option>
        </select>
      </label>
      <br />

      <label>
        <em>Género:</em>
        <input type="radio" name="genero" value="masculino" onChange={manejarCambio} /> masculino
        <input type="radio" name="genero" value="femenino" onChange={manejarCambio} /> femenino
        <input type="radio" name="genero" value="no_sabe" onChange={manejarCambio} /> no sabe
      </label>
      <br />

      <label>
        <em>Estado:</em>
        <select name="estado" value={datos.estado} onChange={manejarCambio}>
          <option value="">--Selecciona--</option>
          <option value="guatemala">Guatemala</option>
          <option value="sacatepequez">Sacatepéquez</option>
          <option value="chimaltenango">Chimaltenango</option>
        </select>
      </label>
      <br />

      <label>
        <input type="checkbox" name="mayorEdad" checked={datos.mayorEdad} onChange={manejarCambio} />
        Mayor de edad
      </label>
      <br />

      <label>
        <em>Autos que posee:</em>
        <input
          type="checkbox"
          name="autos.Ford"
          checked={datos.autos.Ford}
          onChange={manejarCambio}
        />
        Ford
        <input
          type="checkbox"
          name="autos.Chrysler"
          checked={datos.autos.Chrysler}
          onChange={manejarCambio}
        />
        Chrysler
        <input
          type="checkbox"
          name="autos.Toyota"
          checked={datos.autos.Toyota}
          onChange={manejarCambio}
        />
        Toyota
        <input
          type="checkbox"
          name="autos.Nissan"
          checked={datos.autos.Nissan}
          onChange={manejarCambio}
        />
        Nissan
      </label>
      <br />

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default Formulario;
