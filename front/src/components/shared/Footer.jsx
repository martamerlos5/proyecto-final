import { Link, useLocation } from "react-router-dom";

function Footer() {

    // para los estilos de administrador (y no crear componentes nuevos)
    const location = useLocation();

    const rutasAdmins = location.pathname.startsWith('/login-admin') || location.pathname.startsWith('/dashboard-admin') || location.pathname.startsWith('/registro-admin');

    return (
        <div>
            <footer className={rutasAdmins ? "estilos-admin" : ""}>
                <div>
                    <h3>Síguenos</h3>
                    <div className="redes">
                        <a href="https://www.instagram.com/cultu.activa/" target="_blank" rel="noopener noreferrer">
                            <span className="fa7-brands--instagram rrss"></span>
                        </a>

                        <a href="https://www.facebook.com/profile.php?id=61584513861052" target="_blank" rel="noopener noreferrer">
                            <span className="fa7-brands--facebook rrss"></span>
                        </a>

                        <a href="https://www.tiktok.com/@culturaactiva8?_r=1&_t=ZN-91j5nS3gR2E" target="_blank" rel="noopener noreferrer">
                            <span className="fa7-brands--tiktok rrss"></span>
                        </a>

                        <a href="https://x.com/CulturaActiva_1" target="_blank" rel="noopener noreferrer" >
                            <span className="fa7-brands--x-twitter rrss"></span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3>Sobre Nosotros</h3>
                    <Link to="/#sobrenosotros" className="links">Quiénes somos</Link>
                    <Link to="/#ubicacion" className="links">Dónde estamos</Link>
                    <Link to="/contacto" className="links">Contacto</Link>
                    <Link to="/politica-privacidad" className="links">Política de privacidad</Link>
                    <Link to="/terminos-condiciones" className="links">Términos y condiciones</Link>
                </div>

                <div>
                    <h3>Descubre</h3>
                    <Link to="/eventos" className="links">Eventos</Link>
                </div>

                <div>
                    <h3>Comunidad</h3>
                    <Link to="/" className="links">Newsletter</Link>
                </div>
            </footer>
        </div >
    );
}

export default Footer;
