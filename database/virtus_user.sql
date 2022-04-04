-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: virtus
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `author_id` int NOT NULL,
  `criado_em` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'2022-03-16 21:10:15.048000','gilbertogil@gmail.com.br','+5561999999999','Gilberto Gil','12345678',1,'gilberto_gil'),(2,2,'2022-03-16 21:10:15.048000','caetanoveloso@gmail.com.br','+5561999999999','Caetano Veloso','12345678',2,'caetano_veloso'),(3,3,'2022-03-16 21:10:15.048000','chicobuarque@gmail.com.br','+5561999999999','Chico Buarque','12345678',3,'chico_buarque'),(4,4,'2022-03-16 21:10:15.048000','jorgebenjor@gmail.com.br','+5561999999999','Jorge BenJor','12345678',1,'jorge_ben_jor'),(5,5,'2022-03-16 21:10:15.048000','tomjobim@gmail.com.br','+5561999999999','Tom Jobim','12345678',2,'tom_jobim'),(6,6,'2022-03-16 21:10:15.048000','miltonnascimento@gmail.com.br','+5561999999999','Milton Nascimento','12345678',3,'milton_nascimento'),(7,7,'2022-03-16 21:10:15.048000','elisregina@gmail.com.br','+5561999999999','Elis Regina','12345678',1,'elis_regina'),(8,8,'2022-03-16 21:10:15.048000','joaogilberto@gmail.com.br','+5561999999999','João Gilberto','12345678',2,'joao_gilberto'),(9,9,'2022-03-16 21:10:15.048000','toquinho@gmail.com.br','+5561999999999','Toquinho','12345678',3,'toquinho'),(10,10,'2022-03-16 21:10:15.048000','viniciusmoraes@gmail.com.br','+5561999999999','Vinícius de Moraes','12345678',1,'vinícius_de_moraes'),(11,11,'2022-03-16 21:10:15.048000','robertocarlos@gmail.com.br','+5561999999999','Roberto Carlos','12345678',2,'roberto_carlos'),(12,12,'2022-03-16 21:10:15.048000','naraleao@gmail.com.br','+5561999999999','Nara Leão','12345678',3,'nara_leao'),(13,13,'2022-03-16 21:10:15.048000','djavan@gmail.com.br','+5561999999999','Djavan','12345678',1,'djavan');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-04  8:39:34
