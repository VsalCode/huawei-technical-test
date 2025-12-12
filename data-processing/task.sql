
-- 1. INSERT ALBERT
INSERT INTO employees 
(Name, Position, Join_Date, Release_Date, Year_of_Experience, Salary) 
VALUES 
('Albert', 'Engineer', '24-Jan-24', NULL, 2.5, 50);


-- 2. UPDATE SALARY UNTUK ENGINEER MENJADI $85
UPDATE employees 
SET Salary = 85
WHERE Position = 'Engineer';


-- 3. TOTAL SALARY PADA TAHUN 2021 (Employee yang aktif pada tahun 2021)
SELECT 
    SUM(Salary) AS Total_Salary_2021
FROM employees
WHERE 
    YEAR(STR_TO_DATE(Join_Date, '%d-%b-%y')) <= 2021
    AND (
        Release_Date IS NULL 
        OR YEAR(STR_TO_DATE(Release_Date, '%d-%b-%y')) >= 2021
    );


-- 4. TOP 3 KARYAWAN DENGAN EXPERIENCE TERBANYAK
SELECT 
    Name, 
    Year_of_Experience
FROM employees
ORDER BY Year_of_Experience DESC
LIMIT 3;


-- 5. SUBQUERY: ENGINEER DENGAN EXPERIENCE <= 3 TAHUN
SELECT *
FROM employees
WHERE Name IN (
    SELECT Name
    FROM employees
    WHERE Position = 'Engineer'
      AND Year_of_Experience <= 3
);
