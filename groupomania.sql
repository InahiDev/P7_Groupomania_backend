-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `dislikes` int NOT NULL DEFAULT '0',
  `usersLiked` json NOT NULL,
  `usersDisliked` json NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'A changing new text for post 2',NULL,2,0,'[\"66e50fa9-6b2d-4dec-8e1e-da2f85b297ee\", \"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','[]','66e50fa9-6b2d-4dec-8e1e-da2f85b297ee','2022-07-13 12:06:42','2022-08-06 15:54:35'),(35,'Une description détaillée','http://localhost:3000/images/annie-spratt-Eg1qcIitAuA-unsplash.jpg1659708649132.jpg',2,0,'[\"66e50fa9-6b2d-4dec-8e1e-da2f85b297ee\", \"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','[]','2df7f77b-34ef-4682-87ad-b8b06758659b','2022-08-02 13:51:36','2022-08-06 15:53:40'),(71,'J\'avais pas vraiment envie de dire ceci',NULL,1,1,'[\"66e50fa9-6b2d-4dec-8e1e-da2f85b297ee\"]','[\"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','2df7f77b-34ef-4682-87ad-b8b06758659b','2022-08-03 06:13:30','2022-08-08 09:19:56'),(83,'Un texte beaucoup plus long qui parle de beaucoup de chose répétées... Un texte beaucoup plus long qui parle de beaucoup de chose répétées... Un texte beaucoup plus long qui parle de beaucoup de chose répétées... Un texte beaucoup plus long qui parle','http://localhost:3000/images/kevin-hikari-rV_Qd1l-VXg-unsplash.jpg1659812295616.jpg',2,0,'[\"66e50fa9-6b2d-4dec-8e1e-da2f85b297ee\", \"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','[]','2df7f77b-34ef-4682-87ad-b8b06758659b','2022-08-03 17:11:08','2022-08-06 18:58:15'),(84,'Une nouvelle description','http://localhost:3000/images/nicate-lee-kT-ZyaiwBe0-unsplash.jpg1659719424603.jpg',3,0,'[\"66e50fa9-6b2d-4dec-8e1e-da2f85b297ee\", \"d82b9b24-d908-4257-a3d7-152d7745689d\", \"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','[]','2df7f77b-34ef-4682-87ad-b8b06758659b','2022-08-04 12:18:29','2022-08-07 16:56:28'),(98,'Une nouvelle description de la chambre parentale','http://localhost:3000/images/aw-creative-VGs8z60yT2c-unsplash.jpg1659950262334.jpg',1,1,'[\"2df7f77b-34ef-4682-87ad-b8b06758659b\"]','[\"d82b9b24-d908-4257-a3d7-152d7745689d\"]','2df7f77b-34ef-4682-87ad-b8b06758659b','2022-08-06 15:54:55','2022-08-08 09:19:36');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2df7f77b-34ef-4682-87ad-b8b06758659b','user2@mail.com','$2b$10$fwAENwZs6/LOgztI1kSUj.Z.zvPzMUAUY13IMChVgZ.8PmrcAGGDu',0),('66e50fa9-6b2d-4dec-8e1e-da2f85b297ee','user1@mail.com','$2b$10$9lbbjgR.DYG.lSMm9aR4Y.afyZ0qVNdv19OmYzsVGh/NhFHma2LSi',0),('789e3349-31d5-4430-9318-3c5d51d88751','user3@mail.com','$2b$10$lAOfLFFviqFW7/0qNw0md..c.TJy7bfQxH.cPQU0/hICYv4mbcsaq',0),('d0f9cdce-500d-4d9f-b870-d4441ead6432','user4@mail.com','$2b$10$Td7JyC0bJapY6ihk2yfnS.3saNqq5XVpFRwVkLW3i3WkLEFVc2cSu',0),('d82b9b24-d908-4257-a3d7-152d7745689d','admin@groupomania.com','$2b$10$JsV3Ux96/IeFYJNdJd09Ue4mcc/ywGVASraHssO0plc8Xa5jVCUs2',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-08 19:59:23
