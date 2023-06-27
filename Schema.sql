CREATE DATABASE `food_delivery`;

use `food_delivery`

CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `res_address` varchar(50) NOT NULL,
  `email_address` varchar(30) NOT NULL,
  `customer_password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `resturants` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phoneNo1` varchar(20) NOT NULL,
  `phoneNo2` varchar(20) DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `menus` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` decimal(4,2) NOT NULL,
  `restaurant_id` int NOT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `fk_resuturant_id` (`restaurant_id`),
  CONSTRAINT `fk_resuturant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `resturants` (`restaurant_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `order_statuses` (
  `order_status_id` tinyint NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO order_statuses
(order_status_id, name)
VALUES(1, 'pending');
INSERT INTO order_statuses
(order_status_id, name)
VALUES(2, 'processing');
INSERT INTO order_statuses
(order_status_id, name)
VALUES(3, 'ready_for_delivery');
INSERT INTO order_statuses
(order_status_id, name)
VALUES(4, 'delivered');


CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `order_date` date NOT NULL,
  `restaurant_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL,
  `comments` varchar(2000) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `processed_by` varchar(50) NOT NULL,
  `batch_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customers` (`customer_id`),
  KEY `fk_orders_order_statuses` (`status`),
  KEY `fk_orders_menu` (`menu_id`),
  KEY `fk_orders_resturant` (`restaurant_id`),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`menu_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_order_statuses` FOREIGN KEY (`status`) REFERENCES `order_statuses` (`order_status_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_resturant` FOREIGN KEY (`restaurant_id`) REFERENCES `resturants` (`restaurant_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
