-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2023 at 06:29 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `productos_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `almacen_productos`
--

CREATE TABLE `almacen_productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `valor` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `img1` varchar(255) NOT NULL,
  `img2` varchar(255) NOT NULL,
  `img3` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `minimo` int(11) NOT NULL DEFAULT '1',
  `maximo` int(11) NOT NULL DEFAULT '10',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `almacen_productos`
--

INSERT INTO `almacen_productos` (`id`, `nombre`, `valor`, `description`, `img1`, `img2`, `img3`, `cantidad`, `stock`, `minimo`, `maximo`, `createdAt`, `updatedAt`) VALUES
(1, 'Sudadera one piece', 249000, 'Sudadera licencia One Piece con capucha, print en contraste y de manga larga. ', 'https://i.ibb.co/HhC30Y7/8593523800-2-6-8.jpg', 'https://i.ibb.co/WFFMndR/8593523800-2-20-8.jpg', 'https://i.ibb.co/LhMMDVT/8593523800-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 14:57:44', '2023-02-03 21:13:16'),
(2, 'Sudarera b. one piece.', 249000, 'Sudadera blanca con print One Piece en la parte delantera, capucha con cordón, bolsillo canguro y de manga larga.', 'https://i.ibb.co/2SgV97t/4596543251-2-6-8.jpg', 'https://i.ibb.co/Rz2fGQn/4596543251-2-20-8.jpg', 'https://i.ibb.co/CbVZ0Wb/4596543251-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 15:20:28', '2023-02-04 05:04:39'),
(3, 'Sudadera paris bordado', 239000, 'Sudadera con capucha con cordones ajustables, bordado de Paris en contraste, bolsillo tipo canguro y de manga larga.', 'https://i.ibb.co/KF2Ftnj/4596566800-2-6-8.jpg', 'https://i.ibb.co/9nVFbxm/4596566800-2-8-8.jpg', 'https://i.ibb.co/fYncfRr/4.png', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-04 05:04:39'),
(4, 'Sudadera patron flor', 229000, 'Sudadera de manga larga y cuello redondo con detalle de parche con estampado de flor.', 'https://i.ibb.co/X5c2pgd/4596574800-2-6-8.jpg', 'https://i.ibb.co/vkhGkt2/4596574800-2-8-8.jpg', 'https://i.ibb.co/K6KqYMD/3.png', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-02 15:25:18'),
(5, 'Sudadera efecto lavado', 249000, 'Sudadera con acabado lavado especial, con capucha con cordones ajustables, bolsillo tipo canguro y detalle de print en contraste.', 'https://i.ibb.co/4j2DrGf/4596557612-2-6-8.jpg', 'https://i.ibb.co/d4c5dKg/4596557612-2-8-8.jpg', 'https://i.ibb.co/4pvN7x9/1.png', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-03 21:13:27'),
(6, 'Sudadera Cosmic Dancer', 239000, 'Sudadera en tejido técnico con detalle de print Cosmic Dancer con volumen, con capucha con cordones ajustables y bolsillo tipo canguro.', 'https://i.ibb.co/DLBT6YF/4596558712-2-6-8.jpg', 'https://i.ibb.co/1dW8Lx3/4596558712-2-20-8.jpg', 'https://i.ibb.co/k2yt6yF/4596558712-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-03 15:59:30'),
(7, 'Sudadera Rick & Morty', 299000, 'Sudadera gris licencia Rick & Morty, capucha con cordón, bolsillo canguro y de manga larga.', 'https://i.ibb.co/2v3JrRL/4596562802-2-6-8.jpg', 'https://i.ibb.co/SBS1sgn/4596562802-2-20-8.jpg', 'https://i.ibb.co/GVCDFNS/4596562802-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-04 05:11:25'),
(8, 'Sudadera death dance', 249000, 'Sudadera licencia Danza de la Muerte con capucha, bolsillo tipo canguro y print en el pecho.', 'https://i.ibb.co/2jQL7Y6/4596946800-2-8-8.jpg', 'https://i.ibb.co/j3D2gyR/4596946800-2-6-8.jpg', 'https://i.ibb.co/2S1TK0G/4596946800-2-20-8.jpg', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-04 05:10:26'),
(9, 'Sudadera gris print', 239000, 'Sudadera gris con print delantero, capucha con cordón y de manga larga.', 'https://i.ibb.co/y0rdy8S/4596552802-2-6-8.jpg', 'https://i.ibb.co/7WHqv2Q/4596552802-2-20-8.jpg', 'https://i.ibb.co/jhc3NPJ/4596552802-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-02-03 15:59:30'),
(10, 'Sudadera Diavolo Giallo', 239000, 'Sudadera negra con capucha, print Diavolo Giallo en contraste y de manga larga.', 'https://i.ibb.co/Twy7V7P/4596537800-2-6-8.jpg', 'https://i.ibb.co/8zK8GDH/4596537800-2-20-8.jpg', 'https://i.ibb.co/C0j7scv/4596537800-2-8-8.jpg', 1, 20, 1, 10, '2023-01-23 19:35:25', '2023-01-23 14:35:25'),
(11, 'Sudadera entergalactic', 249000, 'Sudadera licencia Entergalactic con capucha y cierre de cordones ajustables, bolsillo tipo canguro y print en el pecho.', 'https://i.ibb.co/rm3P0Qh/4596502800-2-6-8.jpg', 'https://i.ibb.co/s1NQ80N/4596502800-2-8-8.jpg', 'https://i.ibb.co/KWZyj9z/4596502800-2-5-8.jpg', 1, 20, 1, 10, '2023-01-23 21:16:19', '2023-02-04 05:13:47'),
(12, 'Sudadera XDYE print', 199000, 'Sudadera XDYE de manga larga y cuello redondo con detalle de print a color en el pecho y rib en puños y bajo', 'https://i.ibb.co/R7P2BZd/4596556712-2-6-8.jpg', 'https://i.ibb.co/rZ5WYJ3/4596556712-2-8-8.jpg', 'https://i.ibb.co/YZyMpTQ/2.png', 1, 20, 1, 10, '2023-01-23 21:16:19', '2023-02-03 22:01:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `almacen_productos`
--
ALTER TABLE `almacen_productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `almacen_productos`
--
ALTER TABLE `almacen_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
