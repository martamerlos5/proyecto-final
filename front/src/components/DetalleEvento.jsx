import { useParams } from "react-router-dom";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const cache = {};

async function obtenerCoordenadas(direccion) {
  if (cache[direccion]) return cache[direccion];

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.length > 0) {
    const coords = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
    cache[direccion] = coords;
    return coords;
  }

  return null;
}

function DetalleEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  const [entr, setEntradas] = useState([]);
  const [cantidades, setCantidades] = useState({});

  const [coords, setCoords] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/eventos/${id}`)
      .then((res) => res.json())
      .then((data) => setEvento(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/tipos-entrada/evento/${id}`)
      .then((res) => res.json())
      .then((data) => setEntradas(data));
  }, [id]);

  useEffect(() => {
    if (evento) {
      const direccionCompleta = `${evento.lugar}, ${evento.localidadNombre}`;

      obtenerCoordenadas(direccionCompleta)
        .then(setCoords)
        .catch(console.error);
    }
  }, [evento]);

  const sumar = (idEntrada) => {
    setCantidades((prev) => ({
      ...prev,
      [idEntrada]: (prev[idEntrada] || 0) + 1,
    }));
  };

  const restar = (idEntrada) => {
    setCantidades((prev) => ({
      ...prev,
      [idEntrada]: Math.max((prev[idEntrada] || 0) - 1, 0),
    }));
  };

  const addEntradas = () => {
    const entradas = entr
      .filter((e) => cantidades[e.id] > 0)
      .map((e) => ({
        id: e.id,
        nombre: e.nombre,
        precio: e.precio,
        cantidad: cantidades[e.id],
        eventoId: evento.id,
        eventoNombre: evento.nombre,
      }));

    if (entradas.length === 0) {
      toast.error("Selecciona al menos una entrada");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const cestaUsuario = usuario ? `cesta_${usuario.id}` : "cesta_invitado";

    const cestaActual =
      JSON.parse(localStorage.getItem(cestaUsuario)) || [];

    const nuevaCesta = [...cestaActual];

    entradas.forEach((nuevaEntrada) => {
      const index = nuevaCesta.findIndex(
        (item) => item.id === nuevaEntrada.id
      );

      if (index !== -1) {
        nuevaCesta[index].cantidad += nuevaEntrada.cantidad;
      } else {
        nuevaCesta.push(nuevaEntrada);
      }
    });

    localStorage.setItem(cestaUsuario, JSON.stringify(nuevaCesta));

    toast.success("Entradas añadidas a la cesta");
  };

  if (!evento) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Header />

      <div className="contenedor-detalle">
        <div className="tarjeta-detalle">
          <div className="imagen-container">
            <img
              src={`/${evento.imagen}`}
              alt={evento.nombre}
              className={
                evento.estado === "Finalizado" || evento.estado === "Cancelado"
                  ? "desactivado"
                  : ""
              }
            />

            {(evento.estado === "Finalizado" ||
              evento.estado === "Cancelado") && (
              <div className="overlay-estado">{evento.estado}</div>
            )}
          </div>

          <div className="title">
            <h1>{evento.nombre}</h1>
          </div>

          <div className="info">
            <p>
              <strong>Dónde:</strong> {evento.lugar} (
              {evento.localidadNombre})
            </p>
            <p>
              <strong>Cuándo:</strong>{" "}
              {new Date(evento.fecha_inicio).toLocaleDateString()}
            </p>
            <p>
              <strong>Horario:</strong> {evento.hora_inicio} –{" "}
              {evento.hora_fin}
            </p>
          </div>

          <div className="description-title">
            Descripción del evento:
          </div>

          <div className="description">{evento.descripcion}</div>

          <div className="caja-entradas">
            <h2 className="titulo-entradas">ENTRADAS</h2>

            {evento.estado === "Finalizado" ||
            evento.estado === "Cancelado" ? (
              <div className="evento-finalizado">
                {evento.estado === "Finalizado" && (
                  <>
                    <p>Este evento ya ha finalizado</p>
                    <p>No es posible comprar entradas.</p>
                  </>
                )}

                {evento.estado === "Cancelado" && (
                  <>
                    <p>Este evento ha sido cancelado</p>
                    <p>La venta de entradas no está disponible.</p>
                  </>
                )}
              </div>
            ) : (
              <>
                {entr.map((entrada) => (
                  <div key={entrada.id} className="entrada-fila">
                    <div className="entrada-info">
                      <p className="entrada-titulo">
                        {entrada.nombre} -{" "}
                        {entrada.precio === 0
                          ? "Gratuita"
                          : `${entrada.precio}€`}
                      </p>

                      {entrada.descripcion && (
                        <p className="entrada-desc">
                          {entrada.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="contador">
                      <button onClick={() => restar(entrada.id)}>
                        -
                      </button>
                      <span>{cantidades[entrada.id] || 0}</span>
                      <button onClick={() => sumar(entrada.id)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="boton-cesta boton"
                  onClick={addEntradas}
                >
                  Añadir entradas a la cesta
                </button>
              </>
            )}
          </div>

          <h3> Ubicación del evento</h3>
          {coords && (
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={15}
              style={{
                height: "300px",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[coords.lat, coords.lng]}>
                <Popup>{evento.nombre}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default DetalleEvento;