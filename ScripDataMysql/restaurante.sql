-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2025 a las 06:40:38
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
(1, 4, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-01466', '2025-12-01 21:05:48'),
(2, 4, 'La Esperanza El provenir', 'dsdsdsdsds', '123233', 'yape', NULL, NULL, NULL, NULL, '928273645', '123456', 'PED-03180', '2025-12-01 21:14:08'),
(3, 4, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-11118', '2025-12-01 21:42:07'),
(4, 4, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'tarjeta', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-12435', '2025-12-01 21:46:22'),
(5, 4, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-49858', '2025-12-01 22:02:42'),
(6, 4, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-19144', '2025-12-02 18:55:33'),
(7, 4, 'sdsdsdsds', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-96338', '2025-12-02 18:56:40'),
(8, 6, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-60958', '2025-12-02 21:02:13'),
(9, 8, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-76389', '2025-12-02 21:39:24'),
(10, 8, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-73928', '2025-12-03 00:57:52'),
(11, 6, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-87724', '2025-12-03 05:23:35'),
(12, 8, 'Ramon Castilla Lt 01', 'dsd', '987253671', 'tarjeta', '9191919239393', '191929292929', '1234', '12:40', NULL, NULL, 'PED-77126', '2025-12-04 00:38:45'),
(13, 8, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '123233', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-95437', '2025-12-04 01:48:15'),
(14, 8, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-55629', '2025-12-04 14:59:59'),
(15, 8, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '8282828288', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-57490', '2025-12-04 17:25:28'),
(16, 8, 'La Esperanza El provenir', 'dsdsdsdsds', '987253671', 'tarjeta', '11111-111-11-111-11', 'Cris', '123', '10/10', NULL, NULL, 'PED-42513', '2025-12-04 19:17:42'),
(17, 10, 'Ramon Castilla Lt 01', 'espaldar del colegio juan 23', '987253671', 'yape', NULL, NULL, NULL, NULL, '976543567', '234567', 'PED-35789', '2025-12-04 23:21:35'),
(18, 10, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-35287', '2025-12-04 23:32:49'),
(19, 10, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-92778', '2025-12-04 23:33:01'),
(20, 10, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-35003', '2025-12-04 23:59:18'),
(21, 11, 'Ramon Castilla Lt 01', 'dsdsdsdsds', '987253671', 'efectivo', NULL, NULL, NULL, NULL, NULL, NULL, 'PED-44879', '2025-12-05 01:53:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_reserva`
--

CREATE TABLE `detalle_reserva` (
  `id_detalle` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(6, 4, 6, 27.00, '2025-12-02 18:55:33', 'Recibido'),
(7, 4, 7, 20.00, '2025-12-02 18:56:40', 'pendiente'),
(8, 6, 8, 30.00, '2025-12-02 21:02:13', 'Recibido'),
(9, 8, 9, 30.00, '2025-12-02 21:39:24', 'Recibido'),
(10, 8, 10, 30.00, '2025-12-03 00:57:52', 'Cancelado'),
(12, 8, 12, 30.00, '2025-12-04 00:38:45', 'pendiente'),
(13, 8, 13, 45.00, '2025-12-04 01:48:15', 'pendiente'),
(14, 8, 14, 30.00, '2025-12-04 14:59:59', 'pendiente'),
(15, 8, 15, 45.00, '2025-12-04 17:25:28', 'pendiente'),
(16, 8, 16, 30.00, '2025-12-04 19:17:42', 'Recibido'),
(17, 10, 17, 44.00, '2025-12-04 23:21:35', 'Recibido'),
(18, 10, 18, 27.00, '2025-12-04 23:32:49', 'pendiente'),
(19, 10, 19, 27.00, '2025-12-04 23:33:01', 'pendiente'),
(20, 10, 20, 30.00, '2025-12-04 23:59:18', 'pendiente'),
(21, 11, 21, 30.00, '2025-12-05 01:53:58', 'Recibido');

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
(2, 6, 14, 9.00, 3, 27.00),
(3, 7, 15, 5.00, 4, 20.00),
(4, 8, 13, 10.00, 3, 30.00),
(5, 9, 13, 10.00, 3, 30.00),
(6, 10, 13, 10.00, 3, 30.00),
(8, 12, 13, 10.00, 3, 30.00),
(9, 13, 3, 15.00, 3, 45.00),
(10, 14, 13, 10.00, 3, 30.00),
(11, 15, 3, 15.00, 3, 45.00),
(12, 16, 13, 10.00, 3, 30.00),
(13, 17, 3, 15.00, 2, 30.00),
(14, 17, 9, 14.00, 1, 14.00),
(15, 18, 14, 9.00, 3, 27.00),
(16, 19, 14, 9.00, 3, 27.00),
(17, 20, 13, 10.00, 3, 30.00),
(18, 21, 13, 10.00, 3, 30.00);

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
(51, 8, '2025-12-04', '19:30:00', 'Mesa 4', 1, '2025-12-05 00:15:53', '2025-12-05 00:15:53'),
(52, 10, '2025-12-09', '21:30:00', 'Mesa 3', 2, '2025-12-05 04:18:50', '2025-12-05 04:18:50');

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
(4, '72356620', 'Cristina', 'Armi_01@lacito', '987253671', 'Ramon Castilla Lt 01', 'dsdsdsdsds', '$2y$12$fffEdFx2YVCkDgJzMxuTeu0mhTPopMliZBcIqsH9XKJmI.tS4Cgv6', 'usuario', '2025-12-01 20:55:55'),
(5, '91823674', 'Alexander', 'Alex_pd@hotm', '918273456', 'HuANCHO mZ B', 'dsdsdsdsds', '$2y$12$dAP8hDNMUghc80J/05JN2OOzG3sR0TwZPZPmFyvECv6sft7G/RFuO', 'admin', '2025-12-02 23:47:04'),
(6, '92345678', 'Jose Armando', 'Jose_@pd', '8282828288', 'Ramon Castilla Lt 01', 'dsdsdsdsds', '$2y$12$PRzhMqruwaWEVYWXvHY25OnZSDN698m1.NMXOMgAu4Fjmca9SbTpS', 'usuario', '2025-12-03 02:01:14'),
(7, '22222222', 'asds', 'qwqwe@jot', '292929292', 'sdsdsds', 'dsdsdsds', '$2y$12$j7HWn0fB6lCixiQz.Joxp.Xf/3CzGWKvrDxf5zjNKEtlO81Ufyyuy', 'admin', '2025-12-03 02:03:35'),
(8, '11111111', 'asasa', 'asasas@sds', '1234323', 'sdadasdsadsad', 'dsdsdsdsds', '$2y$12$XIXvVaMD2Fw0H.S0XNKSputgjf7gkYkU46BVi4MCDowt/CVr7XQsm', 'usuario', '2025-12-03 02:38:50'),
(9, '82934567', 'Fernandita', 'nasms@hsaks', '819236748', 'Ramon Castilla Lt 01', 'dsdsdsdsds', '$2y$12$eNoaHUIc45Z0cIlJeHUucOaKib4TXEaL846EEuswtlP2YOzdObbyS', 'usuario', '2025-12-05 01:57:35'),
(10, '74789689', 'liliana', 'merli_76@hotmail.com', '987654578', 'juan 23', 'parque industrial', '$2y$12$vSZROBXE4JBIZ3izjD8WkeOMt3GeJGbR7QL/ipUhOQhHENcmAtqmm', 'usuario', '2025-12-05 04:14:50'),
(11, '92345627', 'Jose Armando', 'nando_pr@hotmail', '92834567', 'Ramon Castilla Lt 01', 'parque industrial', '$2y$12$TAj5G3s4r9b65DOGzNlNcumN5xCV0NVkgSy54FJyXvLH8qmy3CKGm', 'usuario', '2025-12-05 06:50:16');

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
ALTER TABLE `detalle_reserva`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_producto` (`id_producto`);

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
  MODIFY `id_delivery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `detalle_reserva`
--
ALTER TABLE `detalle_reserva`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
ALTER TABLE `detalle_reserva`
  ADD CONSTRAINT `detalle_reserva_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_reserva_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

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
