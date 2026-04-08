import { useOutletContext } from "react-router-dom"

function CambiarPassword() {
    const { usuario } = useOutletContext()

    function procesa(ev) {
        ev.preventDefault();

        const password = ev.target.password.value
        const password_confirmation = ev.target.passwordRepetida.value

        if (password !== password_confirmation) {
            alert("Las contraseñas no coinciden")
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
                    alert("Contraseña cambiada correctamente");
                    ev.target.reset();
                } else {
                    alert("Error al cambiar contraseña");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Error de conexión");
            });

    }

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor">

                <h2>CAMBIAR CONTRASEÑA</h2>

                <form className="form_registro" onSubmit={procesa}>

                    <div className="campo">
                        <label>Nueva contraseña:</label>
                        <input type="password" name="password" />
                    </div>


                    <div className="campo">
                        <label>Repite la nueva contraseña:</label>
                        <input type="password" name="passwordRepetida" />
                    </div>


                    <button className="boton boton-dashboard">Cambiar contraseña</button>

                </form>

            </div>
        </section>
    )
}

export default CambiarPassword