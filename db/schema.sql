\c SilethaDB

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS inventory;

CREATE TABLE items (
item_id INT,
item_name VARCHAR(255),
item_type VARCHAR(255)
);

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
date_created INT
);

CREATE TABLE characters (
user_id INT,
character_id SERIAL PRIMARY KEY,
name VARCHAR(255),
class VARCHAR(255),
experience INT,
level INT
);

CREATE TABLE inventory (
character_id INT,
inventory_id INT,
item_id INT,
isEquipped BOOLEAN
);

CREATE TABLE stats (
character_id INT,
strength INT,
stamina INT,
defense INT,
intellect INT
);

CREATE TABLE currency (
  character_id INT,
  gold INT
);
