
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Arte y cultura'),
(2, 'Deporte'),
(3, 'Música'),
(4, 'Tecnología'),
(5, 'Cocina'),
(6, 'Creatividad'),
(7, 'Para niños'),
(8, 'Para jubilados');


CREATE TABLE `compras` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `compras` (`id`, `usuario_id`, `fecha_compra`, `total`) VALUES
(1, 2, '2026-04-03 12:39:47', 75),
(2, 2, '2026-04-03 17:04:44', 75),
(3, 2, '2026-04-03 17:48:42', 25),
(4, 2, '2026-04-05 10:45:29', 135),
(5, 8, '2026-04-05 13:37:17', 1160),
(6, 2, '2026-04-07 01:27:41', 79.2),
(7, 2, '2026-04-07 01:29:50', 2.7),
(8, 2, '2026-04-07 01:33:57', 45);


CREATE TABLE `contacto` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `mensaje` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `contacto` (`id`, `email`, `nombre`, `motivo`, `asunto`, `mensaje`) VALUES
(1, 'marmermar5@gmail.com', 'Marta', 'Sugerencia', 'sg3ew', 'ibnianioaniovangoqa'),
(2, 'martamerlos5@gmail.com', 'rick', 'Queja/Reclamación', 'Mejorar diseño', 'k keoqigqeq0maomaqe');



CREATE TABLE `contacto_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `contacto_seq` (`next_val`) VALUES
(1);



CREATE TABLE `detalle_compra` (
  `id` bigint(20) NOT NULL,
  `compra_id` bigint(20) NOT NULL,
  `tipo_entrada_id` bigint(20) NOT NULL,
  `cantidad` bigint(20) NOT NULL,
  `precio_unitario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `detalle_compra` (`id`, `compra_id`, `tipo_entrada_id`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 23, 1, 35),
(2, 1, 21, 5, 8),
(3, 2, 9, 2, 25),
(4, 2, 16, 1, 15),
(5, 2, 17, 1, 10),
(6, 3, 16, 1, 15),
(7, 3, 17, 1, 10),
(8, 4, 27, 3, 15),
(9, 4, 32, 3, 30),
(10, 5, 14, 29, 40),
(11, 6, 14, 2, 40),
(12, 6, 21, 1, 8),
(13, 7, 12, 1, 3),
(14, 8, 9, 2, 25);



