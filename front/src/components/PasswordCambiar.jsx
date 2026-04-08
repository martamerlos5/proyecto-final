import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";

function PasswordCambiar() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function procesa(ev) {
    ev.preventDefault();

    setMensaje("");
    setError("");

    const password = ev.target.password.value;
    const password_confirmation = ev.target.password_confirmation.value;

    // validación básica frontend
    if (password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    if (password !== password_confirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const datos = {
      password: password,
      password_confirmation: password_confirmation
    };

    fetch(`http://localhost:8000/api/usuario/password/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {

        if (response.mensaje) {
          setMensaje("Contraseña actualizada correctamente");

          // redirigir al login después de un momento
          setTimeout(() => {
            navigate("/login");
          }, 1500);

        } else {
          setError(response.error || "No se pudo cambiar la contraseña");
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
        <h2>CAMBIAR CONTRASEÑA</h2>

        <form onSubmit={procesa}>
          <input type="password" name="password" placeholder="Nueva contraseña*" required />

          <input type="password" name="password_confirmation" placeholder="Confirmar contraseña*" required />

          <button type="submit" className="boton"> Cambiar contraseña </button>
        </form>

        {/* Mensajes */}
        {mensaje && <p className="success">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <br /><br /><br /><br /><br /><br />

      <Newsletter />
      <Footer />
    </div>
  );
}

export default PasswordCambiar;