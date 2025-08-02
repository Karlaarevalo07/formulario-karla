import { useState } from 'react'
import axios from 'axios'

function App() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/api/registro', {
        nombre,
        correo
      })
      setMensaje('✅ Registro enviado correctamente')
      setNombre('')
      setCorreo('')
    } catch (error) {
      setMensaje('❌ Error al enviar el registro')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Formulario de Registro</h2>
      <form onSubmit={enviarFormulario}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  )
}

export default App
