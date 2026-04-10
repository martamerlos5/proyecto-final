import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function CrearEvento() {

  const [localidades, setLocalidades] = useState([])
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("")
  const [nuevaLocalidad, setNuevaLocalidad] = useState("")

  const [categorias, setCategorias] = useState([])
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState("")


  useEffect(() => {
    fetch("http://localhost:8080/localidades")
      .then(res => res.json())
      .then(data => setLocalidades(data))
      .catch(error => console.error(error))

    fetch("http://localhost:8080/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(error => console.error(error))
  }, [])


  const crearLocalidad = () => {
    if (!nuevaLocalidad.trim()) return;

    fetch("http://localhost:8080/localidades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaLocalidad })
    })
      .then(res => res.json())
      .then(data => {
        setLocalidades([...localidades, data])
        setLocalidadSeleccionada(data.id)
        setNuevaLocalidad("")
        toast.success("Localidad creada")
      })
      .catch(() => toast.error("Error al crear localidad"))
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
        setCategorias([...categorias, data])
        setCategoriasSeleccionadas([...categoriasSeleccionadas, data.id])
        setNuevaCategoria("")
        toast.success("Categoría creada")
      })
      .catch(() => toast.error("Error al crear categoría"))
  }


  function procesa(ev) {
    ev.preventDefault()
    const file = ev.target.imagen.files[0]

    const datos = {
      nombre: ev.target.nombre.value,
      descripcion: ev.target.descripcion.value,
      fecha_inicio: ev.target.fecha_inicio.value,
      fecha_fin: ev.target.fecha_fin.value,
      hora_inicio: ev.target.hora_inicio.value,
      hora_fin: ev.target.hora_fin.value,
      localidadId: parseInt(localidadSeleccionada),
      lugar: ev.target.lugar.value,
      categoriasId: categoriasSeleccionadas,
      imagen: file ? file.name : null
    }

    const hoy = new Date().toISOString().split("T")[0]

    if (datos.fecha_inicio < hoy) {
      toast.error("La fecha de inicio no puede ser anterior a hoy")
      return
    }

    if (datos.fecha_fin < datos.fecha_inicio) {
      toast.error("La fecha de fin no puede ser anterior a la de fecha de inicio")
      return;
    }

    if (datos.fecha_inicio === datos.fecha_fin && datos.hora_fin < datos.hora_inicio) {
      toast.error("La hora de fin no puede ser anterior a la hora de inicio")
      return
    }

    fetch("http://localhost:8080/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(datos)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al crear el evento")
        return res.json()
      })
      .then(data => {
        console.log(data)
        toast.success("Evento creado correctamente")
      })
      .catch(error => {
        toast.error("Error al crear el evento")
        console.error(error)
      })
  }


  return (
    <section className="dashboard_seccion">
      <div className="registro_contenedor">

        <h2>CREAR EVENTO</h2>

        <form className="form_registro" onSubmit={procesa}>

          <div className="campo"><label>Nombre</label><input type="text" name="nombre" required /></div>
          <div className="campo"><label>Descripción</label><input type="text" name="descripcion" /></div>
          <div className="campo"><label>Fecha de inicio</label><input type="date" name="fecha_inicio" required /></div>
          <div className="campo"><label>Fecha de fin</label><input type="date" name="fecha_fin" required /></div>
          <div className="campo"><label>Hora de inicio</label><input type="time" name="hora_inicio" required /></div>
          <div className="campo"><label>Hora de fin</label><input type="time" name="hora_fin" required /></div>


          <div className="campo">
            <label>Localidad</label>
            <select name="localidad" value={localidadSeleccionada} onChange={(e) => setLocalidadSeleccionada(e.target.value)} required>
              <option value="">Localidad...</option>
              {localidades.map(localidad => (
                <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Crear nueva localidad</label>
            <div>
              <input type="text" value={nuevaLocalidad} onChange={(e) => setNuevaLocalidad(e.target.value)} placeholder="Nueva localidad..." />
              <Link onClick={crearLocalidad} className="link">Crear</Link>
            </div>
          </div>

          <div className="campo"><label>Lugar</label><input type="text" name="lugar" required /></div>


          <div className="campo">
            <label>Categorías</label>
            <div className="categorias_grid">
              {categorias.map(categoria => (
                <label key={categoria.id} className="categoria_item">
                  <input type="checkbox" value={categoria.id} checked={categoriasSeleccionadas.includes(categoria.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria.id])
                      } else {
                        setCategoriasSeleccionadas(categoriasSeleccionadas.filter(id => id !== categoria.id))
                      }
                    }}
                  />
                  {categoria.nombre}
                </label>
              ))}
            </div>
          </div>

          <div className="campo">
            <label>Crear nueva categoría</label>
            <div>
              <input type="text" value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} placeholder="Nueva categoría..." />
              <Link onClick={crearCategoria} className="link">Crear</Link>
            </div>
          </div>

          <div className="campo"><label>Imagen</label><input type="file" name="imagen" /></div>

          <button className="boton boton-dashboard boton_admin">Crear evento</button>
        </form>

        <Link to="/dashboard-admin/eventos">Volver atrás</Link>

      </div>
    </section>
  )
}

export default CrearEvento


