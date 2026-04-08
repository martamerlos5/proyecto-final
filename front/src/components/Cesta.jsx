import { useState } from "react";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import { useNavigate } from "react-router-dom";

function Cesta() {

  const navigate = useNavigate();

  // Generamos una clave dinámica para el localStorage según el usuario
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const cestaKey = usuario ? `cesta_${usuario.id}` : "cesta_invitado";

  const [cesta, setCesta] = useState(() => {
    return JSON.parse(localStorage.getItem(cestaKey)) || [];
  });

  const actualizarCesta = (nuevaCesta) => {
    setCesta(nuevaCesta);
    localStorage.setItem(cestaKey, JSON.stringify(nuevaCesta));
  };

  const sumar = (index) => {
    const nuevaCesta = [...cesta];
    nuevaCesta[index].cantidad += 1;
    actualizarCesta(nuevaCesta);
  };

  const restar = (index) => {
    const nuevaCesta = [...cesta];

    if (nuevaCesta[index].cantidad > 1) {
      nuevaCesta[index].cantidad -= 1;
    } else {
      nuevaCesta.splice(index, 1);
    }

    actualizarCesta(nuevaCesta);
  };

  const total = cesta.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );


  // si no hay entradas en la cesta -> "no hay entradas"
  if (cesta.length === 0) {
    return (
      <div>
        <Header />

        <section className="cesta">
          <div className="cesta_contenedor">
            <h2>MI CESTA</h2>
            <p>No hay entradas en la cesta</p>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
    );
  }


  return (
    <div>
      <Header />

      <section className="cesta">
        <div className="cesta_contenedor">

          <h2>MI CESTA</h2>

          {cesta.map((entrada, index) => (
            <div key={index} className="cesta_linea">

              <div className="cesta_info">
                <p><strong>{entrada.eventoNombre}</strong></p>
                <p className="entrada-desc">{entrada.nombre}</p>
              </div>

              <div className="contador">
                <button onClick={() => restar(index)}>-</button>
                <span>{entrada.cantidad}</span>
                <button onClick={() => sumar(index)}>+</button>
              </div>

              <p>{entrada.precio}€</p>

              <p><strong>{entrada.precio * entrada.cantidad}€</strong></p>

            </div>
          ))}

          <div className="cesta_total">
            <h3>Total: {total}€</h3>
          </div>

          <button onClick={() => navigate("/pasarela")} className="boton boton_centrado" type="button">
            Comprar entradas
          </button>

        </div>
      </section>

      <Newsletter/>
      <Footer />
    </div>
  );
}

export default Cesta;