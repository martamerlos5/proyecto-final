import { useEffect, useState } from "react";

function Estadisticas() {

  const [estadisticas, setEstadisticas] = useState(null);
  const [topEventos, setTopEventos] = useState([]);

  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);
  const [cargandoTop, setCargandoTop] = useState(true);


  useEffect(() => {
    fetch("http://localhost:8080/compras/estadisticas")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar estadísticas");
        return res.json();
      })
      .then(data => {
        setEstadisticas(data);
        setCargandoEstadisticas(false);
      })
      .catch(err => {
        console.error(err);
        setCargandoEstadisticas(false);
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:8080/compras/estadisticas/top3-eventos")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar top eventos");
        return res.json();
      })
      .then(data => {
        setTopEventos(data);
        setCargandoTop(false);
      })
      .catch(err => {
        console.error(err);
        setCargandoTop(false);
      });
  }, []);

  // 🔹 Loading global
  if (cargandoEstadisticas || cargandoTop) {
    return (
      <div className="container">
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="container-estadisticas">
      <h2>ESTADÍSTICAS</h2>


      <div className="estadisticas-grid">
        <div className="estadisticas-tarjeta">
          <h3>Ingresos totales</h3>
          <p>{estadisticas.ingresos} €</p>
        </div>

        <div className="estadisticas-tarjeta">
          <h3>Total compras</h3>
          <p>{estadisticas.compras}</p>
        </div>

        <div className="estadisticas-tarjeta">
          <h3>Entradas vendidas</h3>
          <p>{estadisticas.entradas}</p>
        </div>

        <div className="estadisticas-tarjeta">
          <h3>Evento más vendido</h3>
          <p>{estadisticas.eventoTop}</p>
        </div>
      </div>


      <h3 className="titulo-top">Top 3 eventos más vendidos</h3>

      <div className="estadisticas-grid">
        {topEventos.map((evento, index) => (
          <div key={index} className="estadisticas-tarjeta">
            <p className="top-numero">#{index + 1}</p>

            <p className="top-nombre">
              {typeof evento === "string" ? evento : evento.nombre}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Estadisticas;