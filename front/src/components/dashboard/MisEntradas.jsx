import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function MisEntradas() {
    const { usuario } = useOutletContext();
    const [compras, setCompras] = useState([]);
    const [cargando, setCargando] = useState(true);


    const [paginaActual, setPaginaActual] = useState(1);
    const porPagina = 1; // Mostramos 4 compras por página

    useEffect(() => {
        if (usuario?.id) {
            fetch(`http://localhost:8080/compras/usuario/${usuario.id}`)
                .then(res => res.ok ? res.json() : Promise.reject("Error"))
                .then(data => {
                    setCompras(Array.isArray(data) ? data : []);
                    setCargando(false);
                })
                .catch(error => {
                    console.error(error);
                    setCargando(false);
                });
        }
    }, [usuario?.id]);


    const indiceUltimaCompra = paginaActual * porPagina;
    const indicePrimeraCompra = indiceUltimaCompra - porPagina;
    const comprasActuales = compras.slice(indicePrimeraCompra, indiceUltimaCompra);
    const totalPaginas = Math.ceil(compras.length / porPagina);

    const cambiarPagina = (numero) => setPaginaActual(numero);

    if (cargando) return <div className="dashboard_tarjeta"><h2>MIS ENTRADAS</h2><p>Cargando...</p></div>;
    if (compras.length === 0) return <div className="dashboard_tarjeta"><h2>MIS ENTRADAS</h2><p>No tienes compras.</p></div>;

    return (
        <div className="dashboard_entradas">
            <h2>MIS ENTRADAS</h2>

            <div className="compras_lista">
                {comprasActuales.map((compra) => (
                    <div key={compra.id} className="compra_caja">
                        <div className="compra_cabecera">
                            <div>
                                <p className="compra_id">Ref. Compra: #{compra.id}</p>
                                <p className="compra_fecha">
                                    Fecha: {new Date(compra.fechaCompra).toLocaleDateString()} a las {new Date(compra.fechaCompra).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="compra_total_cabecera">
                                <p>Total pagado:</p>
                                <h3>{compra.total}€</h3>
                            </div>
                        </div>

                        <div className="compra_detalles">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evento</th>
                                        <th>Entrada</th>
                                        <th>Cant.</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compra.detalles.map((detalle, index) => (
                                        <tr key={index}>
                                            <td><strong>{detalle.eventoNombre}</strong></td>
                                            <td>{detalle.tipoEntradaNombre}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>{detalle.precioUnitario}€</td>
                                            <td><strong>{detalle.precioUnitario * detalle.cantidad}€</strong></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

  
            {totalPaginas > 1 && (
                <div className="paginacion paginacion-cliente">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        &lt; Atrás
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button key={i + 1} onClick={() => cambiarPagina(i + 1)} className={paginaActual === i + 1 ? "activo" : ""}>
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        Siguiente &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default MisEntradas;