CREATE TABLE `eventos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `estado` enum('Activo','Cancelado','Finalizado') DEFAULT 'Activo',
  `localidad_id` bigint(20) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



INSERT INTO `eventos` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `estado`, `localidad_id`, `imagen`, `hora_inicio`, `hora_fin`) VALUES
(1, 'Exposición de arte urbano', '“De vándalos a leyendas. Arte urbano” reúne más de 100 obras de grandes referentes internacionales y artistas murcianos en el Palacio de San Esteban. La muestra recorre la evolución del street art, desde sus orígenes hasta obras tecnológicas actuales. Incluye pintura en vivo, visitas guiadas, talleres y encuentros con creadores.', '2026-05-07', '2026-05-09', 'Museo de Bellas Artes de Murcia', 'Activo', 1, 'exposicion.jpg', '10:00:00', '20:00:00'),
(2, 'Don Juan Tenorio', '“Don Juan Tenorio” vuelve al Teatro Romea de la mano de la Cía. Cecilio Pineda, dirigida por Julio Navarro Albero. El clásico de Zorrilla revive la leyenda de Don Juan en la Sevilla de 1545, entre apuestas, seducciones y el inesperado amor por Doña Inés. Una puesta en escena tradicional.', '2026-05-13', '2026-05-13', 'Teatro Romea', 'Activo', 1, 'teatro.jpg', '19:00:00', '21:00:00'),
(3, 'III Carrera Solidaria', 'La Sala Familiar Ronald McDonald del Hospital Virgen de la Arrixaca celebra su III Carrera Solidaria el 26 de enero de 2026 en Murcia. Un evento deportivo y familiar con modalidades 5K, marcha y carrera infantil, abierto a todas las edades. La recaudación apoyará a familias con niños hospitalizados. Una jornada de deporte y solidaridad para disfrutar juntos y contribuir a una gran causa.', '2026-05-10', '2026-05-10', 'Avenida de la Constitución', 'Activo', 1, 'carrera.jpg', '09:00:00', '13:00:00'),
(4, 'Ciclo Antioxidante', 'Los Planetas regresan a Bullas el 11 de octubre con un gran evento junto a bandas como Los Punsetes, Perro o Marcelo Criminal. Hasta las 4:00 AM, habrá conciertos, DJs, food trucks y un recinto de más de 4000 m². Las primeras 1000 entradas salen a 40€ + gastos, con descuentos para empadronados. Disponibles opciones de glamping y buses.', '2026-05-01', '2026-05-03', 'La Almazara', 'Activo', 5, 'antioxidante.jpg', '18:00:00', '04:00:00'),
(5, 'Taller de repostería para niños', 'Taller infantil Minichef de decoración de cupcakes y galletas en El Corte Inglés de Cartagena. Incluye materiales, delantal y diploma para niños de 4 a 12 años. Actividad divertida y creativa para que los pequeños aprendan técnicas básicas de repostería. Plazas limitadas con inscripción previa.', '2026-05-15', '2026-05-15', 'El Corte Inglés Cartagena', 'Activo', 2, 'reposteria.jpg', '11:00:00', '13:00:00'),
(6, 'Curso de capacitación digital', 'La Consejería impulsa la Capacitación Digital mediante una red de aulas en centros educativos. El programa, financiado por el Ministerio y la UE, forma parte del Plan de Recuperación. Está dirigido específicamente a personas mayores y jubiladas para reducir la brecha digital.', '2026-05-06', '2026-05-06', 'Espacio Joven Cehegín', 'Activo', 6, 'jubilados.jpg', '17:00:00', '19:00:00'),
(7, 'Archena FC – UD Caravaca', 'El Archena FC se enfrenta al Caravaca UD en un partido decisivo de gran rivalidad regional. Un encuentro con alta expectativa por parte de ambas aficiones y con mucho en juego. Habrá un ambiente vibrante y un ritmo de juego intenso del primer al último minuto. Una cita perfecta para disfrutar del mejor fútbol murciano en Archena.', '2026-05-24', '2026-05-24', 'Campo de Fútbol de Archena', 'Activo', 8, 'partido.png', '18:30:00', '20:30:00'),
(8, 'Certamen de cortometrajes', 'A Corta Distancia celebrará su 13ª edición el día 27 de marzo en Lorca. El certamen reúne cortometrajes y audiovisuales recientes creados por cineastas locales. Las proyecciones contarán con la presencia de los propios autores, convirtiéndolo en una cita destacada del cine lorquino. Es una muestra del talento audiovisual de la ciudad.', '2026-05-01', '2026-05-22', 'Universidad Popular de Sutullena', 'Activo', 3, 'cortometraje.jpg', '19:00:00', '21:00:00'),
(9, 'Taller de escritura creativa', 'Un encuentro pensado para despertar la imaginación y explorar nuevas formas de escribir. El Taller de Escritura Creativa propone dinámicas, ejercicios y mucha inspiración para todas las edades. Es un espacio abierto a quienes quieran expresarse, aprender y disfrutar de la literatura. La Biblioteca de Caravaca acoge esta actividad donde las palabras toman vida.', '2026-05-11', '2026-05-11', 'Casa de la Cutura \"Emilio Sáez\"', 'Activo', 4, 'escritura.jpg', '18:00:00', '20:00:00'),
(10, 'Concierto de Samuraï', 'Samuraï llega a la Sala R.E.M. con la gira \'Del Ruido Al Silencio\'. Después de agotar todas las entradas de la gira del Silencio del Ruido, Samuraï vuelve con nuevas fechas y nuevas ciudades para llegar a todos los rincones del país con su gira Del Ruido al Silencio. Un show donde interpretará los mejores temas de su carrera y de su primer álbum de estudio.', '2026-06-05', '2026-06-05', 'Sala R.E.M.', 'Activo', 1, 'samurai.jpg', '22:00:00', '23:59:00'),
(11, 'II Feria Gastronómica de Mula', 'Del 20 al 22 de marzo de 2026, la Plaza del Ayuntamiento y la Glorieta de Mula se transforman en el epicentro del sabor con la celebración de GastroFlor, la II Feria Gastronómica de Mula. Enmarcada en las jornadas de MulaFlor 2026, esta cita invita a vecinos y visitantes a saborear el producto local a través de showcookings, catas, música en directo y actividades diseñadas para toda la familia.', '2026-05-29', '2026-05-31', 'Plaza Del Ayuntamiento', 'Activo', 7, 'gastroflor.jpg', '12:00:00', '23:00:00'),
(12, 'Curso de lengua de signos', 'Curso de lengua de signos dirigido a personas interesadas en aprender a comunicarse de forma inclusiva y accesible. La actividad ofrece una introducción a los fundamentos básicos de la lengua de signos, combinando teoría y práctica. Los participantes podrán adquirir habilidades comunicativas esenciales y conocer la cultura de la comunidad sorda. Una oportunidad formativa para fomentar la inclusión.', '2026-06-03', '2026-06-03', 'Escuela Oficial de Idiomas de Cartagena', 'Activo', 2, 'signos.jpg', '17:00:00', '19:00:00');



CREATE TABLE `evento_tiene_categorias` (
  `evento_id` bigint(20) NOT NULL,
  `categoria_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



