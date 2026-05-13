import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [materiales, setMateriales] = useState([]);

  const [formulario, setFormulario] = useState({
    clave: '',
    nombre: '',
    categoria: '',
    cantidadDisponible: '',
    ubicacion: '',
    estado: ''
  });

  const obtenerMateriales = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/materiales');
      const datos = await respuesta.json();
      setMateriales(datos);
    } catch (error) {
      console.error('Error al obtener materiales:', error);
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarMaterial = async (e) => {
    e.preventDefault();

    const nuevoMaterial = {
      clave: Number(formulario.clave),
      nombre: formulario.nombre,
      categoria: formulario.categoria,
      cantidadDisponible: Number(formulario.cantidadDisponible),
      ubicacion: formulario.ubicacion,
      estado: formulario.estado
    };

    try {
      await fetch('http://localhost:3000/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoMaterial)
      });

      setFormulario({
        clave: '',
        nombre: '',
        categoria: '',
        cantidadDisponible: '',
        ubicacion: '',
        estado: ''
      });

      obtenerMateriales();
    } catch (error) {
      console.error('Error al guardar material:', error);
    }
  };

  useEffect(() => {
    obtenerMateriales();
  }, []);

const eliminarMaterial = async (clave) => {
  try {
    await fetch(`http://localhost:3000/materiales/${clave}`, {
      method: 'DELETE'
    });

    obtenerMateriales();
  } catch (error) {
    console.error('Error al eliminar material:', error);
  }
};

  return (
    <div className="contenedor">
      <h1>Registro de Materiales</h1>
      <p>Frontend en React conectado al backend con MongoDB Atlas.</p>

      <form onSubmit={guardarMaterial} className="formulario">
        <input
          type="number"
          name="clave"
          placeholder="Clave"
          value={formulario.clave}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formulario.categoria}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="cantidadDisponible"
          placeholder="Cantidad disponible"
          value={formulario.cantidadDisponible}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formulario.ubicacion}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formulario.estado}
          onChange={manejarCambio}
          required
        />

        <button type="submit">Guardar material</button>
      </form>

      <h2>Materiales registrados</h2>

      <div className="lista">
        {materiales.length === 0 ? (
          <p>No hay materiales registrados.</p>
        ) : (
          materiales.map((material) => (
            <div className="tarjeta" key={material._id}>
              <h3>{material.nombre}</h3>
              <p><strong>Clave:</strong> {material.clave}</p>
              <p><strong>Categoría:</strong> {material.categoria}</p>
              <p><strong>Cantidad:</strong> {material.cantidadDisponible}</p>
              <p><strong>Ubicación:</strong> {material.ubicacion}</p>
              <p><strong>Estado:</strong> {material.estado}</p>
              <button onClick={() => eliminarMaterial(material.clave)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;