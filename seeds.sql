-- insert into table (schema) values (values following schema)
INSERT INTO department (department_name)
VALUES ("department 1"), ("department 2"), ("department 3"), ("department 4");

INSERT INTO role (title, salary, department_id)
VALUES ("role 1", 40000, 1), ("role 2", 85000, 1), ("role 3", 140000, 2), ("role 4", 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Lawrence", 4, null), ("Terry", "Test", 1, 3), ("Jacob", "Johnson", 3, 4), ("Employee", "Lastname", 2, 3);