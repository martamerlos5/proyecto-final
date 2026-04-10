import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const rutasAdmins =
    location.pathname == "/login-admin" ||
    location.pathname == "/dashboard-admin";

  function procesa(ev) {
    ev.preventDefault();

    const datos = {
      identificador: ev.target.identificador.value,
      password: ev.target.password.value,
    };

    const datosJSON = JSON.stringify(datos);
    const url = "http://localhost:8000/api/login";

    fetch(url, {
      method: "POST",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((response) => {
        console.log(response);

        if (response.usuario) {
          localStorage.setItem(
            "usuario",
            JSON.stringify(response.usuario)
          );

          toast.success(`Bienvenido/a, ${response.usuario.nombre}`);

          navigate("/");
        } else {
          toast.error(response.error);
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
            <Link to="/contrasenaOlvidada">
              ¿Has olvidado tu contraseña?
            </Link>
            <br />
          </div>

          <button type="submit" className={`boton ${rutasAdmins ? "admin-mode" : ""}`}>Iniciar Sesión </button>
        </form>

        <div className="registrarse">
          <p>
            ¿Todavía no estás registrado?{" "}
            <Link to="/registro">Regístrate aquí</Link>
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