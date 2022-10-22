INSERT INTO departments (department)
VALUES ("Sales"),
("Marketing"),
("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesman", 50000, 1),
("Accountant", 75000, 3),
("Manager", 90000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Manny", "McManager", 3, NULL),
("Jane", "Doe", 2, 1),
("Saley", "McSalesman", 1, 1);