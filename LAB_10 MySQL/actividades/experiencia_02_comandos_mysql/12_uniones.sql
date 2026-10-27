SELECT name,author,title FROM customers,classics
WHERE customers.isbn=classics.isbn;
SELECT name,author,title FROM customers NATURAL JOIN classics;
SELECT name,author,title FROM customers
JOIN classics ON customers.isbn=classics.isbn;
SELECT name,author,title FROM customers AS cust,classics AS class
WHERE cust.isbn=class.isbn;
