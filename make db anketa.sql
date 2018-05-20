-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 19, 2018 at 11:03 PM
-- Server version: 5.5.59-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `anketa`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorization`
--

CREATE TABLE IF NOT EXISTS `authorization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` longtext NOT NULL,
  `password` longtext,
  `id_type_person` bigint(20) DEFAULT NULL,
  `group` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `authorization`
--

INSERT INTO `authorization` (`id`, `login`, `password`, `id_type_person`, `group`) VALUES
(1, 'ss', 'ss', 0, '29'),
(2, '23132313231', '123123213', 1, '29'),
(3, 'Вася', 'Васичкин', 1, '29'),
(5, 'login', '123', 123, '123'),
(6, '1', '1', 0, ''),
(7, '2', '2', 0, ''),
(8, '3', '3', 0, ''),
(9, '10', '10', 22, ''),
(10, '', '', 0, ''),
(11, '11', '11', 22, '22'),
(12, '12', '12', 12, '12'),
(13, '15', '15', 15, '15'),
(14, '16', '16', 16, '16'),
(15, '17', '17', 17, '17');

-- --------------------------------------------------------

--
-- Table structure for table `conf_rules`
--

CREATE TABLE IF NOT EXISTS `conf_rules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_test` bigint(20) DEFAULT NULL,
  `id_type` bigint(20) DEFAULT NULL,
  `id_A` bigint(20) DEFAULT NULL,
  `id_B` bigint(20) DEFAULT NULL,
  `id_C` bigint(20) DEFAULT NULL,
  `id_A_val` bigint(20) DEFAULT NULL,
  `id_B_val` bigint(20) DEFAULT NULL,
  `id_C_val` bigint(20) DEFAULT NULL,
  `conclusion` longtext,
  `kof` double DEFAULT NULL,
  `type_kof` bigint(20) DEFAULT NULL,
  `num_rule` bigint(20) DEFAULT NULL,
  `a` double DEFAULT NULL,
  `b` double DEFAULT NULL,
  `c` double DEFAULT NULL,
  `d` double DEFAULT NULL,
  `e` double DEFAULT NULL,
  `f` double DEFAULT NULL,
  `g` double DEFAULT NULL,
  `h` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `conf_rules`
--

INSERT INTO `conf_rules` (`id`, `id_test`, `id_type`, `id_A`, `id_B`, `id_C`, `id_A_val`, `id_B_val`, `id_C_val`, `conclusion`, `kof`, `type_kof`, `num_rule`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`) VALUES
(1, 1, 2, 1, 5, 4, 2, 3, 2, 'Трудоустройство по специальности, полученной в вузе', 1, 1, 1, 20, 20, 30, 40, 50, 60, 70, 80),
(2, 1, 2, 1, 3, 4, 2, 2, 3, 'Трудоустройство по специальности, полученной в вузе', 0.4, 2, 1, 20, 20, 30, 40, 50, 60, 70, 80),
(3, 1, 2, 1, 2, 3, 3, 3, 2, 'Трудоустройство по специальности, полученной в вузе', 0.8, 3, 1, 20, 20, 30, 40, 50, 60, 70, 80),
(4, 1, 1, 1, 2, 3, 2, 3, 2, 'Трудоустройство по др. специальности', 1, 1, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(5, 1, 5, 1, 3, 2, 2, 2, 2, 'Трудоустройство по др. специальности', 1, 2, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(6, 1, 5, 1, 3, 1, 2, 3, 3, 'Трудоустройство по др. специальности', 1, 3, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(7, 1, 1, 1, 2, 2, 2, 3, 3, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 1, 3, 10, 20, 30, 40, 50, 60, 70, 80),
(8, 1, 1, 1, 1, 3, 2, 2, 2, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 2, 3, 10, 20, 30, 40, 50, 60, 70, 80),
(9, 1, 1, 1, 2, 2, 3, 3, 3, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 3, 3, 10, 20, 30, 40, 50, 60, 70, 80);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_test` bigint(20) DEFAULT NULL,
  `id_type` bigint(20) DEFAULT NULL,
  `question` longtext,
  `number` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `id_test`, `id_type`, `question`, `number`) VALUES
(1, NULL, NULL, '', NULL),
(2, 1, 1, 'Положительное отношение к специальности (направлению)?', 2),
(3, 1, 1, 'Положительное отношение к вузу?', 3),
(4, 1, 2, 'Уровень теоретических знаний ', 4),
(5, 1, 2, 'Уровень практических навыков (определяется ср. баллом оценок)', 5);

-- --------------------------------------------------------

--
-- Table structure for table `res_testing`
--

CREATE TABLE IF NOT EXISTS `res_testing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_pers` bigint(20) DEFAULT NULL,
  `id_question` bigint(20) DEFAULT NULL,
  `answer` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=60 ;

--
-- Dumping data for table `res_testing`
--

INSERT INTO `res_testing` (`id`, `id_pers`, `id_question`, `answer`) VALUES
(1, 1, 1, 1),
(2, 3, 3, 5),
(3, 2, 2, 0),
(4, 5, 1, 0),
(5, 5, 2, 1),
(6, 5, 3, 1),
(7, 5, 4, 3),
(8, 5, 5, 4),
(9, 123, 5, 5),
(10, 1, 1, 1),
(11, 1, 2, 1),
(12, 1, 3, 1),
(13, 1, 4, 5),
(14, 1, 5, 5),
(15, 1, 1, 1),
(16, 1, 2, 1),
(17, 1, 3, 0),
(18, 1, 4, 5),
(19, 1, 5, 2),
(20, 1, 1, 0),
(21, 1, 2, 1),
(22, 1, 3, 0),
(23, 1, 4, 2),
(24, 1, 5, 5),
(25, 9, 1, 1),
(26, 9, 2, 1),
(27, 9, 3, 1),
(28, 9, 4, 4),
(29, 9, 5, 4),
(30, 9, 1, 1),
(31, 9, 2, 1),
(32, 9, 3, 1),
(33, 9, 4, 4),
(34, 9, 5, 4),
(35, 9, 1, 0),
(36, 9, 2, 0),
(37, 9, 3, 0),
(38, 9, 4, 2),
(39, 9, 5, 2),
(40, 9, 1, 1),
(41, 9, 2, 1),
(42, 9, 3, 1),
(43, 9, 4, 4),
(44, 9, 5, 5),
(45, 9, 1, 0),
(46, 9, 2, 0),
(47, 9, 3, 0),
(48, 9, 4, 3),
(49, 9, 5, 3),
(50, 9, 1, 0),
(51, 9, 2, 1),
(52, 9, 3, 1),
(53, 9, 4, 2),
(54, 9, 5, 2),
(55, 15, 1, 1),
(56, 15, 2, 1),
(57, 15, 3, 0),
(58, 15, 4, 3),
(59, 15, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE IF NOT EXISTS `rules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `a` varchar(255) DEFAULT NULL,
  `b` varchar(255) DEFAULT NULL,
  `c` varchar(255) DEFAULT NULL,
  `d` varchar(255) DEFAULT NULL,
  `e` varchar(255) DEFAULT NULL,
  `f` varchar(255) DEFAULT NULL,
  `g` varchar(255) DEFAULT NULL,
  `h` varchar(255) DEFAULT NULL,
  `id_questions` bigint(20) DEFAULT NULL,
  `id_tests` bigint(20) DEFAULT NULL,
  `f1` varchar(255) DEFAULT '1',
  `f2` varchar(255) DEFAULT '1',
  `f3` varchar(255) DEFAULT '1',
  `f4` varchar(255) DEFAULT '1',
  `f5` varchar(255) DEFAULT '1',
  `f6` varchar(255) DEFAULT '1',
  `f7` varchar(255) DEFAULT '1',
  `f8` varchar(255) DEFAULT '1',
  `f9` varchar(255) DEFAULT NULL,
  `f10` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`id`, `name`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `id_questions`, `id_tests`, `f1`, `f2`, `f3`, `f4`, `f5`, `f6`, `f7`, `f8`, `f9`, `f10`) VALUES
(1, 'Вопрос 1', '7', '22', '33', '44', '55', '66', '77', '99', 1, 1, '0', '2', '3', '4', '5', '6', '7', '0,5', '9', 10),
(2, 'Вопрос 2', '3', '22', '33', '44', '55', '66', '77', '99', 2, 1, '2', '7', '11', '15', '20', '25', '30', '35', '9', NULL),
(3, 'Вопрос 3', '2', '22', '33', '44', '55', '66', '77', '99', 3, 1, '3', '8', '12', '16', '21', '26', '31', '36', '', NULL),
(4, 'Вопрос 4', '2', '2', '3', '3', '4', '4', '5', '5', 4, 1, '4', '9', '13', '17', '22', '27', '32', '37', '', NULL),
(5, 'Вопрос 5', '2', '2', '3', '3', '4', '4', '5', '5', 5, 1, '5', '10', '14', '18', '23', '28', '33', '38', '', NULL),
(6, 'Вопрос 6', '1', '22', '33', '44', '55', '66', '77', '88', 6, 1, '6', '1', '1', '19', '24', '29', '34', '39', '1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `id_redactor` bigint(20) DEFAULT NULL,
  `data_create` bigint(20) DEFAULT NULL,
  `data_edit` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `name`, `id_redactor`, `data_create`, `data_edit`) VALUES
(1, 'проверка на дибилла', 1, 90999, 90999);

-- --------------------------------------------------------

--
-- Table structure for table `type_person`
--

CREATE TABLE IF NOT EXISTS `type_person` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `access_pin_cod` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type_question`
--

CREATE TABLE IF NOT EXISTS `type_question` (
  `id` bigint(20) NOT NULL,
  `name` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type_rules`
--

CREATE TABLE IF NOT EXISTS `type_rules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `type_rules`
--

INSERT INTO `type_rules` (`id`, `name`) VALUES
(1, 'A & B & C'),
(2, 'A & B || C'),
(3, 'A || B & C'),
(4, 'A || B || C'),
(5, 'A & B'),
(6, 'A || B');

-- --------------------------------------------------------

--
-- Table structure for table `type_val_ABC`
--

CREATE TABLE IF NOT EXISTS `type_val_ABC` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `type_val_ABC`
--

INSERT INTO `type_val_ABC` (`id`, `name`) VALUES
(1, 'низкий'),
(2, 'средний'),
(3, 'высокий');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
