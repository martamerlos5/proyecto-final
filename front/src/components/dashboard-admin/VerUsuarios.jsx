import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function VerUsuarios() {
    const [usuarios, setUsuarios] = useState([])

    // para la paginación
    const [paginaActual, setPaginaActual] = useState(1)
    const porPagina = 4

    useEffect(() => {
        fetch("http://localhost:8000/api/dashboard-admin/usuarios")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al obtener usuarios")
                }
                return res.json()
            })
            .then(data => {
                setUsuarios(Array.isArray(data) ? data : [])
            })
            .catch(err => console.error(err))
    }, [])

    function eliminar(id) {
        const confirmar = window.confirm("¿Eliminar este usuario?")

        if (!confirmar) {
            return;
        }

        fetch(`http://localhost:8000/api/usuario/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al eliminar")
                }
          
                setUsuarios(prevUsuarios =>
                    prevUsuarios.filter(usuario => usuario.id !== id)
                )

                // si se borra el último elemento de una página -> se elimina esa página
                const totalRestante = usuarios.length - 1
                const paginasRestantes = Math.ceil(totalRestante / porPagina)
                if (paginaActual > paginasRestantes && paginasRestantes > 0) {
                    setPaginaActual(paginasRestantes)
                }
            })
            .catch(err => console.error(err))
    }

    // lógica de paginación
    const indiceUltimoUsuario = paginaActual * porPagina
    const indicePrimerUsuario = indiceUltimoUsuario - porPagina
    const usuariosActuales = usuarios.slice(indicePrimerUsuario, indiceUltimoUsuario)
    const totalPaginas = Math.ceil(usuarios.length / porPagina)

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }

    return (
        <div>
            {/* <h3 className="crear-evento">
                <Link to="crear">CREAR EVENTO</Link>
            </h3> */}

            <div className="registro_contenedor_centrado">
                <h2>CLIENTES REGISTRADOS</h2>

                <div className="lista-eventos">
                    {usuariosActuales.map(usuario => (
                        <div className="evento-item" key={usuario.id}>
                            <span>{usuario.nombre} | {usuario.email}</span>

                            <div className="acciones">
                               

                                <button onClick={() => eliminar(usuario.id)} className="material-symbols-outlined icono-dashboard icono-eliminar">delete</button>
                            </div>
                        </div>
                    ))}

                    {usuarios.length === 0 && <p style={{ textAlign: "center" }}>No hay usuarios disponibles.</p>}
                </div>

                {/* paginación */}
                {totalPaginas > 1 && (
                    <div className="paginacion">
 
                        <button onClick={() => cambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}>
                            &lt; Atrás
                        </button>

                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button key={index + 1}
                                onClick={() => cambiarPagina(index + 1)}
                                className={paginaActual === index + 1 ? "activo" : ""}>
                                {index + 1}
                            </button>
                        ))}

                        
                        <button
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}>
                            Siguiente &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerUsuarios