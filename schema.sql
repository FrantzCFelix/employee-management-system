DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL

);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
     INDEX dep_ind (department_id),
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_role_id FOREIGN KEY (role_id)  REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
