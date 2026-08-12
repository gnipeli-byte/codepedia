DROP DATABASE bbsDB;

CREATE DATABASE bbsDB;

USE bbsDB;

CREATE TABLE bbs (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	date DATETIME,
	name VARCHAR(64),
	category CHAR(4),
	subCategory CHAR(8),
	message VARCHAR(256)
);

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "tomiヨシ", "初級", "HTML・CSS", "floatとflexboxの違いがまだよく分かってない");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "ヤマヨシ", "中級", "JavaScript", "fetchとajaxの使い分けで詰まってる");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "ほたて", "初級", "環境構築", "ローカル環境構築のことなら詳しいです");