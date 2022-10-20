INSERT INTO departments (department)
VALUES ("Sales"),
("Marketing"),
("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesman", 50000, 1),
("Accountant", 75000, 3),
("Manager", 90000, 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Manny", "McManager", 3, NULL),
(2, "Jane", "Doe", 2, 1),
(3, "Saley", "McSalesman", 1, 1);