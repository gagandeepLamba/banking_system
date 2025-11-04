-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 10:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `accountNumber` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `accountNumber`, `balance`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 'AC08869208447', 0, 1, 'active', '2025-11-03 22:27:49', '2025-11-03 22:27:49'),
(7, 'AC44428210990', 10, 12, 'active', '2025-11-04 08:20:28', '2025-11-04 08:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `log` text NOT NULL,
  `haveError` tinyint(1) DEFAULT 0,
  `user_id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT 2,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `log`, `haveError`, `user_id`, `type`, `createdAt`, `updatedAt`) VALUES
(15, 'Admin 1 created account 4', 0, 1, 1, '2025-11-03 22:27:49', '2025-11-03 22:27:49'),
(16, 'Admin 1 created account 5', 0, 1, 1, '2025-11-03 22:28:32', '2025-11-03 22:28:32'),
(17, 'Admin 1 deleted account 10', 0, 1, 2, '2025-11-03 22:28:40', '2025-11-03 22:28:40'),
(18, 'Admin 1 created account 6', 0, 1, 1, '2025-11-03 22:32:12', '2025-11-03 22:32:12'),
(19, 'Admin 1 deleted account 11', 0, 1, 2, '2025-11-03 22:32:19', '2025-11-03 22:32:19'),
(20, 'User login 1', 0, 1, 1, '2025-11-04 08:16:32', '2025-11-04 08:16:32'),
(21, 'User login 1', 0, 1, 1, '2025-11-04 08:17:18', '2025-11-04 08:17:18'),
(22, 'User login 1', 0, 1, 1, '2025-11-04 08:19:57', '2025-11-04 08:19:57'),
(23, 'Admin 1 created account 7', 0, 1, 1, '2025-11-04 08:20:28', '2025-11-04 08:20:28'),
(24, 'User login 12', 0, 12, 1, '2025-11-04 08:20:47', '2025-11-04 08:20:47');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `type` enum('credit','debit') DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `balanceAfter` float DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `status` enum('active','inactive') DEFAULT 'inactive',
  `address` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `role`, `status`, `address`, `profilePicture`, `createdAt`, `updatedAt`) VALUES
(1, 'Gagandeep Lamba', 'gaganlmb@gmail.com', '0522110425', '$2b$10$xYg3kPFUEeqqrmHbidafCOsnmf2tVHOxiiqLX0WYkbT4/np.bfT3u', 'admin', 'active', NULL, NULL, '2025-11-03 21:00:32', '2025-11-03 21:00:32'),
(12, 'neha', 'neha@gmail.com', '766867687', '$2a$10$1so6IxYkL3iMOaUHZJQ0XemS/LMydOst.STbJimVOfEOCo9QiIIv2', 'user', 'active', NULL, 'na', '2025-11-04 08:20:28', '2025-11-04 08:20:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountNumber` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_2` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_3` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_4` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_5` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_6` (`accountNumber`),
  ADD UNIQUE KEY `accountNumber_7` (`accountNumber`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `mobile_2` (`mobile`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `mobile_3` (`mobile`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `mobile_4` (`mobile`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `mobile_5` (`mobile`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `mobile_6` (`mobile`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `mobile_7` (`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
