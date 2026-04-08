import { NavLink, Outlet, useNavigate } from "react-router-dom"
import Footer from "./shared/Footer"
import Header from "./shared/Header"

// en el dashboard del admin es donde se crearían funciones para añadir eventos, editarlos, eliminarlos...
function DashboardAdmin() {
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
            <div className="dashboard_contenedor ">

                <aside className="dashboard_aside estilos-admin-claro">
                    <NavLink to="/dashboard-admin">Editar perfil</NavLink>
                    <NavLink to="/dashboard-admin/direccion">Editar dirección</NavLink>
                    <NavLink to="/dashboard-admin/eventos">Ver Eventos</NavLink>
                    <NavLink to="/dashboard-admin/estadisticas">Ver Estadísticas</NavLink>
                    <NavLink to="/dashboard-admin/usuarios">Ver Usuarios</NavLink>
                    <NavLink to="/dashboard-admin/eliminar">Eliminar cuenta</NavLink>


                </aside>


                <section className="dashboard_caja">

                    <button className="cerrar_sesion " onClick={cerrarSesion}>Cerrar Sesión</button>


                    {/* Outlet sirve para pasar un contexto a sus rutas hija (useOutletContext()) */}
                    <Outlet context={{ usuario }} />
                </section>

            </div>


            <Footer />
        </div>
    )
}

export default DashboardAdmin