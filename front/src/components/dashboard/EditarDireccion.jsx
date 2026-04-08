import { useOutletContext } from "react-router-dom"

function EditarDireccion() {
    const { usuario } = useOutletContext()

    function procesa(ev) {
        ev.preventDefault();

        const datos = {
            direccion: ev.target.direccion.value || usuario.direccion,
            localidad: ev.target.localidad.value || usuario.localidad,
            provincia: ev.target.provincia.value || usuario.provincia,
            codigo_postal: ev.target.codigo_postal.value || usuario.codigo_postal,
        }

        const datosJSON = JSON.stringify(datos);
        const url = `http://localhost:8000/api/usuario/direccion/${usuario.id}`;

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
                    alert("Dirección actualizada");

                    localStorage.setItem("usuario", JSON.stringify(response.usuario));
                    
                    window.location.reload();
                } else {
                    alert(response.error || "Error al actualizar dirección");
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

                <h2>EDITAR DIRECCIÓN</h2>

                <form className="form_registro" onSubmit={procesa}>

                    <div className="campo">
                        <label>Mi provincia</label>
                        <input type="text" name="provincia" defaultValue={usuario.provincia} />
                    </div>

                    <div className="campo">
                        <label>Mi localidad</label>
                        <input type="text" name="localidad" defaultValue={usuario.localidad} />
                    </div>

                    <div className="campo">
                        <label>Mi dirección</label>
                        <input type="text" name="direccion" defaultValue={usuario.direccion} />
                    </div>

                    <div className="campo">
                        <label>Mi código postal</label>
                        <input type="text" name="codigo_postal" defaultValue={usuario.codigo_postal} />
                    </div>

                    <button className={ usuario.rol === "Administrador"? "boton boton_admin": "boton boton-dashboard"}>
                        Guardar cambios
                    </button>

                </form>

            </div>
        </section>
    )
}

export default EditarDireccion