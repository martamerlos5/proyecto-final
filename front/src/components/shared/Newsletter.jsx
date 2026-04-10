import { useLocation } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Newsletter() {

    const location = useLocation()
    const rutasAdmins = location.pathname == '/login-admin' || location.pathname == '/dashboard-admin'


    function procesa(ev) {
        ev.preventDefault();

        let email = ev.target.email.value;

        fetch(`http://localhost:8000/api/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(response => {
                // Si la respuesta no es 200-299 (ej: 404 o 422 si el email ya existe)
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                toast.success("¡Ya formas parte de nuestra familia!");
                ev.target.reset();
            })
            .catch(error => {
                if (error.errors && error.errors.email) {
                    toast.error("Este email ya está suscrito");
                } else {
                    console.error("Error técnico:", error);
                    toast.error("No se pudo conectar con el servidor");
                }
            });
    }

    return (
        <section className="newsletter" id="newsletter">

            <div className="newsletter_contenedor">
                <h2>Newsletter</h2>
                <p>
                    Suscríbete a nuestra newsletter para recibir los nuevos eventos, descuentos y promociones antes que nadie.
                </p>

                <form onSubmit={procesa}>
                    <input type="email" placeholder="Email" name="email" required />
                    <button type="submit" className={`boton ${rutasAdmins ? "estilos-admin" : ""}`}> Suscríbete ahora </button>
                </form>

                <div className="condiciones">
                    Podrás darte de baja cuando quieras. 10% de descuento en la primera compra.
                </div>
            </div>

        </section>
    );
}

export default Newsletter;