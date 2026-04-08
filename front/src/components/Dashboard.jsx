import { NavLink, Outlet, useNavigate } from "react-router-dom"
import Footer from "./shared/Footer"
import Header from "./shared/Header"

// en el dashboard del admin es donde se crearían funciones para añadir eventos, editarlos, eliminarlos...
function Dashboard() {
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));


    const cerrarSesion = () => {
        fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(respuesta => respuesta.json())
            .then(response => {
                console.log(response);
                // borrar localStorage
                localStorage.removeItem("usuario");
                navigate("/");
            })
            .catch(error => {
                console.error("Error cerrando sesión:", error);
            });
    }



    return (
        <div>
            <Header />
            <div className="dashboard_contenedor">

                <aside className="dashboard_aside">
                    <NavLink to="/dashboard">Editar datos personales</NavLink>
                    <NavLink to="/dashboard/direccion">Editar dirección</NavLink>
                    <NavLink to="/dashboard/password">Cambiar contraseña</NavLink>
                    <NavLink to="/dashboard/entradas">Mis Entradas</NavLink>
                    <NavLink to="/dashboard/cupones">Mis Cupones</NavLink>
                    <NavLink to="/dashboard/eliminar">Eliminar cuenta</NavLink>
                </aside>


                <section className="dashboard_caja">

                    <button className="cerrar_sesion" onClick={cerrarSesion}>Cerrar Sesión</button>


                    {/* Outlet sirve para pasar un contexto a sus rutas hija (useOutletContext()) */}
                    <Outlet context={{ usuario }} />
                </section>

            </div>


            <Footer />
        </div>
    )
}

export default Dashboard