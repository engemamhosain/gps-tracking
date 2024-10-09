mysql schema

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Devices Table
CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  device_name VARCHAR(100),
  device_serial_number VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Locations Table
CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  altitude DECIMAL(8, 2) NULL,
  speed DECIMAL(5, 2) NULL,
  timestamp DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Geofence Table (Optional)
CREATE TABLE geofence (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT,
  fence_name VARCHAR(100),
  center_latitude DECIMAL(10, 8) NOT NULL,
  center_longitude DECIMAL(11, 8) NOT NULL,
  radius DECIMAL(6, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Alerts Table (Optional)
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT,
  alert_type VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);


*********************************


-- Plans Table
CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_id INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('active', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subscription_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer'),
  payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
);

-- Billing Cycle Table (Optional)
CREATE TABLE billing_cycles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subscription_id INT,
  billing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  next_billing_date TIMESTAMP,
  status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
);

-- Notifications Table (Optional)
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT,
  notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_status ENUM('read', 'unread') DEFAULT 'unread',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);




nest generate module Admin
nest generate service Admin
nest generate controller Admin

nest generate module auth
nest generate service auth
nest generate controller auth



nest generate module User
nest generate service User
nest generate controller User

nest generate module device
nest generate service device
nest generate controller device


nest generate module location
nest generate service location
nest generate controller location


nest generate module Route
nest generate service Route
nest generate controller Route

nest generate module Alert
nest generate service Alert
nest generate controller Alert

nest generate module Geofence
nest generate service Geofence
nest generate controller Geofence

nest generate module Trip
nest generate service Trip
nest generate controller Trip




nest generate module Plan
nest generate service Plan
nest generate controller Plan

nest generate module Subscription
nest generate service Subscription
nest generate controller Subscription


api

curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "testpassword"}'
