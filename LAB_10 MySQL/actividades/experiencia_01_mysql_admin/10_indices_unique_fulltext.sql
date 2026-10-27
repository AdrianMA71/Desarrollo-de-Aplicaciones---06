ALTER TABLE classics ADD UNIQUE(isbn);
ALTER TABLE classics ADD FULLTEXT(author,title);
DESCRIBE classics;
