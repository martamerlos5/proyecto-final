import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contacto() {

  async function enviar(ev) {
    ev.preventDefault();

    const obj = {
      email: ev.target.email.value,
      nombre: ev.target.nombre.value,
      motivo: ev.target.motivo.value,
      asunto: ev.target.asunto.value,
      mensaje: ev.target.mensaje.value
    }

    try {
      const result = await fetch("http://localhost:8080/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      if (!result.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      toast.success("Mensaje enviado correctamente")
      ev.target.reset();
      console.log(obj)

    } catch (error) {
      console.error(error)
      toast.error("Error al enviar el mensaje")
    }
  }

  return (
    <>
      <Header />
      <section className="contacto">
        <h2>FORMULARIO DE CONTACTO</h2>

        <p className="contacto_subtitulo">
          Ponerse en contacto con nosotros es super sencillo, <br /> tan solo hace falta rellenar y enviar el siguiente formulario.
          <br /> Intentaremos responder lo antes posible.
        </p>

        <form className="contacto_formulario" onSubmit={enviar}>
          <input type="email" name="email" placeholder="Email*" required />

          <input type="text" name="nombre" placeholder="Nombre y apellidos*" required />

          <select className="form-input" name="motivo" required>
            <option value="" disabled> Motivo </option>
            <option value="Queja/Reclamación">Queja/Reclamación </option>
            <option value="Sugerencia">Sugerencia </option>
            <option value="Duda">Duda </option>
            <option value="Agradecimiento">Agradecimiento </option>
          </select>

          <input type="text" name="asunto" placeholder="Asunto*" required />

          <textarea name="mensaje" placeholder="Mensaje...*" required></textarea>

          <button type="submit" className="boton boton_centrado">
            Enviar
          </button>

        </form>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Contacto;