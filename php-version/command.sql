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

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "簿記太郎", "3級", "商業簿記", "現金を盗まれることは「簿記上の取引」になるんですね");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "原価紀子", "1級", "会計学", "なんとしても公認会計士になりたい");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "損益史郎", "3級", "商業簿記", "え? 今って為替手形が出題されないの?");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "日商花子", "2級", "商業簿記", "「仕訳に始まり仕訳に終わる」という言葉の意味を痛感するこの頃");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "会計三郎", "2級", "工業簿記", "初めての工業簿記にいろいろと苦戦中");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "財務次郎", "1級", "商業簿記", "2級の問題をハイスピードで満点近くとれるよう復習中");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "貸借佳子", "3級", "商業簿記", "貸方と借方がまだマスターできていません");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "経理敦", "3級", "商業簿記", "まだ3級なのにNPOで経理を任されている俺");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "差似太図", "2級", "工業簿記", "<b>まさか太字になっていませんよね</b>");

INSERT INTO bbs (date, name, category, subCategory, message) VALUES (NOW(), "江洲啓婦", "1級", "商業簿記", "あたしが簿記を始めたときは消費税が3%の時代だったわ");
