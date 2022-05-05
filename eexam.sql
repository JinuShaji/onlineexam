-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2021 at 11:00 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eexam`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `Rgno` int(20) NOT NULL,
  `pid` varchar(20) NOT NULL,
  `ans1` varchar(20) NOT NULL,
  `ans2` varchar(20) NOT NULL,
  `ans3` varchar(20) NOT NULL,
  `ans4` varchar(20) NOT NULL,
  `ans5` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`Rgno`, `pid`, `ans1`, `ans2`, `ans3`, `ans4`, `ans5`) VALUES
(1000, 'CS', 'nodejs', 'template engine', 'database', 'user inter face', 'code '),
(1000, 'cs', 'nodejs', 'language', 'database', 'user inter face', 'repostry'),
(1001, 'cs', 'php', 'template engine', 'labguage', 'code', 'repostry'),
(1001, 'cs', 'php', 'template engine', 'labguage', 'code', 'repostry'),
(1001, 'cs', 'php', 'template engine', 'labguage', 'code', 'repostry'),
(1001, 'cs', 'php', 'template engine', 'labguage', 'code', 'repostry');

-- --------------------------------------------------------

--
-- Table structure for table `defanswer`
--

CREATE TABLE `defanswer` (
  `Rgno` int(20) NOT NULL,
  `SubId` varchar(20) NOT NULL,
  `ans1` varchar(255) NOT NULL,
  `ans2` varchar(255) NOT NULL,
  `ans3` varchar(255) NOT NULL,
  `ans4` varchar(255) NOT NULL,
  `ans5` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defanswer`
--

INSERT INTO `defanswer` (`Rgno`, `SubId`, `ans1`, `ans2`, `ans3`, `ans4`, `ans5`) VALUES
(1000, '11', 'annannannnannannanna', 'lllakalkajahag', 'hkjsuha', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `defenition_type`
--

CREATE TABLE `defenition_type` (
  `sub` varchar(200) NOT NULL,
  `qid` int(20) NOT NULL,
  `qno` int(20) NOT NULL,
  `qtn` varchar(255) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defenition_type`
--

INSERT INTO `defenition_type` (`sub`, `qid`, `qno`, `qtn`, `time`) VALUES
('CS', 11, 1, 'bubble sorting', '10'),
('CS', 11, 2, 'what Is Array', '5'),
('CS', 11, 3, 'what is linked list ', '5');

-- --------------------------------------------------------

--
-- Table structure for table `defmark`
--

CREATE TABLE `defmark` (
  `Rgno` int(20) NOT NULL,
  `mark` int(20) NOT NULL,
  `papperid` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defmark`
--

INSERT INTO `defmark` (`Rgno`, `mark`, `papperid`) VALUES
(1000, 50, 11),
(1000, 60, 11);

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `Rgno` int(25) NOT NULL,
  `mark` float(7,5) NOT NULL,
  `subject` varchar(10) NOT NULL,
  `cata` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`Rgno`, `mark`, `subject`, `cata`) VALUES
(1000, 30.00000, 'cs', 'multiple'),
(1000, 35.00000, 'cs', 'multiple'),
(1000, 35.00000, 'CS', 'multiple'),
(1000, 55.00000, 'CS', 'multiple');

-- --------------------------------------------------------

--
-- Table structure for table `multiple_choice`
--

CREATE TABLE `multiple_choice` (
  `sub` varchar(20) NOT NULL,
  `qid` int(20) NOT NULL,
  `qno` int(20) NOT NULL,
  `qtn` varchar(255) NOT NULL,
  `option1` varchar(100) NOT NULL,
  `option2` varchar(100) NOT NULL,
  `option3` varchar(100) NOT NULL,
  `option4` varchar(100) NOT NULL,
  `Roption` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `multiple_choice`
--

INSERT INTO `multiple_choice` (`sub`, `qid`, `qno`, `qtn`, `option1`, `option2`, `option3`, `option4`, `Roption`, `time`) VALUES
('CS', 10, 1, 'Most popular languae in 2021', 'nodejs', 'php', 'python', 'c++', 'nodejs', '1 minute'),
('CS', 10, 1, 'Most popular languae in 2021', 'nodejs', 'php', 'python', 'c++', 'nodejs', '1 minute'),
('cs', 10, 2, 'what is ejs', 'language', 'template engine', 'complailer', 'company', 'template engine', '1 minute'),
('CS', 10, 3, 'what is mysql', 'labguage', 'database', 'website', 'android App', 'database', '1 minute'),
('CS', 10, 4, 'what is UI', 'language', 'code', 'user inter face', 'plat form', 'user inter face', '1'),
('CS', 10, 5, 'what is github', 'language', 'code ', 'repostry', 'database', 'repostry', '1');

-- --------------------------------------------------------

--
-- Table structure for table `stafflog`
--

CREATE TABLE `stafflog` (
  `Uid` int(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stafflog`
--

INSERT INTO `stafflog` (`Uid`, `password`, `pic`, `name`) VALUES
(100, '123', 'IMG-20190312-WA0050.jpg', 'anaz'),
(101, '123', 'IMG-20190505-WA0017.jpg', 'somy');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Uid` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `batch` varchar(20) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Uid`, `password`, `batch`, `pic`, `name`) VALUES
('1000', '123', 'CS', 'IMG-20190505-WA0017.jpg', 'akash');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stafflog`
--
ALTER TABLE `stafflog`
  ADD UNIQUE KEY `Uid` (`Uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
