import { useEffect, useState } from "react";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import { useParams, useSearchParams, useLocation, Link } from "react-router-dom";

function Resultados() {
    const [eventos, setEventos] = useState([]);
    const [titulo, setTitulo] = useState("");

    const [searchParams] = useSearchParams();
    const consulta = searchParams.get("q");

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        let url = "";

        // búsqueda
        if (consulta) {
            url = `http://localhost:8080/eventos/resultados?nombre=${consulta}`;
            setTitulo(`Resultados de la búsqueda: ${consulta}`);
        }

        // 📂 CATEGORÍA
        else if (location.pathname.includes("categoria")) {
            url = `http://localhost:8080/eventos/categoria/${id}`;

            const categorias = {
                1: "Arte y cultura",
                2: "Deporte",
                3: "Música",
                5: "Gastronomía",
                7: "Para niños",
                8: "Para la tercera edad"
            };

            setTitulo(`Eventos de ${categorias[id] || "categoría"}`);
        }

        // localidad
        else if (location.pathname.includes("localidad")) {
            url = `http://localhost:8080/eventos/localidad/${id}`;

            fetch(url)
                .then(result => {
                    if (!result.ok) {
                        throw new Error("Error en la respuesta del servidor");
                    }
                    return result.json();
                })
                .then(data => {
                    const lista = Array.isArray(data) ? data : [];
                    setEventos(lista);

                    if (lista.length > 0) {
                        setTitulo(`Eventos en ${lista[0].localidadNombre}`);
                    } else {
                        setTitulo("Eventos en localidad");
                    }
                })
                .catch(error => console.error(error));

            return; // ⚠️ evita doble fetch
        } else {
            return;
        }

        // 🔄 FETCH GENERAL (búsqueda y categoría)
        fetch(url)
            .then(result => {
                if (!result.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                return result.json();
            })
            .then(data => {
                setEventos(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error(error));

    }, [consulta, id, location.pathname]);

    return (
        <div>
            <Header />

            <section className="eventos">
                <h2>{titulo}</h2>

                <div className="eventos_contenedor">
                    {eventos.length > 0 ? (
                        eventos.map(evento => (
                            <div className="evento_tarjeta" key={evento.id}>
                                <img src={`/${evento.imagen}`} alt={evento.nombre} />

                                <div className="evento_tarjeta_contenido">
                                    <h3>{evento.nombre}</h3>

                                    <br />
                                    <Link to={`/eventos/${evento.id}`}>
                                        <button className="boton">
                                            Ver evento
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay resultados</p>
                    )}
                </div>
            </section>

            <Newsletter />
            <Footer />
        </div>
    );
}

export default Resultados;