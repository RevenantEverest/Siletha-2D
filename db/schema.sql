\c SilethaDB

DROP TABLE IF EXISTS items
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS characters
DROP TABLE IF EXISTS inventory

CREATE TABLE items {
item_id INT
},

CREATE TABLE users {
user_id SERIAL PRIMARY KEY,
inventory_id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
date_created INT,
},

CREATE TABLE characters {
user_id INT,
character_id SERIAL PRIMARY KEY,
experience INT,
level INT
}

CREATE TABLE inventory {
user_id INT,
inventory_id INT,
item_id INT
}
