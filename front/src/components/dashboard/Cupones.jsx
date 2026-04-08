import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Cupones() {
  const { usuario } = useOutletContext();
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuario?.email) {
      fetch(`http://localhost:8000/api/newsletter/cupones/${usuario.email}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Error al obtener cupones");
          }
          return res.json();
        })
        .then(data => {
          setCupones(data);
          setCargando(false);
        })
        .catch(err => {
          console.error("Error al obtener cupones:", err);
          setCargando(false);
        });
    }
  }, [usuario?.email]);

  function darseDeBaja() {
    if (!window.confirm("¿Seguro que quieres darte de baja de la newsletter?")) {
      return;
    }

    fetch(`http://localhost:8000/api/newsletter/baja/${usuario.email}`, {
      method: "PUT"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al darse de baja");
        }
        return res.json();
      })
      .then(() => {
        alert("Te has dado de baja correctamente");
        setCupones([]);
      })
      .catch(err => {
        console.error("Error al darse de baja:", err);
        alert("No se pudo completar la baja");
      });
  }

  if (cargando) {
    return (
      <div className="dashboard_tarjeta">
        <h2>MIS CUPONES</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard_entradas">
      <h2>MIS CUPONES</h2>

      <Link onClick={darseDeBaja}> Darse de baja de la newsletter </Link>

      {cupones.length === 0 ? (
        <div className="mensaje_vacio">
          <p>No tienes cupones disponibles en este momento.</p>
          <p className="texto_pequeno">
            ¡Suscríbete a nuestra newsletter si aún no lo has hecho!
          </p>
        </div>
      ) : (
        <div className="cupones_grid">
          {cupones.map((cupon) => (
            <div key={cupon.id} className={`cupon_tarjeta ${cupon.usado == 1 ? "cupon_usado" : ""}`}>

              <div className="cupon_contenido">

                <div className="cupon_info">
                  <span className="cupon_porcentaje">10% OFF</span>
                  <h3>Descuento de Bienvenida</h3>
                  <p>Válido para tu primera compra</p>
                </div>

                <div className="cupon_codigo_container">
                  <p className="label_codigo">CÓDIGO:</p>

                  <div className="cupon_codigo">
                    {cupon.codigo}
                  </div>

                  <button
                    className="boton_copiar"
                    onClick={() => {
                      navigator.clipboard.writeText(cupon.codigo);
                      alert("¡Código copiado!");
                    }}
                    disabled={cupon.usado == 1}>
                    {cupon.usado == 1 ? "YA CANJEADO" : "COPIAR CÓDIGO"}
                  </button>
                </div>
              </div>

              {cupon.usado == 1 && (
                <div className="sello_usado">CANJEADO</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cupones;
