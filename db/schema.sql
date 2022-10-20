DROP DATABASE IF EXISTS employe_information_db;
CREATE DATABASE employe_information_db;

USE employe_information_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) -- id value will be linked to other tables
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id), -- id value of manager will be linked their employees manager_id value
    FOREIGN KEY(manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);