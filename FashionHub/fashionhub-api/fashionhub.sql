-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 05 apr 2024 kl 13:01
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fashionhub`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image_path`) VALUES
(21, 'Pants', 'Comfortable and stylish pants for everyday wear.', 49.99, 'byxa.jpg'),
(22, 'Jeans', 'Classic denim jeans suitable for any occasion.', 59.99, 'jeans.jpg'),
(23, 'Cap', 'Grandfathers Russian ushanka', 19.99, 'mössa.jpg'),
(24, 'Socks', 'Soft and cozy socks for ultimate comfort.', 9.99, 'strumpor.jpg'),
(25, 'Jacket', 'Stylish jacket to keep you warm in chilly weather.', 79.99, 'jacka.jpg'),
(26, 'T-shirt', 'Casual and versatile t-shirt for everyday wear.', 29.99, 't-shirt.jpg'),
(27, 'Underwear', 'Comfortable underwear for all-day support.', 14.99, 'boxer-shorts.jpg'),
(28, 'Shirt', 'Classic shirt for a polished look.', 39.99, 'skjorta.jpg'),
(29, 'Shoes', 'Comfortable and stylish shoes for every occasion.', 69.99, 'skor.jpg');

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(3, 'mamuka@mail.com', '$2b$10$0P9tcsSpcpjhKYrUM3zo2OBUWB6pNRg/swV5Gwt/WjAq39QGxOZb6', '2024-03-27 21:48:39'),
(4, 'seb@seb.se', '$2b$10$xYpKZTan8a03j7l8qLb4vu7kObC6o9CSeYzuP1/kvak3zEV7/eXie', '2024-03-28 08:54:49'),
(7, 'dino_crizis@yahoo.com', '$2b$10$pAnUD4E4wCfCDjl5Aswek.RJzGsupskKH5WTJ8bkV45bnnvzEW3zW', '2024-03-29 15:13:15'),
(8, 'kakusi@mail.ru', '$2b$10$gGICTdfK0egNAvvekFT3hOUCXnMAg3imPIVNxJqfS830suVAT2/vG', '2024-04-02 08:54:56');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
