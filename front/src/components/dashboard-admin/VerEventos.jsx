import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function VerEventos() {
    const [eventos, setEventos] = useState([])

    // para la paginación
    const [paginaActual, setPaginaActual] = useState(1)
    const eventosPorPagina = 4

    useEffect(() => {
        fetch("http://localhost:8080/eventos")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al obtener eventos")
                }
                return res.json()
            })
            .then(data => {
                setEventos(Array.isArray(data) ? data : [])
            })
            .catch(err => console.error(err))
    }, [])

    function eliminar(id) {
        const confirmar = window.confirm("¿Eliminar este evento?")

        if (!confirmar) {
            return;
        }

        fetch(`http://localhost:8080/eventos/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al eliminar")
                }
                // Quitamos el res.json() porque el backend devuelve un vacío (No Content)
                setEventos(prevEventos =>
                    prevEventos.filter(evento => evento.id !== id)
                )

                // Si borramos el último elemento de una página, retrocedemos
                const totalRestante = eventos.length - 1
                const paginasRestantes = Math.ceil(totalRestante / eventosPorPagina)
                if (paginaActual > paginasRestantes && paginasRestantes > 0) {
                    setPaginaActual(paginasRestantes)
                }
            })
            .catch(err => console.error(err))
    }

    // lógica de paginación
    const indiceUltimoEvento = paginaActual * eventosPorPagina
    const indicePrimerEvento = indiceUltimoEvento - eventosPorPagina
    const eventosActuales = eventos.slice(indicePrimerEvento, indiceUltimoEvento)
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina)

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }

    return (
        <div>
            <h3 className="crear-evento">
                <Link to="crear">CREAR EVENTO</Link>
            </h3>

            <div className="registro_contenedor_centrado">
                <h2>EVENTOS</h2>

                <div className="lista-eventos">
                    {eventosActuales.map(evento => (
                        <div className="evento-item" key={evento.id}>
                            <span>{evento.nombre}</span>

                            <div className="acciones">
                                <Link to={`editar/${evento.id}`} className="material-symbols-outlined icono-dashboard">edit</Link>

                                <Link to={`editar/${evento.id}/entradas/ver`} className="material-symbols-outlined icono-dashboard">
                                    local_activity
                                </Link>



                                <button onClick={() => eliminar(evento.id)} className="material-symbols-outlined icono-dashboard icono-eliminar">delete</button>
                            </div>
                        </div>
                    ))}

                    {eventos.length === 0 && <p style={{ textAlign: "center" }}>No hay eventos disponibles.</p>}
                </div>

                {/* paginación */}
                {totalPaginas > 1 && (
                    <div className="paginacion">

                        <button onClick={() => cambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}>
                            &lt; Atrás
                        </button>

                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button key={index + 1} onClick={() => cambiarPagina(index + 1)}
                                className={paginaActual === index + 1 ? "activo" : ""}>
                                {index + 1}
                            </button>
                        ))}


                        <button onClick={() => cambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}>
                            Siguiente &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerEventos