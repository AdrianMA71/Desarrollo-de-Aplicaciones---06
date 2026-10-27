CREATE TABLE accounts (
   number INT,
   balance FLOAT,
   PRIMARY KEY(number)
) ENGINE InnoDB;
INSERT INTO accounts(number,balance) VALUES(12345,1025.50);
INSERT INTO accounts(number,balance) VALUES(67890,140.00);
SELECT * FROM accounts;
