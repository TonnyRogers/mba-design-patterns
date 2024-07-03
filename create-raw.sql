CREATE TABLE contract (
	id VARCHAR NOT NULL PRIMARY KEY,
	description VARCHAR,
	amount int,
	periods int,
	date TIMESTAMP(0)
);

CREATE TABLE payment (
	id VARCHAR NOT NULL PRIMARY KEY,
	contract_id VARCHAR not null,
	description VARCHAR,
	amount int,
	date TIMESTAMP(0)
);

ALTER TABLE payment ADD CONSTRAINT contract_id_foreing_key FOREIGN KEY (contract_id) REFERENCES contract (id) ON UPDATE CASCADE ON DELETE NO ACTION;