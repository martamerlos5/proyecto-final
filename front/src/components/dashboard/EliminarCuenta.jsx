import { useNavigate, useOutletContext } from "react-router-dom"

function EliminarCuenta() {

    const { usuario } = useOutletContext()
    const navigate = useNavigate();

    function procesa() {
        const url = `http://localhost:8000/api/usuario/${usuario.id}`

        fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.mensaje) {
                    alert("Cuenta eliminada correctamente");

                    //    borrar usuario de localStorage
                    localStorage.removeItem("usuario");

                    // redirigir al index cuando se elimine
                    navigate("/");
                } else {
                    alert("Error al eliminar la cuenta");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Error de conexión");
            });
    }

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor eliminar_contenedor">

                <h2>ELIMINAR PERFIL</h2>

                <div className="eliminar_texto">
                    <p>
                        Al hacer click en el siguiente botón, confirmarás que deseas eliminar tu cuenta
                        de nuestro sistema y de esta manera, dejarás de disfrutar de las ventajas de pertenecer al club de CulturaActiva.
                    </p><br />

                    <p> <b>Una vez se elimine el perfil este no se podrá recuperar.</b> </p>
                </div>

                <button className="btn_eliminar" onClick={procesa}>
                    Eliminar cuenta
                </button>

            </div>
        </section>
    )
}

export default EliminarCuenta;