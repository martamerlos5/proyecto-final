import { Link } from "react-router-dom";
import Header from "./shared/Header";
import Newsletter from "./shared/Newsletter";
import Footer from "./shared/Footer";
import { useState, useEffect } from "react";


// array de objetos, cada objeto es un elemento del hero slider con su imagen, título y subtítulo correspondiente
const slides = [
  {
    imagen: "/hero1.jpg",
    titulo: "Es tu momento <br/> de disfrutar",
    subtitulo: "Descubre los eventos de los que todo el mundo está hablando",
  },
  {
    imagen: "/dibujo.jpg",
    titulo: "Talleres para los <br/> más pequeños",
    subtitulo: "Encuentra conciertos, teatro y actividades para todos",
  },
  {
    imagen: "/ceramica.png",
    titulo: "Encuentra tu nuevo hobby",
    subtitulo: "Explora eventos cerca de ti y comparte momentos inolvidables",
  },
];

// componente interno 'HeroSlider'. Lo he creado interno y no externo porque no lo voy a reutilizar en otra página, solo en esta.
function HeroSlider() {
  // estado posición (indica en qué posición se encuentra el hero). Empieza en la primera (0)
  const [posicion, setPosicion] = useState(0); // setPosicion actualiza la posición

  // cambiar cada 20 segundos
  useEffect(() => {
    const tiempo = setInterval(() => { // se crea un intervalo que se ejecuta cada x tiempo (20 segundos)
      setPosicion((previo) => (previo + 1) % slides.length); // se actualiza la posición, +1 pasa al siguiente y vuelve a 0 cuando llega al final
    }, 20000);
    return () => clearInterval(tiempo); // limpia el intervalo cuando el componente se desmonta (para evitar que se ejecute en segundo plano)
  }, []); // se ejecuta solo una vez

  const clicar = (i) => setPosicion(i); // función para cambiar de slide manualmente



  return (
    <section className="hero">
      {/*  muestra la imagen que corresponde a la posición actual. Más adelante muestra el título y el subítulo de la posición actual */}
      <img src={slides[posicion].imagen} alt="Hero CulturaActiva" />

      <div className="hero_texto">
        {/* dangerouslySetInnerHTML porque he puesto <br/> en algunos títulos de los objetos del array slides */}
        <h1 dangerouslySetInnerHTML={{ __html: slides[posicion].titulo }}></h1>
        <p>{slides[posicion].subtitulo}</p>

        <Link className="boton" to="/eventos"> Explorar eventos </Link>
      </div>

      <div className="hero_circulos">
        {/*  se recorre el array slides y se configura el uso de los botones del slider */}
        {slides.map((slide, i) => {
          let clase = "circulo";

          if (i === posicion) {
            clase = "circulo activo"; // si el circulo está activo (es la posición del slider) se marca en negro. si no, se marca en blanco (las clases son las de la hoja de estilos)
          } else {
            clase = "circulo inactivo";
          }

          return (
            // el span representa el círculo del slider. Cada vez que se hace click llama a clicar, que cambia la posición del hero
            <span key={i} className={clase} onClick={() => clicar(i)}></span>
          );
        })}
      </div>
    </section>
  );
}



