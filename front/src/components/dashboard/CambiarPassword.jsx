import { useOutletContext } from "react-router-dom"


import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function CambiarPassword() {
    const { usuario } = useOutletContext()

    function procesa(ev) {
        ev.preventDefault();

        const password = ev.target.password.value
        const password_confirmation = ev.target.passwordRepetida.value

        if (password !== password_confirmation) {
            toast.error("Las contraseñas no coinciden")
            return;
        }

        const datos = {
            password, password_confirmation
        }

        const datosJSON = JSON.stringify(datos);
        const url = `http://localhost:8000/api/usuario/password/${usuario.id}`

        fetch(url,{
            method:"PUT",
            body: datosJSON,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.mensaje) {
                    toast.success("Contraseña cambiada correctamente");
                    ev.target.reset();
                } else {
                    toast.error("Error al cambiar contraseña");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error de conexión");
            });

    }

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor">

                <h2>CAMBIAR CONTRASEÑA</h2>

                <form className="form_registro" onSubmit={procesa}>

                    <div className="campo">
                        <label>Nueva contraseña:</label>
                        <input type="password" name="password" minLength={5} />
                    </div>

                    <div className="campo">
                        <label>Repite la nueva contraseña:</label>
                        <input type="password" name="passwordRepetida" minLength={5}/>
                    </div>

                    <button className="boton boton-dashboard">Cambiar contraseña</button>

                </form>

            </div>
        </section>
    )
}

export default CambiarPassword