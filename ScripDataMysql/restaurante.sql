-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2025 a las 23:19:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ListarReservas` ()   BEGIN
    SELECT 
        r.fechareserva,
        u.nombre AS nombre_usuario,
        m.nombremessa,
        r.horainicio,
        r.motivo,
        r.tipopago
    FROM reserva r
    INNER JOIN usuario u ON r.cliente = u.id_usuario
    INNER JOIN mesa m ON r.mesa = m.idmesa;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delivery`
--

CREATE TABLE `delivery` (
  `id_delivery` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `referencia` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `pago` enum('tarjeta','yape','efectivo') NOT NULL,
  `tarjetaNumero` varchar(25) DEFAULT NULL,
  `tarjetaNombre` varchar(120) DEFAULT NULL,
  `tarjetaCVV` varchar(4) DEFAULT NULL,
  `tarjetaFecha` varchar(10) DEFAULT NULL,
  `yapeNumero` varchar(20) DEFAULT NULL,
  `yapeCodigo` varchar(10) DEFAULT NULL,
  `numeroPedido` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `delivery`
--

INSERT INTO `delivery` (`id_delivery`, `id_usuario`, `direccion`, `referencia`, `telefono`, `pago`, `tarjetaNumero`, `tarjetaNombre`, `tarjetaCVV`, `tarjetaFecha`, `yapeNumero`, `yapeCodigo`, `numeroPedido`, `created_at`) VALUES
(22, 12, 'La Esperanza El provenir', 'Parque Industrial', '987253671', 'tarjeta', '4454-6767-3343-4445', 'Jose Armando', '546', '11/25', NULL, NULL, 'PED-29429', '2025-12-08 22:09:53');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `detalle_reserva`
--

-- CREATE TABLE `detalle_reserva` (
--   `id_detalle` int(11) NOT NULL,
--   `id_reserva` int(11) NOT NULL,
--   `id_producto` int(11) NOT NULL,
--   `cantidad` int(11) NOT NULL,
--   `precio` decimal(10,2) NOT NULL,
--   `subtotal` decimal(10,2) NOT NULL,
--   `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
--   `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_delivery` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(20) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `id_delivery`, `total`, `fecha_pedido`, `estado`) VALUES
(22, 12, 22, 30.00, '2025-12-08 22:09:53', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalle`
--

CREATE TABLE `pedido_detalle` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_detalle`
--

INSERT INTO `pedido_detalle` (`id_detalle`, `id_pedido`, `id_producto`, `precio`, `cantidad`, `subtotal`) VALUES
(19, 22, 13, 10.00, 2, 20.00),
(20, 22, 15, 5.00, 2, 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `imagen` varchar(200) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `categoria`, `stock`, `imagen`, `fecha_registro`) VALUES
(1, 'Arroz con Mariscos', 'Sabroso, marino y criollo.', 17.00, 'Almuerzos', 0, 'img/arrozMarisco.png', '2025-12-01 15:47:13'),
(2, 'Arroz con Pato', 'Tradicional, norteño y jugoso.', 18.00, 'Almuerzos', 0, 'img/arrozPato.png', '2025-12-01 15:47:13'),
(3, 'Ceviche', 'Sabor marino intenso.', 15.00, 'Almuerzos', 0, 'img/ceviche.png', '2025-12-01 15:47:13'),
(4, 'Causa Ferreñafa', 'Colorida, rellena y deliciosa.', 12.00, 'Almuerzos', 0, 'img/causaFerre.png', '2025-12-01 15:47:13'),
(5, 'Papa a la Huancaína', 'Cremosa y amarilla.', 10.00, 'Almuerzos', 0, 'img/papaHuancaina.png', '2025-12-01 15:47:13'),
(6, 'Chifon', 'Dulce y ligero.', 15.00, 'Postres', 0, 'img/chifon.png', '2025-12-01 15:47:13'),
(7, 'Tota de Chocolate', 'Intensa, suave y golosa.', 18.00, 'Postres', 0, 'img/tortaChoco.png', '2025-12-01 15:47:13'),
(8, 'Turrón', 'Miel, anís y crujiente.', 12.00, 'Postres', 0, 'img/turron.png', '2025-12-01 15:47:13'),
(9, 'Torta de Tres Leches', 'Húmeda, dulce y cremosa.', 14.00, 'Postres', 0, 'img/tortaTresLeches.png', '2025-12-01 15:47:13'),
(10, 'Tarta de Fresa', 'Frutal, rosada y suave.', 13.00, 'Postres', 0, 'img/postres.jpg', '2025-12-01 15:47:13'),
(11, 'Jugo de Piña', 'Natural, refrescante y tropical.', 8.00, 'Bebidas', 0, 'img/piña.png', '2025-12-01 15:47:13'),
(12, 'Pisco Sour', 'Cítrico, espumoso y peruano.', 6.00, 'Bebidas', 0, 'img/piscoSour.png', '2025-12-01 15:47:13'),
(13, 'Malteada de Fresa', 'Fría, cremosa y dulce.', 10.00, 'Bebidas', 0, 'img/malteadaFresa.png', '2025-12-01 15:47:13'),
(14, 'Frappe', 'Helado, batido y energético.', 9.00, 'Bebidas', 0, 'img/frappe.png', '2025-12-01 15:47:13'),
(15, 'Capuchino', 'Café, leche y espuma.', 5.00, 'Bebidas', 0, 'img/cafe.png', '2025-12-01 15:47:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `mesa` varchar(50) NOT NULL,
  `personas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `id_usuario`, `fecha`, `hora`, `mesa`, `personas`, `created_at`, `updated_at`) VALUES
(54, 12, '2025-12-08', '17:00:00', 'Mesa 2', 1, '2025-12-09 03:10:36', '2025-12-09 03:10:36'),
(55, 14, '2025-12-09', '18:30:00', 'Mesa 7', 1, '2025-12-09 03:15:56', '2025-12-09 03:15:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `referencia` varchar(200) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `dni`, `nombre`, `correo`, `telefono`, `direccion`, `referencia`, `password`, `rol`, `fecha_registro`) VALUES
(12, '72356620', 'Jose Armando', 'nando_pr@hotmail.com', '987253671', 'La Esperanza El provenir', 'parque industrial', '$2y$12$tjSK6snC36sRbWlAHOwhfeQu/F1hOLhGAQ4Me5I5TmttM5lRX0Sha', 'usuario', '2025-12-09 03:08:47'),
(13, '72993837', 'Ariel Medina', 'ari_87@hotmail.com', '992827665', 'Lambayeque - Chiclayo', 'Las Musas', '$2y$12$nnNfRTK0S03/UME4BRGOHOa6fo0NJ1MLXPoDuzP7V3tB3rY.Cm8Za', 'admin', '2025-12-09 03:12:35'),
(14, '77238988', 'Fernanda Ramos', 'fer_2005@outlook.com', '992827762', 'Piura - Piura', 'Plaza de Armas', '$2y$12$oHPFEdN4SS7YQaIGr8IH4upxb9nHMxA5BOEsYJ242/xLZiJnQUPXq', 'usuario', '2025-12-09 03:14:37');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id_delivery`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `detalle_reserva`
--

-- ALTER TABLE `detalle_reserva`
--   ADD PRIMARY KEY (`id_detalle`),
--   ADD KEY `id_reserva` (`id_reserva`),
--   ADD KEY `id_producto` (`id_producto`);


--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_delivery` (`id_delivery`);

--
-- Indices de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id_delivery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `detalle_reserva`
--

-- ALTER TABLE `detalle_reserva`
--   MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_reserva`
--

-- ALTER TABLE `detalle_reserva`
--   ADD CONSTRAINT `detalle_reserva_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `detalle_reserva_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_delivery`) REFERENCES `delivery` (`id_delivery`);

--
-- Filtros para la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD CONSTRAINT `pedido_detalle_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `pedido_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
