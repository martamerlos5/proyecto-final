import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function VerEntradas() {
    const { id } = useParams();

    const [entradas, setEntradas] = useState([]);

    const [paginaActual, setPaginaActual] = useState(1);
    const entradasPorPagina = 4;

    useEffect(() => {
        fetch(`http://localhost:8080/tipos-entrada/evento/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener entradas");
                return res.json();
            })
            .then(data => setEntradas(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, [id]);

    function eliminar(idEntrada) {
        if (!window.confirm("¿Eliminar esta entrada?")) return;

        fetch(`http://localhost:8080/tipos-entrada/detalle/${idEntrada}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar");

                setEntradas(prev => prev.filter(e => e.id !== idEntrada));
            })
            .catch(err => console.error(err));
    }

    const indiceUltimo = paginaActual * entradasPorPagina;
    const indicePrimero = indiceUltimo - entradasPorPagina;
    const entradasActuales = entradas.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(entradas.length / entradasPorPagina);

    return (
        <div className="registro_contenedor_centrado">

            <h3 className="crear-evento">
                <Link to="crear">CREAR NUEVA ENTRADA</Link>
            </h3>

            <h2>ENTRADAS DEL EVENTO</h2>

            <div className="lista-eventos">
                {entradasActuales.map(entrada => (
                    <div className="evento-item" key={entrada.id}>
                        <span>
                            {entrada.nombre} - {entrada.precio}€
                        </span>

                        <div className="acciones">
                            <Link
                                to={`editar/${entrada.id}`}
                                className="material-symbols-outlined icono-dashboard"
                            >
                                edit
                            </Link>

                            <button
                                onClick={() => eliminar(entrada.id)}
                                className="material-symbols-outlined icono-dashboard icono-eliminar"
                            >
                                delete
                            </button>
                        </div>
                    </div>
                ))}

                {entradas.length === 0 && (
                    <p style={{ textAlign: "center" }}>
                        No hay entradas para este evento.
                    </p>
                )}
            </div>

            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1}>
                        &lt; Atrás
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPaginaActual(i + 1)}
                            className={paginaActual === i + 1 ? "activo" : ""}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        Siguiente &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default VerEntradas;