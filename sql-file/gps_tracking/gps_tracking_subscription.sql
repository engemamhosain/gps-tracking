-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 103.199.168.131    Database: gps_tracking
-- ------------------------------------------------------
-- Server version	5.7.42-0ubuntu0.18.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_serial_number` varchar(255) NOT NULL,
  `startDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `endDate` date DEFAULT NULL,
  `billing_cycle` enum('monthly','yearly') NOT NULL DEFAULT 'monthly',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int(11) DEFAULT NULL,
  `deviceId` int(11) DEFAULT NULL,
  `planId` int(11) DEFAULT NULL,
  `status` enum('pending','active','cancelled','expired') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_cc906b4bc892b048f1b654d2aa0` (`userId`),
  KEY `FK_98c6897ef15654a661bef85da08` (`deviceId`),
  KEY `FK_6b6d0e4dc88105a4a11103dd2cd` (`planId`),
  CONSTRAINT `FK_6b6d0e4dc88105a4a11103dd2cd` FOREIGN KEY (`planId`) REFERENCES `plan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_98c6897ef15654a661bef85da08` FOREIGN KEY (`deviceId`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_cc906b4bc892b048f1b654d2aa0` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (1,'SN1234567890','2024-10-10 00:00:00.000000','2025-10-10','yearly','2024-10-09 13:05:53.917140','2024-10-09 13:05:53.917140',3,NULL,2,'pending'),(2,'SN1234567894','2024-10-10 00:00:00.000000','2025-10-10','yearly','2024-10-09 13:29:44.847885','2024-10-09 13:29:44.847885',3,4,2,'pending'),(3,'SN1234567894','2024-10-10 00:00:00.000000','2025-10-10','yearly','2024-10-09 13:34:37.012266','2024-10-09 13:34:37.012266',3,4,2,'pending'),(4,'SN1234567894','2024-10-09 13:48:59.179000','2024-11-09','yearly','2024-10-09 13:48:59.192274','2024-10-09 13:48:59.192274',3,4,2,'pending');
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 17:53:59
