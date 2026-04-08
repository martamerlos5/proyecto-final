import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditarEvento() {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);

  const [localidades, setLocalidades] = useState([]);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");
  const [nuevaLocalidad, setNuevaLocalidad] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  // --- Cargar evento, localidades y categorías ---
  useEffect(() => {
    fetch(`http://localhost:8080/eventos/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvento(data);
        setCategoriasSeleccionadas(data.categoriasId || []);
        setLocalidadSeleccionada(data.localidadId);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/localidades")
      .then(res => res.json())
      .then(setLocalidades)
      .catch(console.error);

    fetch("http://localhost:8080/categorias")
      .then(res => res.json())
      .then(setCategorias)
      .catch(console.error);
  }, []);


  const crearLocalidad = () => {
    if (!nuevaLocalidad.trim()) return;

    fetch("http://localhost:8080/localidades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaLocalidad })
    })
      .then(res => res.json())
      .then(data => {
        setLocalidades([...localidades, data]);
        setLocalidadSeleccionada(data.id);
        setNuevaLocalidad("");
        alert("Localidad creada");
      })
      .catch(() => alert("Error al crear localidad"));
  }

  const crearCategoria = () => {
    if (!nuevaCategoria.trim()) return;

    fetch("http://localhost:8080/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaCategoria })
    })
      .then(res => res.json())
      .then(data => {
        setCategorias([...categorias, data]);
        setCategoriasSeleccionadas([...categoriasSeleccionadas, data.id]);
        setNuevaCategoria("");
        alert("Categoría creada");
      })
      .catch(() => alert("Error al crear categoría"));
  }


  const procesa = (ev) => {
    ev.preventDefault();
    const file = ev.target.imagen.files[0];

    const datos = {
      nombre: ev.target.nombre.value || evento.nombre,
      descripcion: ev.target.descripcion.value || evento.descripcion,
      fecha_inicio: ev.target.fecha_inicio.value || evento.fecha_inicio,
      fecha_fin: ev.target.fecha_fin.value || evento.fecha_fin,
      hora_inicio: ev.target.hora_inicio.value || evento.hora_inicio,
      hora_fin: ev.target.hora_fin.value || evento.hora_fin,
      localidadId: parseInt(localidadSeleccionada),
      lugar: ev.target.lugar.value || evento.lugar,
      categoriasId: categoriasSeleccionadas,
      estado: ev.target.estado.value || evento.estado,
      imagen: file ? file.name : evento.imagen
    };

    fetch(`http://localhost:8080/eventos/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
    })
      .then(res => res.json())
      .then(() => alert("Evento actualizado correctamente"))
      .catch(() => alert("Error al actualizar"));
  }

  if (!evento) return <p>Cargando evento...</p>;

  return (
    <section className="dashboard_seccion">
      <div className="registro_contenedor">
        <h2>EDITAR EVENTO</h2>

        <form className="form_registro" onSubmit={procesa}>


          <div className="campo"><label>Nombre</label><input type="text" name="nombre" defaultValue={evento.nombre} /></div>
          <div className="campo"><label>Descripción</label><input type="text" name="descripcion" defaultValue={evento.descripcion} /></div>
          <div className="campo"><label>Fecha de inicio</label><input type="date" name="fecha_inicio" defaultValue={evento.fecha_inicio} /></div>
          <div className="campo"><label>Fecha de fin</label><input type="date" name="fecha_fin" defaultValue={evento.fecha_fin} /></div>
          <div className="campo"><label>Hora de inicio</label><input type="time" name="hora_inicio" defaultValue={evento.hora_inicio} /></div>
          <div className="campo"><label>Hora de fin</label><input type="time" name="hora_fin" defaultValue={evento.hora_fin} /></div>

          <div className="campo">
            <label>Localidad</label>
            <select value={localidadSeleccionada} onChange={e => setLocalidadSeleccionada(e.target.value)}>
              {localidades.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
            </select>
          </div>

          <div className="campo">
            <label>Crear nueva localidad </label>
            <div>
              <input type="text" value={nuevaLocalidad} onChange={e => setNuevaLocalidad(e.target.value)} placeholder="Nueva localidad..." />
              <Link onClick={crearLocalidad} className="link">Crear</Link>
            </div>
          </div>

          <div className="campo"><label>Lugar</label><input type="text" name="lugar" defaultValue={evento.lugar} /></div>

          <div className="campo">
            <label>Categorías</label>
            <div className="categorias_grid">
              {categorias.map(c => (
                <label key={c.id}>
                  <input type="checkbox" checked={categoriasSeleccionadas.includes(c.id)} onChange={e => {
                    if (e.target.checked) {
                      setCategoriasSeleccionadas([...categoriasSeleccionadas, c.id])
                    } else {
                      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(id => id !== c.id))
                    }
                  }}
                  />
                  {c.nombre}
                </label>
              ))}
            </div>
          </div>

          <div className="campo">
            <label>Crear nueva categoría</label>
            <div>
              <input type="text" value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)} placeholder="Nueva categoría..." />
              <Link onClick={crearCategoria} className="link">Crear</Link>
            </div>
          </div>

          <div className="campo">
            <label>Estado</label>
            <select name="estado" defaultValue={evento.estado}>
              <option value="Activo">Activo</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div className="campo">
            <label>Cambiar imagen</label>
            <input type="file" name="imagen" />
          </div>

          <button className="boton boton-dashboard boton_admin">Guardar cambios</button>
        </form>

        <Link to="/dashboard-admin/eventos">Volver atrás</Link>
      </div>
    </section>
  );
}

export default EditarEvento;