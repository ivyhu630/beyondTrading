-- psql -d beyondtrading -f database/schema.sql -a

DROP DATABASE IF EXISTS beyondtrading;
CREATE DATABASE beyondtrading;
-- CONNECT beyondtrading;

DROP TABLE IF EXISTS Transactions;

CREATE TABLE Transactions (
  id SERIAL,
  price INT,
  shares INT NOT NULL,
  symbol VARCHAR(20),
  companyName VARCHAR(50),
  transaction_date timestamp without time zone DEFAULT current_timestamp,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id SERIAL,
  username VARCHAR(20) NOT NULL DEFAULT 'testUser',
  cash MONEY DEFAULT 10000.00,
  PRIMARY KEY (id)
);




-- CREATE INDEX product_id_idx ON questions (product_id);
-- CREATE INDEX photoAnswer_id_idx ON photos (answer_id);
-- CREATE INDEX answer_question_id_idx ON answers (question_id);
-- CREATE INDEX answer_reported_idx ON answers (reported);
-- CREATE INDEX question_reported_idx ON questions (reported);