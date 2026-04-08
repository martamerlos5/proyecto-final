import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import Menu from "./Menu";

function Header() {
    // scrolled indica si el usuario ha hecho scroll . parte de false porque al cargar la página aún no se ha hecho scroll
    const [scrolled, setScrolled] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");

    // para los colores de administrador y así no crear componentes nuevos
    const location = useLocation();
    const rutasAdmins = location.pathname.startsWith('/login-admin') || location.pathname.startsWith('/dashboard-admin') || location.pathname.startsWith('/registro-admin');


    useEffect(() => {
        // función que se ejecuta cada vez que se haga scroll en la página
        const controlScroll = () => {
            if (window.scrollY > 200) { // distancia en píxeles en vertical de scroll
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", controlScroll); // cada vez que se haga scroll, se ejecuta la función anterior
        return () => window.removeEventListener("scroll", controlScroll);
    }, []); // solo se ejecuta una vez

    let elemento;

    if (scrolled) { // si se hace scroll, el elemento es la imagen. Si no, el nombre
        elemento = <Link to="/"> <img src={logo} alt="Logo" className="logo" /> </Link>
    } else {
        elemento = <Link className="nombre" to="/">CULTURAACTIVA</Link>;
    }

    // se crea una clase nueva para el buscador. Si se hace scroll entonces se le añade la clase 'buscador-grande'
    let buscadorClase = "buscador";
    if (scrolled) {
        buscadorClase += " buscador-grande";
    }

    const manejarBusqueda = (e) => {
        if (e.key === "Enter" && busqueda.trim() !== "") {
            navigate(`/resultados?q=${busqueda}`);
            // navigate(`/resultados`)
        }
    };

    const buscar = () => {
        if (busqueda.trim() !== "") {
            navigate(`/resultados?q=${busqueda}`);
            // navigate(`/resultados`)
        }
    };


    // para la ruta a '/dashboard' según sea cliente o administrador. Se coge el usuario de localStorage (una vez esté logueado)
    const usuario = localStorage.getItem("usuario")
    let user = null
    if (usuario) {
        try {
            user = JSON.parse(usuario)
        } catch {
            user = null
        }
    }

    let rutaLogin = "/login"
    if (user) {
        if (user.rol == "Cliente") {
            rutaLogin = "/dashboard"
        } else if (user.rol == "Administrador") {
            rutaLogin = "/dashboard-admin"
        }
    }


    return (
        <div>
            <header className={`${scrolled ? "scrolled" : ""} ${rutasAdmins ? "estilos-admin" : ""}`}>

                <div className="header_izquierda">
                    {/* se abre el menú lateral al hacer click */}
                    <span className="material-symbols-outlined menu-icon" onClick={() => setMenuOpen(true)}> menu </span> {elemento}
                </div>

                <div className="iconos">
                    <div className="search_contenedor">
                        <span className="material-symbols-outlined search-icon" onClick={buscar}>search</span>
                        <input className={buscadorClase} type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyDown={manejarBusqueda} />
                    </div>

                    <Link to="/cesta">
                        <span className="material-symbols-outlined icon">shopping_bag</span>
                    </Link>

                    {/* en vez de apuntar a login, apunta directamente a dashboard. Con las rutas protegidas redirige a login si no hay usuario logueado */}
                    <Link to={rutaLogin}>
                        <span className="material-symbols-outlined icon">account_circle</span>
                    </Link>
                </div>
            </header>
            <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>

    );
}

export default Header;
