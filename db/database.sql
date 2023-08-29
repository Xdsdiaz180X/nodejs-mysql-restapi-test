CREATE DATABASE  IF NOT EXISTS companydb;

use companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id) 
);

describe employee;

insert into employee values
 (1, 'joe', 10000),
 (2, 'davidsson', 50000),
 (3, 'erika', 30000),
 (4, 'david', 100);
