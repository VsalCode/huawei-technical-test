CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(100),
    join_date DATE,
    release_date DATE,
    year_of_experience NUMERIC(4,1),
    salary NUMERIC(10,2)
);

-- seed data
INSERT INTO employees 
(name, position, join_date, release_date, year_of_experience, salary) VALUES
('Jacky', 'Solution Architect', TO_DATE('25-Jul-18', 'DD-Mon-YY'), TO_DATE('25-Jul-22', 'DD-Mon-YY'), 8, 150),
('John', 'Assistan Manager', TO_DATE('02-Feb-16', 'DD-Mon-YY'), TO_DATE('02-Feb-21', 'DD-Mon-YY'), 12, 155),
('Alano', 'Manager', TO_DATE('09-Nov-10', 'DD-Mon-YY'), NULL, 14, 175),
('Aaron', 'Engineer', TO_DATE('16-Aug-21', 'DD-Mon-YY'), TO_DATE('16-Aug-22', 'DD-Mon-YY'), 1, 80),
('Allen', 'Engineer', TO_DATE('06-Jun-24', 'DD-Mon-YY'), NULL, 4, 75),
('Peter', 'Team Leader', TO_DATE('09-Jan-20', 'DD-Mon-YY'), NULL, 3, 85);
