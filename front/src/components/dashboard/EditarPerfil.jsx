import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditarPerfil() {
    // con el useOutletContext se puede acceder al usuario que se ha pasado desde Dashboard con Outlet
    const { usuario } = useOutletContext();


    function procesa(ev) {
        ev.preventDefault();

        const datos = {
            email: ev.target.email.value || usuario.email,
            username: ev.target.username.value || usuario.username,
            nombre: ev.target.nombre.value || usuario.nombre,
            apellido1: ev.target.apellido1.value || usuario.apellido1,
            apellido2: ev.target.apellido2.value || usuario.apellido2,
            fecha_nacimiento: ev.target.fecha_nacimiento.value || usuario.fecha_nacimiento,
            movil: ev.target.movil.value || usuario.movil,
        };

        const datosJSON = JSON.stringify(datos);
        const url = `http://localhost:8000/api/usuario/perfil/${usuario.id}`;

        fetch(url, {
            method: "PUT",
            body: datosJSON,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.usuario) {
                    toast.success("Datos actualizados correctamente");

                    // actualizar localStorage
                    localStorage.setItem("usuario", JSON.stringify(response.usuario))

                    // recargar vista
                    window.location.reload();
                } else {
                    toast.error(response.error || "Error al actualizar");
                }
            })
            .catch(error => {
                console.error(error)
                toast.error("Error de conexión")
            })


    }

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor">

                <h2>EDITAR DATOS PERSONALES</h2>

                <form className="form_registro" onSubmit={procesa}>

                    <div className="campo">
                        <label>Mi email</label>
                        <input type="text" name="email" defaultValue={usuario.email} />
                    </div>

                    <div className="campo campo-username">
                        <label>Mi username</label>
                        <input type="text" name="username" defaultValue={usuario.username} readOnly />
                    </div>

                    <div className="campo">
                        <label>Mi nombre</label>
                        <input type="text" name="nombre" defaultValue={usuario.nombre} />
                    </div>

                    <div className="campo">
                        <label>Mi primer apellido</label>
                        <input type="text" name="apellido1" defaultValue={usuario.apellido1} />
                    </div>

                    <div className="campo">
                        <label>Mi segundo apellido</label>
                        <input type="text" name="apellido2" defaultValue={usuario.apellido2} />
                    </div>

                    <div className="campo">
                        <label>Mi fecha de nacimiento</label>
                        <input type="date" name="fecha_nacimiento" defaultValue={usuario.fecha_nacimiento} />
                    </div>

                    <div className="campo">
                        <label>Mi móvil</label>
                        <input type="text" name="movil" defaultValue={usuario.movil} maxLength={12} />
                    </div>

                    <button className={ usuario.rol === "Administrador"? "boton boton_admin": "boton boton-dashboard"}>
                        Guardar cambios
                    </button>

                </form>

            </div>
        </section>
    );
}

export default EditarPerfil;