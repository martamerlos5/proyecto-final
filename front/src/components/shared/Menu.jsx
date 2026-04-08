import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu({ isOpen, onClose }) {

    let claseMenu = "menu";

    // si el menú está abierto entonces se aplican esas clases en la hoja de estilos
    if (isOpen === true) {
        claseMenu = "menu menu-open";
    }


    const location = useLocation();
    const rutasAdmins = location.pathname.startsWith('/login-admin') || location.pathname.startsWith('/dashboard-admin') || location.pathname.startsWith('/registro-admin');


    if (rutasAdmins) {
        claseMenu += " estilos-admin";
    }


    // /eventos/ultimos
    const [eventos, setEventos] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/eventos/ultimos")
            .then(result => {
                if (!result.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                return result.json();
            })
            .then(data => {
                console.log(data)
                setEventos(Array.isArray(data) ? data : [])
            })
            .catch(error => console.error(error))
    }, [])

    const [localidades, setLocalidades] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/localidades")
            .then(result => {
                if (!result.ok) {
                    throw new Error("Error al cargar localidades");
                }
                return result.json();
            })
            .then(data => {
                setLocalidades(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error(error));
    }, []);



    return (
        <div className={claseMenu}>
            <div className="menu-header">
                <span className="material-symbols-outlined close-icon" onClick={onClose}> close </span>
            </div>

            <nav className="menu-nav">
                {/* <h3>Explora todos los eventos</h3>
                <Link to="/eventos" onClick={onClose}>Ver todos los eventos</Link><br /> */}

                <h3>Explora eventos por categoría</h3>

                <Link to="/eventos/categoria/2" onClick={onClose}>Deporte</Link>
                <Link to="/eventos/categoria/3" onClick={onClose}>Música</Link>
                <Link to="/eventos/categoria/1" onClick={onClose}>Arte y cultura</Link>
                <Link to="/eventos/categoria/5" onClick={onClose}>Gastronomía</Link>
                <Link to="/eventos/categoria/7" onClick={onClose}>Para niños</Link>
                <Link to="/eventos/categoria/8" onClick={onClose}>Para la tercera edad</Link><br />

                <h3> Explora eventos por ciudad </h3>
                {localidades.map(localidad => (
                    <Link
                        key={localidad.id}
                        to={`/eventos/localidad/${localidad.id}`}
                        onClick={onClose}>
                        {localidad.nombre}
                    </Link>
                ))}


                <br />
                <h3>Últimos eventos añadidos</h3>
                {eventos.map(evento =>
                    (<Link key={evento.id} to={`/eventos/${evento.id}`} onClick={onClose}>{evento.nombre}</Link>))}



                {/* <Link to="/eventos/archena-fc" onClick={onClose}>Archena FC – UD Caravaca</Link>
                <Link to="/eventos/cortometrajes" onClick={onClose}>Certamen de cortometrajes</Link>
                <Link to="/eventos/taller-escritura" onClick={onClose}>Taller de escritura creativa</Link> */}
            </nav>
        </div>
    );
}

export default Menu;