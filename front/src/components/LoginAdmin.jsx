import { Link, useNavigate } from "react-router-dom";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";

function Login() {

  const navigate = useNavigate();
  

  function procesa(ev) {
    ev.preventDefault();

    const obj = {
      identificador: ev.target.identificador.value,
      password: ev.target.password.value
    }

    const datosJSON = JSON.stringify(obj)
    const url = "http://localhost:8000/api/login-admin"


    fetch(url, {
      method: "POST",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.usuario) {
          localStorage.setItem("usuario", JSON.stringify(response.usuario))
          alert(`Bienvenido/a, ${response.usuario.nombre}`)
          navigate("/")
        } else {
          alert(response.error)
        }
      })
  }



  return (
    <div>
      <Header />


      <div className="login">
        <h2>INICIAR SESIÓN</h2>

        <form onSubmit={procesa}>
          <input type="text" placeholder="Email/Nombre de usuario*" name="identificador" required />
          <input type="password" placeholder="Contraseña*" name="password" required />

          <div className="olvidado">
            <Link to="/contrasenaOlvidada"> ¿Has olvidado tu contraseña? </Link>
            <br />
          </div>

          <button type="submit" className="boton boton_admin"> Iniciar Sesión </button>
        </form>


        <div className="registrarse">
          <p>
            <Link to="/registro-admin"> Registro de administradores </Link>
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