INSERT INTO `evento_tiene_categorias` (`evento_id`, `categoria_id`) VALUES
(1, 1),
(1, 6),
(2, 1),
(2, 8),
(3, 2),
(4, 3),
(5, 5),
(5, 6),
(5, 7),
(6, 4),
(6, 8),
(7, 2),
(8, 1),
(9, 6),
(10, 3),
(11, 5),
(12, 1),
(12, 7);



CREATE TABLE `localidades` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



INSERT INTO `localidades` (`id`, `nombre`) VALUES
(1, 'Murcia'),
(2, 'Cartagena'),
(3, 'Lorca'),
(4, 'Caravaca de la Cruz'),
(5, 'Bullas'),
(6, 'Cehegín'),
(7, 'Mula'),
(8, 'Archena'),
(10, 'Águilas');


CREATE TABLE `tipos_entrada` (
  `id` bigint(20) NOT NULL,
  `evento_id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` double NOT NULL,
  `stock_total` bigint(20) NOT NULL,
  `stock_disponible` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `tipos_entrada` (`id`, `evento_id`, `nombre`, `descripcion`, `precio`, `stock_total`, `stock_disponible`) VALUES
(7, 1, 'General', 'Entrada general para la exposición', 0, 100, 100),
(9, 2, 'General', 'Entrada general para el teatro', 25, 500, 496),
(10, 2, 'VIP', 'Entrada VIP con asiento preferente y programa firmado', 50, 100, 100),
(11, 3, 'Inscripción 5K', 'Participación en la carrera de 5 km', 5, 400, 400),
(12, 3, 'Inscripción marcha', 'Participación en la marcha solidaria', 3, 250, 249),
(13, 3, 'Inscripción infantil', 'Participación en carrera infantil', 2, 150, 150),
(14, 4, 'General', 'Entrada general para todo el ciclo', 40, 2000, 1969),
(15, 4, 'VIP', 'Entrada VIP con acceso backstage y bebida incluida', 80, 200, 200),
(16, 5, 'Entrada Niño', 'Entrada para niños de 4 a 12 años', 15, 50, 48),
(17, 5, 'Adulto acompañante', 'Entrada para adultos acompañantes', 10, 50, 48),
(18, 6, 'General', 'Curso para adultos y jubilados', 5, 30, 30),
(19, 7, 'General', 'Entrada general para el partido', 10, 400, 400),
(20, 7, 'VIP', 'Entrada VIP con asiento premium', 25, 50, 50),
(21, 8, 'General', 'Entrada general para proyecciones', 8, 150, 144),
(22, 9, 'Participante', 'Entrada para taller de escritura creativa', 7, 20, 20),
(23, 10, 'General', 'Entrada general para el concierto', 35, 700, 699),
(24, 10, 'VIP', 'Entrada VIP con meet & greet y merchandising', 80, 20, 20),
(25, 11, 'General', 'Entrada general para la feria gastronómica', 5, 500, 500),
(26, 11, 'VIP', 'Entrada VIP con degustación y showcooking', 20, 100, 100),
(27, 12, 'General', 'Curso de lengua de signos', 15, 30, 27),
(32, 12, 'Entrada reducida', 'Para niños y jubilados', 30, 30, 27);


ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compra_id` (`compra_id`),
  ADD KEY `tipo_entrada_id` (`tipo_entrada_id`);


ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_evento_localidad` (`localidad_id`);


ALTER TABLE `evento_tiene_categorias`
  ADD PRIMARY KEY (`evento_id`,`categoria_id`),
  ADD KEY `fk_ec_categoria` (`categoria_id`);


ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `tipos_entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento_id` (`evento_id`);


ALTER TABLE `categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


ALTER TABLE `compras`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


ALTER TABLE `contacto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `detalle_compra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


ALTER TABLE `eventos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;


ALTER TABLE `localidades`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;


ALTER TABLE `tipos_entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;


ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`tipo_entrada_id`) REFERENCES `tipos_entrada` (`id`);


ALTER TABLE `eventos`
  ADD CONSTRAINT `fk_evento_localidad` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`);


ALTER TABLE `evento_tiene_categorias`
  ADD CONSTRAINT `fk_ec_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ec_evento` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;


ALTER TABLE `tipos_entrada`
  ADD CONSTRAINT `tipos_entrada_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
