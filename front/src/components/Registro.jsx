import { useNavigate } from "react-router-dom";
import Footer from "./shared/Footer";
import Header from "./shared/Header";

function Registro() {
  const navigate = useNavigate();

  function procesa(ev) {
    ev.preventDefault();

    // mensaje de error si las contraseñas no coinciden
    if (ev.target.password.value !== ev.target.password_confirmation.value) {
      alert("Las contraseñas no coinciden");
      return;
    }

    


    const obj = {
      email: ev.target.email.value,
      username: ev.target.username.value,
      password: ev.target.password.value,
      password_confirmation: ev.target.password_confirmation.value,
      nombre: ev.target.nombre.value,
      apellido1: ev.target.apellido1.value,
      apellido2: ev.target.apellido2.value,
      fecha_nacimiento: ev.target.fecha_nacimiento.value,
      provincia: ev.target.provincia.value,
      localidad: ev.target.localidad.value,
      direccion: ev.target.direccion.value,
      codigo_postal: ev.target.codigo_postal.value,
      movil: ev.target.movil.value,
      // con 'terminos' y 'newsletter' en vez de value -> checked
      terminos: ev.target.terminos.checked,
      newsletter:ev.target.newsletter.checked
    };

    const datosJSON = JSON.stringify(obj);

    const url = "http://localhost:8000/api/registro";

    fetch(url, {
      method: "POST",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(respuesta => respuesta.json())
      .then(response => {

        console.log(response);

        if (response.usuario) {
          alert("Cuenta creada correctamente");
          navigate("/");
        } else {
          alert(response.error);
        }

      })
      .catch(error => {
        console.error(error);
        alert("Error al conectar con el servidor")
      })
  }

  return (
    <div>
      <Header />
      <section className="registro">
        <div className="registro_contenedor">

          <h2>REGISTRARSE</h2>

          <form className="form_registro" onSubmit={procesa}>
            <input type="email" placeholder="Email*" name="email" required />
            <input type="text" placeholder="Nombre de usuario*" name="username" required />

            <input type="password" placeholder="Contraseña*" name="password" required />
            <input type="password" placeholder="Repetir contraseña*" name="password_confirmation" required />

            <input type="text" placeholder="Nombre*" name="nombre" required />
            <input type="text" placeholder="Apellido 1*" name="apellido1" required />

            <input type="text" placeholder="Apellido 2" name="apellido2" />

            <input type="date" placeholder="Fecha de nacimiento" name="fecha_nacimiento" />

            <input type="text" placeholder="Localidad" name="localidad" />

            <input type="text" placeholder="Provincia" name="provincia" />
            <input type="text" placeholder="Dirección" name="direccion" />

            <input type="text" placeholder="Código Postal" name="codigo_postal" />
            <input type="text" placeholder="Móvil*" required name="movil" maxLength={12}/>
            

            <div className="checks">
              <label>
                <input type="checkbox" name="terminos" required /> He leído, entendido y acepto la Política de Privacidad y los Términos y Condiciones*
              </label>

              <label>
                <input type="checkbox" name="newsletter" /> Deseo apuntarme a la newsletter de CulturaActiva
              </label>
            </div>
            
            <button className="boton">Registrarse</button>

          </form>




        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Registro;
