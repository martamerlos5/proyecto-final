import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/eventos")
      .then(result => {
        if (!result.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return result.json();
      })
      .then(data => {
        console.log(data);
        setEventos(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header />

      <section className="eventos">
        <h2>Eventos disponibles</h2>

        <div className="eventos_contenedor">

          {eventos.map(evento => (
            <div className="evento_tarjeta" key={evento.id}>

              <div className="imagen-container">
                <img
                  src={`/${evento.imagen}`}
                  alt={evento.nombre}
                  className={
                    evento.estado === "Finalizado" || evento.estado === "Cancelado" ? "desactivado": ""}
                />

                {(evento.estado === "Finalizado" || evento.estado === "Cancelado") && (
                  <div className="overlay-estado">
                    {evento.estado}
                  </div>
                )}
              </div>

              <div className="evento_tarjeta_contenido">
                <h3>{evento.nombre}</h3>

                <div className="evento_tarjeta_info">
                  <span>{new Date(evento.fecha_inicio).toLocaleDateString()}</span> |
                  <span>{evento.localidadNombre}</span> |
                  <span>{evento.hora_inicio}</span>
                </div>

                <p>{evento.descripcion}</p>

                <Link to={`/eventos/${evento.id}`}>
                  <button className="boton">Comprar entrada</button>
                </Link>

              </div>
            </div>
          ))}



          {/* <div className="evento_tarjeta">
            <img src="/exposicion.jpg" alt="Exposición de arte moderno" />
            <div className="evento_tarjeta_contenido">
              <h3>Exposición de arte urbano</h3>

              <div className="evento_tarjeta_info">
                <span>2 de marzo de 2026</span>|
                <span>Murcia</span>|
                <span>10:00 AM – 21:00 PM</span>
              </div>

              <p>
                “De vándalos a leyendas. Arte urbano” reúne más de 100 obras de
                grandes referentes internacionales y artistas murcianos en el Palacio
                de San Esteban. La muestra recorre la evolución del street art, desde
                sus orígenes hasta obras tecnológicas actuales. Incluye pintura en
                vivo, visitas guiadas, talleres y encuentros con creadores.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>















          <div className="evento_tarjeta">
            <img src="/teatro.jpg" alt="Obra de teatro Don Juan Tenorio" />
            <div className="evento_tarjeta_contenido">
              <h3>Don Juan Tenorio</h3>

              <div className="evento_tarjeta_info">
                <span>6 de marzo de 2026</span>|
                <span>Murcia</span>|
                <span>20:00 PM</span>
              </div>

              <p>
                “Don Juan Tenorio” vuelve al Teatro Romea de la mano de la Cía.
                Cecilio Pineda, dirigida por Julio Navarro Albero. El clásico de Zorrilla
                revive la leyenda de Don Juan en la Sevilla de 1545, entre apuestas,
                seducciones y el inesperado amor por Doña Inés. Una puesta en
                escena tradicional.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>


          <div className="evento_tarjeta">
            <img src="/carrera.jpg" alt="Carrera solidaria" />
            <div className="evento_tarjeta_contenido">
              <h3>III Carrera Solidaria</h3>

              <div className="evento_tarjeta_info">
                <span>14 de marzo de 2026</span>|
                <span>Murcia</span>|
                <span>09:00 AM – 14:00 PM</span>
              </div>

              <p>
                La Sala Familiar Ronald McDonald del Hospital Virgen de la Arrixaca
                celebra su III Carrera Solidaria el 26 de enero de 2026 en Murcia. Un
                evento deportivo y familiar con modalidades 5K, marcha y carrera
                infantil, abierto a todas las edades. La recaudación apoyará a familias
                con niños hospitalizados. Una jornada de deporte y solidaridad
                para disfrutar juntos y contribuir a una gran causa.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>


          <div className="evento_tarjeta">
            <img src="/antioxidante.jpg" alt="Ciclo Antioxidante" />
            <div className="evento_tarjeta_contenido">
              <h3>Ciclo Antioxidante</h3>

              <div className="evento_tarjeta_info">
                <span>14 de marzo de 2026</span>|
                <span>Bullas</span>|
                <span>12:00 PM – 4:00 AM</span>
              </div>

              <p>
                Los Planetas regresan a Bullas el 11 de octubre con un gran evento
                junto a bandas como Los Punsetes, Perro o Marcelo Criminal. Hasta
                las 4:00 AM, habrá conciertos, DJs, food trucks y un recinto de más de
                4000 m². Las primeras 1000 entradas salen a 40€ + gastos, con
                descuentos para empadronados. Disponibles opciones de glamping
                y buses.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>

          <div className="evento_tarjeta">
            <img src="/reposteria.jpg" alt="Taller de repostería infantil" />
            <div className="evento_tarjeta_contenido">
              <h3>Taller de repostería para niños</h3>

              <div className="evento_tarjeta_info">
                <span>17 de marzo de 2026</span>|
                <span>Cartagena</span>|
                <span>11:30 AM – 13:00 PM</span>
              </div>

              <p>
                Taller infantil Minichef de decoración de cupcakes y galletas en El
                Corte Inglés de Cartagena. Incluye materiales, delantal y diploma para
                niños de 4 a 12 años. Actividad divertida y creativa para que los
                pequeños aprendan técnicas básicas de repostería. Plazas limitadas
                con inscripción previa.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>

          <div className="evento_tarjeta">
            <img src="/jubilados.jpg" alt="Cursos de capacitación digital" />
            <div className="evento_tarjeta_contenido">
              <h3>Curso de capacitación digital</h3>

              <div className="evento_tarjeta_info">
                <span>18 de marzo de 2026</span>|
                <span>Cehegín</span>|
                <span>17:00 PM – 19:00 PM</span>
              </div>

              <p>
                La Consejería impulsa la Capacitación Digital mediante una red de
                aulas en centros educativos. El programa, financiado por el Ministerio
                y la UE, forma parte del Plan de Recuperación. Está dirigido
                específicamente a personas mayores y jubiladas para reducir
                la brecha digital.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>


          <div className="evento_tarjeta">
            <img src="/partido.png" alt="Partido Archena FC – UD Caravaca" />
            <div className="evento_tarjeta_contenido">
              <h3>Archena FC – UD Caravaca</h3>

              <div className="evento_tarjeta_info">
                <span>21 de marzo de 2026</span>|
                <span>Archena</span>|
                <span>16:30 PM</span>
              </div>

              <p>
                El Archena FC se enfrenta al Caravaca UD en un partido decisivo de
                gran rivalidad regional. Un encuentro con alta expectativa por parte
                de ambas aficiones y con mucho en juego. Habrá un ambiente vibrante
                y un ritmo de juego intenso del primer al último minuto. Una cita
                perfecta para disfrutar del mejor fútbol murciano en Archena.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>


          <div className="evento_tarjeta">
            <img src="/cortometraje.jpg" alt="Certamen de cortometrajes" />
            <div className="evento_tarjeta_contenido">
              <h3>Certamen de cortometrajes</h3>

              <div className="evento_tarjeta_info">
                <span>27 de marzo de 2026</span>|
                <span>Lorca</span>|
                <span>18:30 PM</span>
              </div>

              <p>
                A Corta Distancia celebrará su 13ª edición el día 27 de marzo en Lorca.
                El certamen reúne cortometrajes y audiovisuales recientes creados por
                cineastas locales. Las proyecciones contarán con la presencia de los
                propios autores, convirtiéndolo en una cita destacada del cine lorquino. Es una muestra del
                talento audiovisual de la ciudad.
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div>


          <div className="evento_tarjeta">
            <img src="/escritura.jpg" alt="Taller de escritura creativa" />
            <div className="evento_tarjeta_contenido">
              <h3>Taller de escritura creativa</h3>

              <div className="evento_tarjeta_info">
                <span>27 de marzo de 2026</span>|
                <span>Caravaca de la Cruz</span>|
                <span>18:00 PM</span>
              </div>

              <p>Un encuentro pensado para despertar la imaginación y explorar nuevas formas de escribir.
                El Taller de Escritura Creativa propone dinámicas, ejercicios y mucha inspiración para todas las
                edades.
                Es un espacio abierto a quienes quieran expresarse, aprender y disfrutar de la literatura.
                La Biblioteca de Caravaca acoge esta actividad donde las palabras toman vida
              </p>

              <button className="boton">Comprar entrada</button>
            </div>
          </div> */}

        </div>
      </section>

      <Newsletter />
      <Footer />

    </div>
  );
}

export default Eventos;
