CREATE DATABASE IF NOT EXISTS eventos_bd;
USE eventos_bd;


S
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Arte y cultura'),
(2, 'Deporte'),
(3, 'Música'),
(4, 'Tecnología'),
(5, 'Cocina'),
(6, 'Creatividad'),
(7, 'Para niños'),
(8, 'Para jubilados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `usuario_id`, `fecha_compra`, `total`) VALUES
(1, 2, '2026-04-03 12:39:47', 75),
(2, 2, '2026-04-03 17:04:44', 75),
(3, 2, '2026-04-03 17:48:42', 25),
(4, 2, '2026-04-05 10:45:29', 135),
(5, 8, '2026-04-05 13:37:17', 1160),
(6, 2, '2026-04-07 01:27:41', 79.2),
(7, 2, '2026-04-07 01:29:50', 2.7),
(8, 2, '2026-04-07 01:33:57', 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `mensaje` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id`, `email`, `nombre`, `motivo`, `asunto`, `mensaje`) VALUES
(1, 'marmermar5@gmail.com', 'Marta', 'Sugerencia', 'sg3ew', 'ibnianioaniovangoqa'),
(2, 'martamerlos5@gmail.com', 'rick', 'Queja/Reclamación', 'Mejorar diseño', 'k keoqigqeq0maomaqe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_seq`
--

CREATE TABLE `contacto_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto_seq`
--

INSERT INTO `contacto_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id` bigint(20) NOT NULL,
  `compra_id` bigint(20) NOT NULL,
  `tipo_entrada_id` bigint(20) NOT NULL,
  `cantidad` bigint(20) NOT NULL,
  `precio_unitario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compra`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

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

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `estado`, `localidad_id`, `imagen`, `hora_inicio`, `hora_fin`) VALUES
(1, 'Exposición de arte urbano', '“De vándalos a leyendas. Arte urbano” reúne más de 100 obras de grandes referentes internacionales y artistas murcianos en el Palacio de San Esteban. La muestra recorre la evolución del street art, desde sus orígenes hasta obras tecnológicas actuales. Incluye pintura en vivo, visitas guiadas, talleres y encuentros con creadores.', '2026-04-02', '2026-04-02', 'Museo de Bellas Artes de Murcia', 'Activo', 1, 'exposicion.jpg', '10:00:00', '20:00:00'),
(2, 'Don Juan Tenorio', '“Don Juan Tenorio” vuelve al Teatro Romea de la mano de la Cía. Cecilio Pineda, dirigida por Julio Navarro Albero. El clásico de Zorrilla revive la leyenda de Don Juan en la Sevilla de 1545, entre apuestas, seducciones y el inesperado amor por Doña Inés. Una puesta en escena tradicional.', '2026-04-06', '2026-04-06', 'Teatro Romea', 'Activo', 1, 'teatro.jpg', '19:00:00', '21:00:00'),
(3, 'III Carrera Solidaria', 'La Sala Familiar Ronald McDonald del Hospital Virgen de la Arrixaca celebra su III Carrera Solidaria el 26 de enero de 2026 en Murcia. Un evento deportivo y familiar con modalidades 5K, marcha y carrera infantil, abierto a todas las edades. La recaudación apoyará a familias con niños hospitalizados. Una jornada de deporte y solidaridad para disfrutar juntos y contribuir a una gran causa.', '2026-04-14', '2026-04-14', 'Avenida de la Constitución', 'Activo', 1, 'carrera.jpg', '09:00:00', '13:00:00'),
(4, 'Ciclo Antioxidante', 'Los Planetas regresan a Bullas el 11 de octubre con un gran evento junto a bandas como Los Punsetes, Perro o Marcelo Criminal. Hasta las 4:00 AM, habrá conciertos, DJs, food trucks y un recinto de más de 4000 m². Las primeras 1000 entradas salen a 40€ + gastos, con descuentos para empadronados. Disponibles opciones de glamping y buses.', '2026-04-14', '2026-04-15', 'La Almazara', 'Activo', 5, 'antioxidante.jpg', '18:00:00', '04:00:00'),
(5, 'Taller de repostería para niños', 'Taller infantil Minichef de decoración de cupcakes y galletas en El Corte Inglés de Cartagena. Incluye materiales, delantal y diploma para niños de 4 a 12 años. Actividad divertida y creativa para que los pequeños aprendan técnicas básicas de repostería. Plazas limitadas con inscripción previa.', '2026-04-06', '2026-04-06', 'El Corte Inglés Cartagena', 'Activo', 2, 'reposteria.jpg', '11:00:00', '13:00:00'),
(6, 'Curso de capacitación digital', 'La Consejería impulsa la Capacitación Digital mediante una red de aulas en centros educativos. El programa, financiado por el Ministerio y la UE, forma parte del Plan de Recuperación. Está dirigido específicamente a personas mayores y jubiladas para reducir la brecha digital.', '2026-04-18', '2026-04-18', 'Espacio Joven Cehegín', 'Activo', 6, 'jubilados.jpg', '17:00:00', '19:00:00'),
(7, 'Archena FC – UD Caravaca', 'El Archena FC se enfrenta al Caravaca UD en un partido decisivo de gran rivalidad regional. Un encuentro con alta expectativa por parte de ambas aficiones y con mucho en juego. Habrá un ambiente vibrante y un ritmo de juego intenso del primer al último minuto. Una cita perfecta para disfrutar del mejor fútbol murciano en Archena.', '2026-04-21', '2026-04-21', 'Campo de Fútbol de Archena', 'Activo', 8, 'partido.png', '18:30:00', '20:30:00'),
(8, 'Certamen de cortometrajes', 'A Corta Distancia celebrará su 13ª edición el día 27 de marzo en Lorca. El certamen reúne cortometrajes y audiovisuales recientes creados por cineastas locales. Las proyecciones contarán con la presencia de los propios autores, convirtiéndolo en una cita destacada del cine lorquino. Es una muestra del talento audiovisual de la ciudad.', '2026-04-02', '2026-04-02', 'Universidad Popular de Sutullena', 'Activo', 3, 'cortometraje.jpg', '19:00:00', '21:00:00'),
(9, 'Taller de escritura creativa', 'Un encuentro pensado para despertar la imaginación y explorar nuevas formas de escribir. El Taller de Escritura Creativa propone dinámicas, ejercicios y mucha inspiración para todas las edades. Es un espacio abierto a quienes quieran expresarse, aprender y disfrutar de la literatura. La Biblioteca de Caravaca acoge esta actividad donde las palabras toman vida.', '2026-04-27', '2026-04-27', 'Casa de la Cutura \"Emilio Sáez\"', 'Activo', 4, 'escritura.jpg', '18:00:00', '20:00:00'),
(10, 'Concierto de Samuraï', 'Samuraï llega a la Sala R.E.M. con la gira \'Del Ruido Al Silencio\'. Después de agotar todas las entradas de la gira del Silencio del Ruido, Samuraï vuelve con nuevas fechas y nuevas ciudades para llegar a todos los rincones del país con su gira Del Ruido al Silencio. Un show donde interpretará los mejores temas de su carrera y de su primer álbum de estudio.', '2026-04-23', '2026-04-23', 'Sala R.E.M.', 'Activo', 1, 'samurai.jpg', '22:00:00', '23:59:00'),
(11, 'II Feria Gastronómica de Mula', 'Del 20 al 22 de marzo de 2026, la Plaza del Ayuntamiento y la Glorieta de Mula se transforman en el epicentro del sabor con la celebración de GastroFlor, la II Feria Gastronómica de Mula. Enmarcada en las jornadas de MulaFlor 2026, esta cita invita a vecinos y visitantes a saborear el producto local a través de showcookings, catas, música en directo y actividades diseñadas para toda la familia.', '2026-04-20', '2026-04-22', 'Plaza Del Ayuntamiento', 'Activo', 7, 'gastroflor.jpg', '12:00:00', '23:00:00'),
(12, 'Curso de lengua de signos', 'Curso de lengua de signos dirigido a personas interesadas en aprender a comunicarse de forma inclusiva y accesible. La actividad ofrece una introducción a los fundamentos básicos de la lengua de signos, combinando teoría y práctica. Los participantes podrán adquirir habilidades comunicativas esenciales y conocer la cultura de la comunidad sorda. Una oportunidad formativa para fomentar la inclusión.', '2026-04-14', '2026-04-15', 'Escuela Oficial de Idiomas de Cartagena', 'Activo', 2, 'signos.jpg', '17:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_tiene_categorias`
--

CREATE TABLE `evento_tiene_categorias` (
  `evento_id` bigint(20) NOT NULL,
  `categoria_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `evento_tiene_categorias`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `localidades`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_entrada`
--

CREATE TABLE `tipos_entrada` (
  `id` bigint(20) NOT NULL,
  `evento_id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` double NOT NULL,
  `stock_total` bigint(20) NOT NULL,
  `stock_disponible` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_entrada`
--

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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compra_id` (`compra_id`),
  ADD KEY `tipo_entrada_id` (`tipo_entrada_id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_evento_localidad` (`localidad_id`);

--
-- Indices de la tabla `evento_tiene_categorias`
--
ALTER TABLE `evento_tiene_categorias`
  ADD PRIMARY KEY (`evento_id`,`categoria_id`),
  ADD KEY `fk_ec_categoria` (`categoria_id`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_entrada`
--
ALTER TABLE `tipos_entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento_id` (`evento_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tipos_entrada`
--
ALTER TABLE `tipos_entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`tipo_entrada_id`) REFERENCES `tipos_entrada` (`id`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `fk_evento_localidad` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`);

--
-- Filtros para la tabla `evento_tiene_categorias`
--
ALTER TABLE `evento_tiene_categorias`
  ADD CONSTRAINT `fk_ec_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ec_evento` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tipos_entrada`
--
ALTER TABLE `tipos_entrada`
  ADD CONSTRAINT `tipos_entrada_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




CREATE DATABASE IF NOT EXISTS usuarios_bd;
USE usuarios_bd;



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuarios_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_pago`
--

CREATE TABLE `metodos_pago` (
  `id` int(11) NOT NULL,
  `metodo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `metodos_pago`
--

INSERT INTO `metodos_pago` (`id`, `metodo`) VALUES
(1, 'Tarjeta'),
(2, 'PayPal'),
(3, 'Bizum');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_02_18_222819_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `newsletter_usuarios`
--

CREATE TABLE `newsletter_usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `usado` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `creado` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `newsletter_usuarios`
--

INSERT INTO `newsletter_usuarios` (`id`, `email`, `codigo`, `usado`, `is_active`, `creado`) VALUES
(1, 'marmermar5@gmail.com', '5FTS0W', 1, 1, '2026-04-03 18:18:27'),
(3, 'lala@lala.com', 'URA8SX', 0, 1, '2026-04-05 09:26:29'),
(5, 'chechu@chechu.com', '5DWBXL', 0, 1, '2026-04-05 09:43:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('89XBmGtpZoMNPCUg187ioRHuzYP9UeGpn3jLjKKi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlJROXQ3cG50WENXOUgwY2VDMk11d2V0Uzg1ZGJmSG9pRnRxTE9RbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072312),
('amvWTvuLABSDjdG9OuAjiSMlRgFrevfLOnKjWa4I', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRzVSQU9Iajl1Z1hENFkySWxXVElHRWc1enRaTXljWGxuZHg0WENXYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072274),
('DSZD1kmZTEPfIsahZDFKaRfLBKlARB5WF8tEl8IW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUNjRkVJcGRFUHEwR0pwNUVYRHhHMXpTbFFoUHJobzBSenhmWVZ2TCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072983),
('hOii5MX8DYQn03NF4MTlzXaVmnHu3ADaHKRICIj4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFcyWlFCNm1INzhGaXBFYkk3WFVEaHA5cGlmT3ptbE9vUFc5RXZBbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072294),
('IfW4ZlHOkUg05teDPYKcMn2wSDXWcbbZ8VkJFtoa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUkFKbjRRRkNwVVNLT1FQVzdoWTJIN1NaTERLZ0c1bWo1eU5NYkM3ZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072300),
('KiuQvrcHY1yOXPeJ7QVWJXqNenVicWghldPeMfEe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHJnb2pTUkJkelR5THc3dDZkaDhTVGpRbEZtUlNGN0NwOFlkaWlRWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072266),
('lagQwrlkyUh73cxi5CdHMqVOF1HlziGTMbomaUt8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMUdpMVVBQllJUGl4SmgwRUpxeEdSYndzVXNJR1ZRbWVpR3Vpd0U3aiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072979),
('lhLlAJ9GHQWCTKCBmyE6sVlIvrKxB4MvcMQP0K2W', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGxsTnlrSkkyZ3VwVFdsSVpOVjk0ZjJDMVYycUdmOWtiVlgzOGcwTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072386),
('nZqgNNyFpTHEp3bX8BT9fEOqenTOmN0VMSWHyXQx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWVCVVhBeGR6d2FqbnFYUHpDQ0g3U1BwejY3aE5BY2dHTHR4dGNUbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072265),
('xEpCip0vqdaGYRuNYqqxWhZEm5iKAtTeALAMEu8F', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzA5YW9JVVRXNDNiWkdYMW9kV01EVUNVa0ViQVl4MVA4ZFFrRVBYdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c3VhcmlvcyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1775072397);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Cliente','Administrador') NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(100) NOT NULL,
  `apellido2` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `movil` varchar(20) NOT NULL,
  `id_metodo_pago` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `username`, `password`, `rol`, `nombre`, `apellido1`, `apellido2`, `fecha_nacimiento`, `provincia`, `localidad`, `direccion`, `codigo_postal`, `movil`, `id_metodo_pago`, `created_at`, `updated_at`) VALUES
(1, 'miau@miau.com', 'itsmmx', '$2y$12$N3LWT4SjJTfskU9J4Qevd.TDV5qFzqj.R.XDsWuD7IudirszGD7UC', 'Cliente', 'Marta', 'Maiu', NULL, NULL, NULL, NULL, NULL, NULL, '666888411', NULL, '2026-03-14 19:34:34', '2026-03-14 19:34:34'),
(2, 'marmermar5@gmail.com', 'martamerlos', '$2y$12$pTJtoC3sdvNwWP2rUktYPui3sxa5Q6oWi1gclZ3rVt8DCMOaSqLvu', 'Cliente', 'Marta', 'Merlos', 'Martínez', '1998-05-05', 'West Midlands', 'Birmingham', '303 Tiverton Road', 'B29 6DA', '666888411', NULL, '2026-03-14 19:45:12', '2026-04-06 21:30:01'),
(7, 'ash@pokedex.com', 'ashito', '$2y$12$zNKVvrvrHrhM7aHC2vpz8eq5e9pukdzAq0tPwZJs0VqHO.jiOiGDC', 'Cliente', 'Ash', 'Ketchum', NULL, NULL, NULL, NULL, NULL, NULL, '666888411', NULL, '2026-03-28 10:55:09', '2026-03-28 10:55:09'),
(8, 'xd@xd.com', 'Equisde', '$2y$12$ju60eD92rSp955lOIywVpuDOYDpjzYo8kVqJZOPPmB0Igf/.Z0kTy', 'Administrador', 'Pepe', 'Pepitp', NULL, NULL, NULL, NULL, NULL, NULL, '555555', NULL, '2026-03-28 13:46:09', '2026-04-04 09:45:31'),
(13, 'chechu@chechu.com', 'chechas', '$2y$12$NtzLhKZUN0Py.4KOq88Qku0Aw5RjDSZenea/3cPYwjwieFw1l3ARO', 'Cliente', 'Chechu', 'García', NULL, '1998-04-04', NULL, NULL, NULL, NULL, '6668887777', NULL, '2026-04-05 09:21:46', '2026-04-05 09:21:46'),
(14, 'admin@admin.com', 'admin', '$2y$12$EX3de7j.6n14ndlprRj9tefbTXCN1S7E5nITpbRibBaZ6X7JidWee', 'Administrador', 'Lucas', 'García', NULL, '1997-11-07', 'Murcia', 'El Palmar', NULL, NULL, '698201141', NULL, '2026-04-06 22:03:04', '2026-04-06 22:03:04');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `newsletter_usuarios`
--
ALTER TABLE `newsletter_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_usuario_metodo` (`id_metodo_pago`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `newsletter_usuarios`
--
ALTER TABLE `newsletter_usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuario_metodo` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodos_pago` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
