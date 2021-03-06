\c SilethaDB

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS stats;
DROP TABLE IF EXISTS currency;
DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS questLog;

CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(255),
  item_type VARCHAR(255),
  worth INT
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
  class_id INT,
  experience INT,
  level INT,
  health INT,
  gold INT
);

CREATE TABLE classes (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(255)
);

CREATE TABLE inventory (
  character_id INT,
  entry_id SERIAL PRIMARY KEY,
  item_id INT,
  isEquipped BOOLEAN
);

CREATE TABLE quests (
  quest_id SERIAL PRIMARY KEY,
  quest_name VARCHAR(255),
  quest_obj VARCHAR(255),
  requirements INT
);

CREATE TABLE questLog (
  entry_id SERIAL PRIMARY KEY,
  character_id INT,
  quest_id INT,
  requirements INT,
  isComplete BOOLEAN
);

CREATE TABLE stats (
  character_id INT,
  strength INT,
  stamina INT,
  defense INT,
  intellect INT
);
