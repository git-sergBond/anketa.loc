-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 27 2018 г., 22:21
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `anketa`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authorization`
--

CREATE TABLE `authorization` (
  `id` bigint(20) NOT NULL,
  `login` longtext NOT NULL,
  `password` longtext,
  `id_type_person` bigint(20) DEFAULT NULL,
  `group` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `authorization`
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
(15, '17', '17', 17, '17'),
(16, '4', '4', 1, '2'),
(17, '35', '5', 2, '5'),
(18, '356', '3', 1, 't'),
(19, 'q', 'q', 1, 'q'),
(20, 'w', 'w', 2, 'w'),
(21, 'e', 'e', 3, 'e');

-- --------------------------------------------------------

--
-- Структура таблицы `conf_rules`
--

CREATE TABLE `conf_rules` (
  `id` bigint(20) NOT NULL,
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
  `h` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `conf_rules`
--

INSERT INTO `conf_rules` (`id`, `id_test`, `id_type`, `id_A`, `id_B`, `id_C`, `id_A_val`, `id_B_val`, `id_C_val`, `conclusion`, `kof`, `type_kof`, `num_rule`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`) VALUES
(4, 1, 1, 1, 2, 3, 2, 3, 2, 'Трудоустройство по др. специальности', 1, 1, 1, 10, 20, 30, 40, 50, 60, 70, 80),
(5, 1, 2, 1, 3, 2, 2, 2, 2, 'Трудоустройство по др. специальности', 1, 2, 1, 10, 20, 30, 40, 50, 60, 70, 80),
(6, 1, 3, 1, 3, 1, 2, 3, 3, 'Трудоустройство по др. специальности', 1, 3, 1, 10, 20, 30, 40, 50, 60, 70, 80),
(7, 1, 1, 1, 2, 2, 2, 3, 3, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 1, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(8, 1, 2, 1, 1, 3, 2, 2, 2, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 2, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(9, 1, 3, 1, 2, 2, 2, 3, 3, 'Продолжение обучения в магистратуре вуза по тому же направлению', 1, 3, 2, 10, 20, 30, 40, 50, 60, 70, 80),
(31, 1, 1, 4, 4, 4, 1, 1, 1, '', 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0),
(32, 1, 4, 5, 5, 5, 2, 2, 2, '', 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 1, 6, 6, 6, 6, 3, 3, 3, '', 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `id_test` bigint(20) DEFAULT NULL,
  `id_type` bigint(20) DEFAULT NULL,
  `question` longtext,
  `number` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`id`, `id_test`, `id_type`, `question`, `number`) VALUES
(1, 1, 1, 'Положительное отношение к специальности (направлению)?', 2),
(2, 1, 1, 'Положительное отношение к учебе', 4),
(3, 1, 1, 'положит отнош к вузу', NULL),
(4, 1, 2, 'уровень практич навыков', NULL),
(5, 1, 2, 'уровень теоретических навыков', NULL),
(10, NULL, NULL, '', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `res_testing`
--

CREATE TABLE `res_testing` (
  `id` bigint(20) NOT NULL,
  `id_pers` bigint(20) DEFAULT NULL,
  `id_question` bigint(20) DEFAULT NULL,
  `answer` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `res_testing`
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
(59, 15, 5, 3),
(60, 8, 2, 0),
(61, 8, 3, 1),
(62, 8, 4, 2),
(63, 8, 5, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `rules`
--

CREATE TABLE `rules` (
  `id` bigint(20) NOT NULL,
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
  `f10` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rules`
--

INSERT INTO `rules` (`id`, `name`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `id_questions`, `id_tests`, `f1`, `f2`, `f3`, `f4`, `f5`, `f6`, `f7`, `f8`, `f9`, `f10`) VALUES
(1, 'Вопрос 1', '6', '22', '33', '44', '55', '66', '77', '99', 1, 1, '0', '2', '3', '4', '5', '6', '7', '0,5', '9', 10),
(2, 'Вопрос 2', '3', '22', '33', '44', '55', '66', '77', '99', 2, 1, '2', '7', '11', '15', '20', '25', '30', '35', '9', NULL),
(3, 'Вопрос 3', '2', '22', '33', '44', '55', '66', '77', '99', 3, 1, '3', '8', '12', '16', '21', '26', '31', '36', '', NULL),
(4, 'Вопрос 4', '2', '2', '3', '3', '4', '4', '5', '5', 4, 1, '4', '9', '13', '17', '22', '27', '32', '37', '', NULL),
(5, 'Вопрос 5', '2', '2', '3', '3', '4', '4', '5', '5', 5, 1, '5', '10', '14', '18', '23', '28', '33', '38', '', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `tests`
--

CREATE TABLE `tests` (
  `id` bigint(20) NOT NULL,
  `name` longtext,
  `id_redactor` bigint(20) DEFAULT NULL,
  `data_create` bigint(20) DEFAULT NULL,
  `data_edit` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tests`
--

INSERT INTO `tests` (`id`, `name`, `id_redactor`, `data_create`, `data_edit`) VALUES
(1, 'проверка на дибилла', 1, 90999, 90999);

-- --------------------------------------------------------

--
-- Структура таблицы `type_person`
--

CREATE TABLE `type_person` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `access_pin_cod` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `type_question`
--

CREATE TABLE `type_question` (
  `id` bigint(20) NOT NULL,
  `name` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `type_rules`
--

CREATE TABLE `type_rules` (
  `id` bigint(20) NOT NULL,
  `name` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `type_rules`
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
-- Структура таблицы `type_val_ABC`
--

CREATE TABLE `type_val_ABC` (
  `id` bigint(20) NOT NULL,
  `name` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `type_val_ABC`
--

INSERT INTO `type_val_ABC` (`id`, `name`) VALUES
(1, 'низкий'),
(2, 'средний'),
(3, 'высокий');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authorization`
--
ALTER TABLE `authorization`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `conf_rules`
--
ALTER TABLE `conf_rules`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `res_testing`
--
ALTER TABLE `res_testing`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_person`
--
ALTER TABLE `type_person`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_question`
--
ALTER TABLE `type_question`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_rules`
--
ALTER TABLE `type_rules`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_val_ABC`
--
ALTER TABLE `type_val_ABC`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authorization`
--
ALTER TABLE `authorization`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `conf_rules`
--
ALTER TABLE `conf_rules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `res_testing`
--
ALTER TABLE `res_testing`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT для таблицы `rules`
--
ALTER TABLE `rules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `tests`
--
ALTER TABLE `tests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `type_rules`
--
ALTER TABLE `type_rules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `type_val_ABC`
--
ALTER TABLE `type_val_ABC`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