function Index() {
  const [eventosProximos, setEventosProximos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/eventos/proximos")
      .then(result => {
        if (!result.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return result.json();
      })
      .then(data => {
        console.log(data)
        setEventosProximos(Array.isArray(data) ? data : [])
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <>
      <Header />

      <HeroSlider />

      <section className="eventos_index">
        <h2>Explora los eventos más próximos</h2>

        <div className="eventos_index_contenedor">
          {eventosProximos.map(evento => (
            <div className="evento_index_tarjeta" key={evento.id}>
              <img src={`/${evento.imagen}`} alt={evento.nombre} className="evento_img_home" />

              <div>
                <h3>{evento.nombre}</h3>

                <div className="evento_tarjeta_info">
                  <span>{new Date(evento.fecha_inicio).toLocaleDateString()}</span> |
                  <span>{evento.localidadNombre}</span>
                </div>

                {/* <p className="evento_index_descripcion">{evento.descripcion}</p> */}<br />

                <Link className="boton" to={`/eventos/${evento.id}`}>
                  Leer más
                </Link><br />
              </div>
            </div>
          ))}
















          {/* <div className="evento_index_tarjeta">
            <img src="/exposicion.jpg" alt="Exposición de arte urbano" />

            <div>
              <h3>Exposición de arte urbano</h3>

              <div className="evento_tarjeta_info">
                <span>2 de marzo de 2026</span>
                <span>Museo de Bellas Artes</span>
              </div>

              <p className="evento_index_descripcion">
                “De vándalos a leyendas. Arte urbano” reúne más de 100 obras de
                grandes referentes internacionales y artistas murcianos en el
                Palacio de San Esteban. La muestra recorre la evolución del
                street art, desde sus orígenes hasta obras tecnológicas actuales.
                Incluye pintura en vivo, visitas guiadas, talleres y encuentros
                con creadores.
              </p>

              <Link className="boton" to="/eventos">
                Leer más
              </Link>
            </div>
          </div> */}


          {/* <div className="evento_index_tarjeta">
            <img src="/teatro.jpg" alt="Don Juan Tenorio" className="evento_img_home" />

            <div>
              <h3>Don Juan Tenorio</h3>

              {/* evento_index_info */}
          {/* <div className="evento_tarjeta_info">
                <span>6 de marzo de 2026</span>
                <span>Teatro Romea</span>
              </div>

              <p className="evento_index_descripcion">
                “Don Juan Tenorio” vuelve al Teatro Romea de la mano de la Cía.
                Cecilio Pineda, dirigida por Julio Navarro Albero. El clásico de
                Zorrilla revive la leyenda de Don Juan en la Sevilla de 1545,
                entre apuestas, seducciones y el inesperado amor por Doña Inés.
                Una puesta en escena tradicional.
              </p>

              <Link className="boton" to="/eventos">
                Leer más
              </Link>
            </div>
          </div> */}

          {/* <div className="evento_index_tarjeta">
            <img src="/carrera.jpg" alt="III Carrera Solidaria" className="evento_img_home" />

            <div>
              <h3>III Carrera Solidaria</h3>

              <div className="evento_tarjeta_info">
                <span>14 de marzo de 2026</span>
                <span>Avenida de la Libertad</span>
              </div>

              <p className="evento_index_descripcion">
                La Sala Familiar Ronald McDonald del Hospital Virgen de la
                Arrixaca celebra su III Carrera Solidaria el 26 de enero de 2026
                en Murcia. Un evento deportivo y familiar con modalidades 5K,
                marcha y carrera infantil, abierto a todas las edades. La
                recaudación apoyará a familias con niños hospitalizados.
              </p>

              <Link className="boton" to="/eventos"> Leer más </Link>
            </div>
          </div> */}
        </div>
      </section>

      <Link to="/eventos" className="boton_eventos"> Ver todos los eventos </Link>

      <section className="sobrenosotros" id="sobrenosotros">
        <div className="sobrenosotros_contenedor">
          <h2>Sobre CulturaActiva</h2>

          <div className="sobrenosotros_contenedor_columna">
            <div className="sobrenosotros_logo">
              <img src="/logo.png" className="logotipo" alt="Logo CulturaActiva" />
            </div>

            <div className="sobrenosotros_texto">
              <p>
                En CulturaActiva creemos que la cultura y el ocio tienen el poder
                de unir a las personas, despertar curiosidad y abrir puertas a
                nuevas formas de disfrutar y aprender.
              </p>

              <p>
                Nuestra plataforma reúne eventos de todo tipo: conciertos,
                espectáculos, actividades deportivas, talleres creativos,
                exposiciones de arte, encuentros gastronómicos y propuestas
                culturales pensadas para todas las edades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ubicacion" id="ubicacion">
        <div className="ubicacion_contenedor">
          <h2>Dónde estamos</h2>

          <div className="ubicacion_mapa_contenedor">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.5673471198993!2d-1.1371775244397413!3d37.98722509989431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63821d918933ed%3A0x5d3c90778680c7f!2sC.%20Sta.%20Teresa%2C%208%2C%2030005%20Murcia!5e0!3m2!1ses!2ses!4v1766921456260!5m2!1ses!2ses"
              width="450"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CulturaActiva">
            </iframe>

            <div className="ubicacion_info">
              <p>
                Calle Sta. Teresa, 8 <br /> Murcia (30005)
              </p>

              <h3>Horario de apertura</h3>

              <p>
                <strong>Lunes - Viernes</strong> <br /> 10:00 AM - 14:00 PM <br /> 17:30 PM - 21:00 PM
              </p>

              <p>
                <strong>Sábados</strong> <br /> 10:00 AM - 14:00 PM
              </p>

              <p>
                <strong>Domingos</strong> <br /> Cerrado </p>
              <br />

              <p>
                <strong>Teléfono</strong> <br /> +34 685 302 287
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter id="newsletter" />
      <Footer />
    </>
  );
}

export default Index;
