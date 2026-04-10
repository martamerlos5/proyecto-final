import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import { toast } from "react-toastify";


function Pasarela() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cesta, setCesta] = useState([]);

  const [metodoPago, setMetodoPago] = useState("");

  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    caducidad: "",
    cvv: ""
  });

  const [paypalEmail, setPaypalEmail] = useState("");
  const [bizumTelefono, setBizumTelefono] = useState("");

  const [codigoCupon, setCodigoCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [cuponAplicado, setCuponAplicado] = useState(false);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    const cestaKey = usuarioGuardado
      ? `cesta_${usuarioGuardado.id}`
      : "cesta_invitado";

    const cestaGuardada =
      JSON.parse(localStorage.getItem(cestaKey)) || [];

    setUsuario(usuarioGuardado);
    setCesta(cestaGuardada);
  }, []);

  const subtotal = cesta.reduce(
    (acc, entrada) => acc + entrada.precio * entrada.cantidad,
    0
  );

  const totalConDescuento = subtotal - descuento;

  const aplicarCupon = async () => {
    if (!codigoCupon) {
      toast.error("Escribe un código");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/newsletter/cupones/${usuario.email}`
      );

      if (!response.ok) {
        throw new Error("Error obteniendo cupones");
      }

      const cupones = await response.json();

      const cuponValido = cupones.find(
        c =>
          c.codigo === codigoCupon.toUpperCase() &&
          c.usado == 0 &&
          c.is_active == 1
      );

      if (cuponValido) {
        setDescuento(subtotal * 0.10);
        setCuponAplicado(true);
        toast.success("¡Código aplicado! Se ha aplicado un 10% de descuento.");
      } else {
        toast.error("El código no es válido o ya ha sido utilizado.");
      }

    } catch (error) {
      console.error("Error validando cupón:", error);
      toast.error("No se pudo validar el cupón.");
    }
  };

  const procesa = async (ev) => {
    ev.preventDefault();

    const datos = {
      nombre: ev.target.nombre.value || usuario.nombre,
      apellido1: ev.target.apellido1.value || usuario.apellido1,
      email: ev.target.email.value || usuario.email,
      movil: ev.target.movil.value || usuario.movil,
      provincia: ev.target.provincia.value || usuario.provincia,
      localidad: ev.target.localidad.value || usuario.localidad,
      direccion: ev.target.direccion.value || usuario.direccion,
      codigo_postal: ev.target.codigo_postal.value || usuario.codigo_postal
    };

    if (!datos.nombre) {
      toast.error("Introduce un nombre");
      return;
    }

    if (!datos.email) {
      toast.error("Introduce un email");
      return;
    }

    if (!datos.direccion) {
      toast.error("Introduce una dirección");
      return;
    }

    if (!metodoPago) {
      toast.error("Selecciona un método de pago");
      return;
    }

    if (metodoPago === "tarjeta") {
      const numeroValido = /^\d{16}$/.test(tarjeta.numero);
      const cvvValido = /^\d{3}$/.test(tarjeta.cvv);
      const caducidadValida = /^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjeta.caducidad);

      if (!numeroValido) {
        toast.error("El número de tarjeta debe tener 16 dígitos");
        return;
      }

      if (!cvvValido) {
        toast.error("El CVV debe tener 3 dígitos");
        return;
      }

      if (!caducidadValida) {
        toast.error("Formato de caducidad incorrecto (MM/AA)");
        return;
      }

      if (!tarjeta.nombre) {
        toast.error("Introduce el nombre de la tarjeta");
        return;
      }
    }

    if (metodoPago === "paypal") {
      const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail);

      if (!emailValido) {
        toast.error("Introduce un email válido de PayPal");
        return;
      }
    }

    if (metodoPago === "bizum") {
      const telefonoValido = /^\d{9}$/.test(bizumTelefono);

      if (!telefonoValido) {
        toast.error("El teléfono de Bizum debe tener 9 dígitos");
        return;
      }
    }

    const compraDTO = {
      usuarioId: usuario.id,
      total: totalConDescuento,
      detalles: cesta.map(entrada => ({
        tipoEntradaId: entrada.id,
        cantidad: entrada.cantidad,
        precioUnitario: entrada.precio
      }))
    };

    try {
      const response = await fetch("http://localhost:8080/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(compraDTO)
      });

      if (!response.ok) {
        throw new Error("Error al procesar la compra");
      }

      if (cuponAplicado) {
        await fetch(
          `http://localhost:8000/api/newsletter/usar/${usuario.email}/${codigoCupon}`,
          { method: "PUT" }
        );
      }

      const cestaKey = usuario
        ? `cesta_${usuario.id}`
        : "cesta_invitado";

      localStorage.removeItem(cestaKey);

      toast.success("Compra realizada correctamente");

      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error("Error en el pago");
    }
  };

  return (
    <>
      <Header />

      <section className="dashboard_seccion">
        <div className="registro_contenedor">

          <h2>PASARELA DE PAGO</h2>

          <form className="form_registro" onSubmit={procesa}>

            <div className="campo">
              <label>Nombre</label>
              <input name="nombre" defaultValue={usuario?.nombre} required />
            </div>

            <div className="campo">
              <label>Primer apellido</label>
              <input name="apellido1" defaultValue={usuario?.apellido1} required />
            </div>

            <div className="campo">
              <label>Email</label>
              <input name="email" defaultValue={usuario?.email} required />
            </div>

            <div className="campo">
              <label>Móvil</label>
              <input name="movil" defaultValue={usuario?.movil} required />
            </div>

            <div className="campo">
              <label>Provincia</label>
              <input name="provincia" defaultValue={usuario?.provincia} required />
            </div>

            <div className="campo">
              <label>Localidad</label>
              <input name="localidad" defaultValue={usuario?.localidad} required />
            </div>

            <div className="campo">
              <label>Dirección</label>
              <input name="direccion" defaultValue={usuario?.direccion} required />
            </div>

            <div className="campo">
              <label>Código postal</label>
              <input name="codigo_postal" defaultValue={usuario?.codigo_postal} required />
            </div>

            <div className="campo">
              <label>Método de pago</label>

              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="paypal">PayPal</option>
                <option value="bizum">Bizum</option>
              </select>

              {metodoPago === "tarjeta" && (
                <div className="campo">
                  <input placeholder="Número de tarjeta (16 dígitos)" onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })} />

                  <input placeholder="Nombre" onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })} />

                  <input placeholder="Caducidad (MM/AA)" onChange={(e) => setTarjeta({ ...tarjeta, caducidad: e.target.value })} />

                  <input placeholder="CVV (3 dígitos)" onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })} />
                </div>
              )}

              {metodoPago === "paypal" && (
                <div className="campo">
                  <input type="email" placeholder="Email de PayPal" onChange={(e) => setPaypalEmail(e.target.value)} />
                </div>
              )}

              {metodoPago === "bizum" && (
                <div className="campo">
                  <input placeholder="Teléfono (9 dígitos)" onChange={(e) => setBizumTelefono(e.target.value)} />
                </div>
              )}
            </div>

            <div className="resumen">

              <h3>Resumen de compra</h3>

              {cesta.map((entrada, index) => {
                const precioTotalLinea =
                  entrada.precio * entrada.cantidad;

                return (
                  <div key={index} className="resumen_linea">
                    <p> <strong>{entrada.eventoNombre}</strong> - {entrada.nombre} </p>

                    <p> {entrada.cantidad > 1
                      ? `${entrada.precio}€ x ${entrada.cantidad} = ${precioTotalLinea}€`
                      : `${precioTotalLinea}€`}
                    </p>
                  </div>
                );
              })}

              <hr />

              <div className="campo_cupon">
                <label>¿Tienes un cupón?</label>

                <div>
                  <input type="text" placeholder="Código" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} disabled={cuponAplicado} />

                  <button type="button" className="boton" onClick={aplicarCupon} disabled={cuponAplicado}>
                    {cuponAplicado ? "Aplicado" : "Aplicar"}
                  </button>
                </div>
              </div>

              {descuento > 0 && (
                <p>Descuento: -{descuento.toFixed(2)}€</p>
              )}

              <h3>Total: {totalConDescuento.toFixed(2)}€</h3>

            </div>

            <button type="submit" className="boton">
              Pagar
            </button>

          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Pasarela;