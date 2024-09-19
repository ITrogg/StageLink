CREATE TABLE user (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  profile_image varchar(255) NOT NULL DEFAULT 'default_profile_image_url',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO user (username, email, password) VALUES ('JohnnyPunk', 'johnny@example.com', 'password1'),('LilyRiot', 'lily@example.com', 'password2'),('SkateMike', 'mike@example.com', 'password3'),('AnarchyAnne', 'anne@example.com', 'password4'),('GrungeGary', 'gary@example.com', 'password5'),('PunkPrincess', 'princess@example.com', 'password6'),('HardcoreHarry', 'harry@example.com', 'password7'),('IndieIvy', 'ivy@example.com', 'password8'),('RockyRick', 'rick@example.com', 'password9'),('EmoEli', 'eli@example.com', 'password10'),('CrustyChris', 'chris@example.com', 'password11'),('NoiseNina', 'nina@example.com', 'password12'),('GarageGreg', 'greg@example.com', 'password13'),('SynthSue', 'sue@example.com', 'password14'),('WaveWendy', 'wendy@example.com', 'password15');

CREATE TABLE place (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  state varchar(255) NOT NULL,
  country varchar(255) NOT NULL,
  postal_code varchar(255) NOT NULL,
  capacity int,
  logo varchar(255),
  latitude decimal(9,6) NOT NULL,
  longitude decimal(9,6) NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO place (name, address, city, state, country, postal_code, capacity, latitude, longitude) VALUES ('Au Bout de Nos Rêves', 'Grand\'Route 141', 'Tournai', 'Wallonie', 'Belgique', '7500', 100, 50.595729, 3.480900),('Le Grand Mix', '5 Rue de l\'Hôpital Militaire', 'Tourcoing', 'Nord', 'France', '59200', 2000, 50.721500, 3.157000),('Aéronef', '168 Avenue Willy Brandt', 'Lille', 'Nord', 'France', '59777', 5000, 50.637083, 3.070833),('Le Splendid', '1 Rue de la Gare', 'Lille', 'Nord', 'France', '59000', 2000, 50.631788, 3.067778),('La Cave aux Poètes', '16 Rue du Grand Chemin', 'Roubaix', 'Nord', 'France', '59100', 100, 50.691400, 3.174700),('Théâtre Sébastopol', 'Place Sébastopol', 'Lille', 'Nord', 'France', '59000', 1000, 50.629788, 3.053211),('La Brat Cave', '23 Rue Henri Kolb', 'Lille', 'Nord', 'France', '59000', 150, 50.624164, 3.065137),('DVG Club', 'Weggevoerdenlaan 5', 'Kortrijk', 'Vlaanderen', 'Belgique', '8500', 1000, 50.826100, 3.265300),('Sint-Rochuslaan', 'Sint-Rochuslaan 1', 'Kortrijk', 'Vlaanderen', 'Belgique', '8500', 2000, 50.828200, 3.266700),('La Bulle Café - Maison Folie Moulins', '47/49 rue d\'Arras', 'Lille', 'Nord', 'France', '59000', 150, 50.619100, 3.070000),('Microbrasserie Bon Vent', '23 rue de la pomme d\'or', 'Calais', 'Pas-de-Calais', 'France', '62100', NULL, 50.956100, 1.852500),('Le Lab-t', 'Begijnenstraat 1a', 'Diest', 'Vlaams-Brabant', 'Belgique', '3290', NULL, 50.989500, 5.056700),('Le Distrot', '233 Rue du Faubourg de Roubaix', 'Lille', 'Nord', 'France', '59800', NULL, 50.640000, 3.086700),('Le bistro de Saint-So', '25 boulevard Jean-Baptiste Lebas', 'Lille', 'Nord', 'France', '59000', 500, 50.629000, 3.066700),('Salle Notre Maison', 'Rue de l\'Avedelle, 173', 'Ecaussinnes', 'Wallonie', 'Belgique', '7190', NULL, 50.564500, 4.181700),('Le Grammophone', '27 rue Sadi Carnot', 'Cambrai', 'Nord', 'France', '59400', NULL, 50.176800, 3.234300),('Amul Solo', '9 rue des arts', 'Lille', 'Nord', 'France', '59000', 50, 50.632000, 3.062700),('Les 3 Auvergnats', 'Grand Place 28', 'Beaumont', 'Wallonie', 'Belgique', '6500', NULL, 50.332500, 4.237300),('Chaud Bouillon', '23 Rue Vaucanson', 'Lille', 'Nord', 'France', '59000', NULL, 50.628300, 3.094990),('Bunker Paillettes', '420 Rue des Bourreliers', 'Hallennes-lez-Haubourdin', 'Nord', 'France', '59320', NULL, 50.619000, 2.956000);

CREATE TABLE event (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  start_time time,
  place_id int NOT NULL,
  poster_image varchar(255),
  price_prevent decimal(10,2),
  price_at_door decimal(10,2),
  facebook_link varchar(255),
  ticket_link varchar(255),
  is_free boolean NOT NULL DEFAULT false,
  created_by int NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (place_id) REFERENCES place(id),
  FOREIGN KEY (created_by) REFERENCES user(id)
);
INSERT INTO event (title, description, start_date, start_time, place_id, created_by, price_prevent, price_at_door, is_free) VALUES ('Festival de Ska', 'Un festival de ska avec des groupes locaux et internationaux.', '2024-09-01', '20:00:00', 1, 1, 15.00, 20.00, FALSE),('Nuit Punk', 'Une soirée punk avec des performances énergiques.', '2024-10-15', '22:00:00', 1, 2, 10.00, 15.00, FALSE),('Rock Extrême', 'Des groupes de punk et hardcore en concert.', '2024-11-05', '21:00:00', 2, 3, 12.00, 18.00, FALSE),('Concert de Musette', 'Un soir de musette avec des groupes traditionnels.', '2024-12-01', '19:00:00', 2, 4, 8.00, 12.00, FALSE),('Soirée Synthpunk', 'Concert de synthpunk avec des groupes locaux.', '2024-09-20', '20:00:00', 3, 5, 14.00, 18.00, FALSE),('Punk Revolution', 'Un événement de punk avec des performances intenses.', '2024-10-25', '22:00:00', 3, 6, 15.00, 20.00, FALSE),('Chanson Punk Night', 'Concert de chanson punk avec des artistes invités.', '2024-11-10', '21:00:00', 4, 7, 12.00, 16.00, FALSE),('Nuit Electro Queer', 'Une soirée de musique électronique queer.', '2024-12-15', '23:00:00', 4, 8, 18.00, 22.00, FALSE),('Soirée Chanson Punk', 'Une nuit dédiée à la chanson punk.', '2024-09-15', '20:00:00', 5, 9, 10.00, 15.00, FALSE),('Concert de Musette', 'Un concert de musique musette.', '2024-10-05', '19:00:00', 5, 10, 8.00, 12.00, FALSE),('Festival de Ska', 'Un festival de ska avec des groupes de renom.', '2024-11-20', '20:00:00', 6, 11, 15.00, 20.00, FALSE),('Soirée Punk', 'Concert punk avec plusieurs groupes.', '2024-12-10', '21:00:00', 6, 12, 12.00, 18.00, FALSE),('Punk Night', 'Un concert punk avec des groupes énergétiques.', '2024-09-25', '20:00:00', 7, 13, 10.00, 15.00, FALSE),('Soirée Ska', 'Une soirée ska avec des performances locales.', '2024-10-30', '22:00:00', 7, 14, 12.00, 16.00, FALSE),('Concert Punk', 'Des concerts de punk dans un cadre intimiste.', '2024-11-10', '20:00:00', 8, 6, NULL, NULL, TRUE),('Festival DIY', 'Festival de musique DIY avec des groupes variés.', '2024-12-05', '19:00:00', 8, 1, 12.00, 18.00, FALSE),('Nuit Ska', 'Concert de ska avec des groupes internationaux.', '2024-09-30', '21:00:00', 9, 2, 15.00, 20.00, FALSE),('Punk Extrême', 'Un événement punk avec des groupes extrêmes.', '2024-10-25', '22:00:00', 9, 3, 12.00, 18.00, FALSE),('Soirée Queer', 'Une soirée de musique queer avec des performances uniques.', '2024-11-15', '20:00:00', 10, 4, 12.00, 16.00, FALSE),('Festival de Musette', 'Un festival de musique musette avec des artistes de renom.', '2024-12-10', '19:00:00', 10, 5, 10.00, 14.00, FALSE),('Concert de Ska', 'Un concert de ska avec des groupes locaux.', '2024-09-10', '20:00:00', 11, 6, 10.00, 15.00, FALSE),('Punk Extravaganza', 'Une soirée punk avec plusieurs groupes invités.', '2024-10-20', '21:00:00', 11, 7, 12.00, 18.00, FALSE),('Soirée Chanson Punk', 'Concert de chanson punk avec des groupes émergents.', '2024-11-25', '19:00:00', 12, 8, 10.00, 15.00, FALSE),('Nuit Synthpunk', 'Une nuit de musique synthpunk avec des artistes innovants.', '2024-12-20', '22:00:00', 12, 9, 14.00, 18.00, FALSE),('Punk Rock Night', 'Un concert de punk rock avec des groupes locaux.', '2024-09-15', '20:00:00', 13, 10, 10.00, 15.00, FALSE),('Ska Fest', 'Un festival de ska avec des groupes internationaux.', '2024-10-10', '19:00:00', 13, 11, 12.00, 18.00, FALSE),('Nuit Chanson Punk', 'Soirée dédiée à la chanson punk avec des performances live.', '2024-11-05', '21:00:00', 14, 12, 12.00, 16.00, FALSE),('Soirée Electro Queer', 'Concert de musique électro queer.', '2024-12-10', '20:00:00', 14, 13, 15.00, 20.00, FALSE),('Punk Show', 'Un show punk avec des groupes locaux et internationaux.', '2024-09-25', '20:00:00', 15, 14, 10.00, 15.00, FALSE),('Musette Festival', 'Festival de musique musette avec des artistes de la région.', '2024-10-15', '19:00:00', 15, 15, 12.00, 16.00, FALSE),('Chanson Punk Night', 'Concert de chanson punk avec des performances dynamiques.', '2024-09-20', '21:00:00', 16, 1, 10.00, 15.00, FALSE),('Festival DIY', 'Un festival DIY avec plusieurs groupes punk.', '2024-10-05', '20:00:00', 16, 2, 12.00, 18.00, FALSE),('Punk & Ska Night', 'Concert combinant punk et ska avec des groupes locaux.', '2024-09-30', '20:00:00', 17, 3, 10.00, 15.00, FALSE),('Synthpunk Extravaganza', 'Une soirée synthpunk avec des groupes innovants.', '2024-10-25', '22:00:00', 17, 4, 14.00, 18.00, FALSE),('Soirée Musette', 'Concert de musique musette avec des artistes de renom.', '2024-11-15', '19:00:00', 18, 5, 8.00, 12.00, FALSE),('Chanson Punk Fest', 'Un festival de chanson punk avec des groupes invités.', '2024-12-05', '20:00:00', 18, 6, 12.00, 16.00, FALSE),('Festival de Punk', 'Un festival de punk avec plusieurs groupes invités.', '2024-10-10', '20:00:00', 19, 7, 10.00, 15.00, FALSE),('Ska Night', 'Soirée ska avec des groupes locaux et internationaux.', '2024-11-05', '22:00:00', 19, 8, 12.00, 18.00, FALSE),('Chanson Punk', 'Concert de chanson punk avec des groupes locaux.', '2024-09-15', '21:00:00', 20, 9, 10.00, 15.00, FALSE),('Synthpunk Night', 'Soirée synthpunk avec des artistes locaux.', '2024-10-20', '22:00:00', 20, 10, 12.00, 16.00, FALSE);

CREATE TABLE artist (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  logo varchar(255),
  shortDesc varchar(255),
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO artist (name, logo, shortDesc) VALUES ('Boom Boom Racoon', NULL, 'DIY Acoustic Ska'),('Delilah Bon', NULL, 'Punk Rap Power Violence'),('Les Vaches Laitières', NULL, 'Chanson Punk'),('The Gladiators', NULL, 'Traditionnal Ska'),('Ken Boothe', NULL, 'Traditionnal Ska'),('Ultramoderne', NULL, 'Synthpunk'),('Skindred', NULL, 'Ragga Metal'),('Mégadef', NULL, 'Ponk Shlagos'),('Cuir', NULL, 'Punk Oi!'),('Justine', NULL, 'Chanson Punk'),('Graphy-T', NULL, 'Queer Teck'),('Brigada Flores Magon', NULL, 'Oi! Punk Révolutionnaire'),('TedaAk', NULL, 'Queer Teck'),('UltraMoule', NULL, 'Punk/Electro Queer'),('Maggy Bolle', NULL, 'Chanson Française Musette'),('Joey Glüten', NULL, 'Acoustic Shlagos'),('Glitoris', NULL, 'Punk Rock'),('Thom Souyeur et les Petits Grégory', NULL, 'Punk/Chanson'),('Gogol Bordello', NULL, 'Gypsy Punk'),('Athena', NULL, 'Ska Punk'),('Corrupt Vision', NULL, 'Anti Ska / Punk Hardcore'), ('Dures & Gays', NULL, 'Oi!'),('Symarip', NULL, 'Ska'),('Bad Manners', NULL, 'Ska'),('Toy Dolls', NULL, 'Punk');

CREATE TABLE tag (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  label varchar(255) NOT NULL
);
INSERT INTO tag (label) VALUES ('Punk'),('Ska'),('Electro'),('Indie'),('Folk'),('Metal'),('Rap'),('Jazz'),('Rock'),('Musette'),('Pop'),('Alternative'),('Blues'),('Classical'),('Reggae'),('Experimental'),('Ambient'),('House'),('Techno'),('R&B'),('Soul'),('Hardcore'),('Crust'),('Militant'),('Queer'),('Gothic'),('Industrial'),('Post'),('Progressive'),('Ambient'),('Dub'),('Psychedelic'),('New Wave'),('Synthwave'),("Synth'"),('Grunge'),('Dubstep'),('Trap'),('Hardstyle'),('Funk'),('Country'),('Jungle'),('Metalcore'),('Shoegaze'),('Trip-Hop'),('Breakbeat'),('Garage'),('K-Pop'),('Reggaeton'),('Tango'),('Chiptune'),('Death'),('Black'),('Doom'),('Emo'),('Noise');

CREATE TABLE artist_tag (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  artist_id int NOT NULL,
  tag_id int NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id)
);
INSERT INTO artist_tag (artist_id, tag_id) VALUES (1, 1),(1, 2),(1, 25),(2, 1),(2,24),(2, 22),(2, 23),(2,25),(3, 1),(3, 10),(4, 15),(4, 2),(5, 15),(5, 2),(6, 1),(6, 3),(7, 6),(7, 15),(8, 1),(9, 1),(9, 23),(10, 1),(11, 25),(11,3),(12, 1),(12, 24),(13, 25),(13,3),(14, 1),(14, 3),(14, 25),(15, 10),(16, 1),(16, 24),(16, 25), (17, 1),(17, 9),(18, 1),(18, 10),(19, 1),(19, 2),(20, 1), (20, 2), (21, 1), (21, 2), (21, 22),(22, 1), (22, 23), (22, 25),(23, 2),(24, 2), (25, 1);


CREATE TABLE ext_site (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255)
);
INSERT INTO ext_site (name) VALUES ('Personal'),('Facebook'),('Twitter'),('Instagram'),('Spotify'),('Deezer'),('BandCamp'),('Youtube');


CREATE TABLE artist_link (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  link VARCHAR(255) NOT NULL,
  artist_id INT NOT NULL,
  site_id INT NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (site_id) REFERENCES ext_site(id)
);
INSERT INTO artist_link (link, artist_id, site_id) VALUES ('https://facebook.com/boomboomracoon',1,2),('https://instagram.com/boomboomracoon',1,4),('https://boomboomracoon.bandcamp.com',1,7),('https://open.spotify.com/artist/4m9o0WlMRuD4XjWZfUzWSM',1,5),('https://facebook.com/delilahbonofficial',2,2),('https://instagram.com/delilahbonofficial',2,4),('https://delilahbon.bandcamp.com',2,7),('https://youtube.com/delilahbon',2,8),('https://open.spotify.com/artist/0jE8yDgy6G1VvaG4bKcP4V',2,5),('https://facebook.com/lesvacheslaitieres',3,2),('https://facebook.com/thegladiatorsreggae',4,2),('https://thegladiatorsband.com',4,1),('https://open.spotify.com/artist/7MndAg9Uu6eww4A07OWvJF',4,5),('https://facebook.com/kenboothe',5,2),('https://open.spotify.com/artist/3MYdpHhjUe0DlzpTJVdY2y',5,5),('https://facebook.com/ultramoderne',6,2),('https://instagram.com/ultramoderne',6,4),('https://ultramoderne.bandcamp.com',6,7),('https://facebook.com/skindredofficial',7,2),('https://twitter.com/skindredmusic',7,3),('https://instagram.com/skindredmusic',7,4),('https://skindred.net',7,1),('https://youtube.com/skindredmusic',7,8),('https://open.spotify.com/artist/5rFZcoCvmCaQqQmEdkzod6',7,5),('https://facebook.com/cuir.punk',9,2),('https://instagram.com/cuir.punk',9,4),('https://cuir.bandcamp.com',9,7),('https://facebook.com/justinepunkrock',10,2),('https://instagram.com/justinepunkrock',10,4),('https://justinepunkrock.bandcamp.com',10,7),('https://open.spotify.com/artist/5TbfP8EkntA5UKoNCCcbce',10,5),('https://facebook.com/brigadafloresmagon',12,2),('https://brigadafloresmagon.bandcamp.com',12,7),('https://open.spotify.com/artist/6An4lZpOMWlhbCgZ3zkc6J',12,5),('https://facebook.com/ultramoule',14,2),('https://instagram.com/ultramoule',14,4),('https://ultramoule.bandcamp.com',14,7),('https://open.spotify.com/artist/3hZNV34CNVcXAPZKmMjYoV',14,5),('https://facebook.com/maggybolle',15,2),('https://instagram.com/maggybolle',15,4),('https://maggybolle.com',15,1),('https://facebook.com/glitorisband',17,2),('https://instagram.com/glitorisband',17,4),('https://glitorisband.com',17,1),('https://youtube.com/glitorisband',17,8),('https://open.spotify.com/artist/5LVt96b48k2UXhTpHC3N5j',17,5),('https://facebook.com/thomsouyeur',18,2),('https://thomsouyeur.bandcamp.com',18,7),('https://facebook.com/gogolbordello',19,2),('https://twitter.com/gogolbordello',19,3),('https://instagram.com/gogolbordello',19,4),('https://gogolbordello.com',19,1),('https://youtube.com/gogolbordello',19,8),('https://open.spotify.com/artist/4Ol4cjHGRf6KR4FGi8bU6J',19,5),('https://facebook.com/athenamusic',20,2),('https://instagram.com/athenamusic',20,4),('https://athenamusic.com',20,1),('https://open.spotify.com/artist/4y48KqO2BaGyqHUl6rJHvx',20,5),('https://facebook.com/corruptvision',21,2),('https://instagram.com/corruptvision',21,4),('https://open.spotify.com/artist/6dsg9yZW9tMvWiYKP7RCCX',21,5),('https://deezer.page.link/xZrrE9UhwiPj4BmaA',21,6),('https://facebook.com/duresetgays',22,2),('https://instagram.com/duresetgays',22,4),('https://duresetgays.bandcamp.com',22,7),('https://facebook.com/symarip',23,2),('https://instagram.com/symarip',23,4),('https://symarip.com',23,1),('https://youtube.com/symarip',23,8),('https://open.spotify.com/artist/6R3rdUnYVVfRTHYpRlaMQH',23,5),('https://facebook.com/badmannersofficial',24,2),('https://twitter.com/badmanners',24,3),('https://instagram.com/badmannersofficial',24,4),('https://badmanners.co.uk',24,1),('https://youtube.comuserbadmanners1',24,8),('https://open.spotify.com/artist/4z6sEcdmB8IN2Tk7y7deL9',24,5),('https://facebook.com/toydolls',25,2),('https://twitter.com/toydolls',25,3),('https://instagram.com/toydolls',25,4),('https://toydolls.co.uk',25,1),('https://youtube.comusertoydollsofficial',25,8),('https://open.spotify.com/artist/2MLbb9YZH1G0cY3CijbqLO',25,5);

CREATE TABLE place_Link (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  link VARCHAR(255) NOT NULL,
  place_id INT NOT NULL,
  site_id INT NOT NULL,
  FOREIGN KEY (place_id) REFERENCES place(id),
  FOREIGN KEY (site_id) REFERENCES ext_site(id)
);

CREATE TABLE event_artist (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  event_id int NOT NULL,
  artist_id int NOT NULL,
  FOREIGN KEY (event_id) REFERENCES event(id),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  UNIQUE (event_id, artist_id)
);
INSERT INTO event_artist (event_id, artist_id) VALUES (1, 5),(1, 12),(2, 7),(2, 19),(2, 3),(3, 1),(3, 9),(4, 15),(5, 4),(5, 20),(6, 10),(7, 14),(8, 6),(9, 2),(9, 18),(10, 11),(11, 25),(12, 8),(12, 13),(13, 16),(14, 5),(14, 22),(15, 9),(16, 17),(16, 2),(17, 7),(18, 3),(19, 21),(20, 1),(20, 12),(21, 6),(22, 10),(23, 14),(23, 18),(24, 20),(25, 4),(26, 23),(27, 11),(27, 9),(28, 15),(29, 5),(29, 7),(30, 17),(31, 2),(32, 13),(33, 3),(34, 8),(35, 21),(36, 19),(37, 1),(37, 25),(38, 4),(39, 10),(40, 16),(40, 22);


CREATE TABLE save_status(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL
);
INSERT INTO save_status (label) VALUES ('been'),('attented'),('interrested');

CREATE TABLE event_save (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  event_id int NOT NULL,
  status_id INT NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (event_id) REFERENCES event(id),
  FOREIGN KEY (status_id) REFERENCES Save_Status(id),
  UNIQUE (event_id, user_id)
);
INSERT INTO event_save (user_id, event_id, status_id) VALUES(1, 5, 2),(2, 10, 1),(3, 15, 3),(4, 20, 2),(5, 25, 1),(6, 30, 2),(7, 35, 3),(8, 40, 1),(9, 1, 3),(10, 6, 2),(11, 11, 1),(12, 16, 2),(13, 21, 3),(14, 26, 1),(15, 31, 2),(1, 36, 3),(2, 2, 1),(3, 7, 2),(4, 12, 3),(5, 17, 1),(6, 22, 2),(7, 27, 3),(8, 32, 1),(9, 37, 2),(10, 3, 3),(11, 8, 1),(12, 13, 2),(13, 18, 3),(14, 23, 1),(15, 28, 2),(1, 33, 3),(2, 38, 1),(3, 4, 2),(4, 9, 3),(5, 14, 1),(6, 19, 2),(7, 24, 3),(8, 29, 1),(9, 34, 2),(10, 39, 3);

CREATE TABLE user_artist (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  artist_id int NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  UNIQUE (user_id, artist_id)
);
INSERT INTO user_artist (user_id, artist_id) VALUES (1, 3),(2, 7),(3, 10),(4, 12),(5, 5),(6, 8),(7, 15),(8, 2),(9, 6),(10, 13),(11, 9),(12, 1),(13, 11),(14, 4),(15, 14),(6, 2),(6, 4),(6, 7),(6, 10),(6, 15);

CREATE TABLE user_place (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  place_id int NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (place_id) REFERENCES place(id),
  UNIQUE (user_id, place_id)
);
INSERT INTO user_place (user_id, place_id) VALUES (1, 5),(2, 8),(3, 12),(4, 3),(5, 15),(6, 7),(7, 10),(8, 1),(9, 4),(10, 14),(11, 11),(12, 6),(13, 13),(14, 9),(15, 2),(6, 1),(6, 3),(6, 10),(6, 12);

CREATE TABLE user_user (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user1_id int NOT NULL,
  user2_id int NOT NULL,
  FOREIGN KEY (user1_id) REFERENCES user(id),
  FOREIGN KEY (user2_id) REFERENCES user(id),
  UNIQUE (user1_id, user2_id),
  UNIQUE (user2_id, user1_id)
);
INSERT INTO user_user (user1_id, user2_id) VALUES (1, 2),(1, 3),(2, 4),(4, 5),(3, 6),(3, 7),(4, 8),(4, 9),(5, 10),(5, 11),(6, 12),(6, 13),(7, 14),(7, 15),(8, 9),(8, 10),(9, 11),(9, 12),(10, 13),(10, 14),(11, 15),(12, 13),(12, 14),(13, 15),(14, 15);
