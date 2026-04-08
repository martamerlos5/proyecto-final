import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";

function ContrasenaOlvidada() {

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function procesa(ev) {
    ev.preventDefault();

    setMensaje("");
    setError("");

    const datos = {
      identificador: ev.target.identificador.value
    };

    fetch("http://localhost:8000/api/recuperar-password", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {

        if (response.usuario_id) {
          setMensaje("Usuario encontrado. Redirigiendo para cambiar la contraseña...");

          // pequeño delay
          setTimeout(() => {
            navigate(`/cambiar-password/${response.usuario_id}`);
          }, 1500);

        } else {
          setError(response.error || "Ha ocurrido un error");
        }
      })
      .catch(() => {
        setError("Error de conexión con el servidor");
      });

    ev.target.reset();
  }

  return (
    <div>
      <Header />

      <div className="login">
        <h2>RECUPERAR CONTRASEÑA</h2>

        <form onSubmit={procesa}>
          <input type="text" name="identificador" placeholder="Email o nombre de usuario*" required/>

          <button type="submit" className="boton"> Recuperar contraseña </button>
        </form>


        {/* mensajes de info */}
        {mensaje && <p className="success">{mensaje}</p>}
        {error && <p className="error">{error}</p>}

        <div className="registrarse">
          <p> <Link to="/login">Volver al Login</Link></p>
        </div>
      </div>

      <br /><br /><br /><br /><br /><br />

      <Newsletter />
      <Footer />
    </div>
  );
}

export default ContrasenaOlvidada;