USE employeeTracker_DB;

INSERT INTO department (department_name) VALUES ("Research & Development");
INSERT INTO department (department_name) VALUES ("BioTech");
INSERT INTO department (department_name) VALUES ("IT Services");

INSERT INTO role (title, salary, department_id) VALUES ("Chief Bio-Analyst", 120, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Research Associate", 90, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lab Tech", 150, 2);
INSERT INTO role (title, salary, department_id) VALUES ("IT helpdesk analyst", 65, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Assistant of Bio-diversity", 120, 2);
INSERT INTO role (title, salary, department_id) VALUES ("COO Development", 65, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Hank ", "Azaria", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Yogi", "Berra", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Giancarlo", "Stanton", 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mookie", "Betts", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Zak", "Grienke", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Andrew", "McCutchen", 3);