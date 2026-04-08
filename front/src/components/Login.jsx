import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const rutasAdmins = location.pathname == '/login-admin' || location.pathname == '/dashboard-admin'

  function procesa(ev) {
    ev.preventDefault();

    const datos = {
      // "identificador" porque así lo he llamado en Laravel ya que puede almacenar el email o el username
      identificador: ev.target.identificador.value,
      password: ev.target.password.value
    };

    const datosJSON = JSON.stringify(datos);
    const url = "http://localhost:8000/api/login";

    fetch(url, {
      method: "POST",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
        // para evitar redirecciones
        "Accept": "application/json"
      }
    })
      .then(respuesta => respuesta.json())
      .then(response => {

        console.log(response);

        if (response.usuario) {
          // para el navegador, para que recuerde al usuario y no se olvide a recargar la página. con useState al recargar se olvida
          localStorage.setItem("usuario", JSON.stringify(response.usuario));

          alert(`Bienvenido/a, ${response.usuario.nombre}`)
          navigate("/");
        } else {
          alert(response.error)
        }
      });


  }

  return (
    <div>
      <Header />
      <div className="admin_link">
        <Link to="/login-admin">Acceso administradores</Link>
      </div>

      <div className="login">
        <h2>INICIAR SESIÓN</h2>

        <form onSubmit={procesa}>
          <input type="text" placeholder="Email/Nombre de usuario*" name="identificador" required />
          <input type="password" placeholder="Contraseña*" name="password" required />

          <div className="olvidado">
            <Link to="/contrasenaOlvidada"> ¿Has olvidado tu contraseña? </Link>
            <br />
          </div>

          <button type="submit" className={`boton ${rutasAdmins ? "admin-mode" : ""}`}> Iniciar Sesión</button>
        </form>


        <div className="registrarse">
          <p>
            ¿Todavía no estás registrado? <Link to="/registro"> Regístrate aquí</Link>
          </p>
          <br />
        </div>


      </div>

      <Newsletter />
      <Footer />


    </div>
  );
}

export default Login;
