CREATE TABLE `User` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image_url',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Location` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `capacity` int,
  `facebook_link` varchar(255),
  `twitter_link` varchar(255),
  `instagram_link` varchar(255),
  `website` varchar(255),
  `logo` varchar(255),
  `year_opened` year,
  `is_closed` boolean NOT NULL DEFAULT false,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Event` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date,
  `start_time` time,
  `location_id` int NOT NULL,
  `created_by` int NOT NULL,
  `poster_image` varchar(255),
  `price_prevent` decimal,
  `price_at_door` decimal,
  `facebook_link` varchar(255),
  `ticket_link` varchar(255),
  `is_free` boolean NOT NULL DEFAULT false,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`),
  FOREIGN KEY (`created_by`) REFERENCES `User`(`id`)
);

CREATE TABLE `Artist` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255),
  `genre` varchar(255),
  `facebook_link` varchar(255),
  `twitter_link` varchar(255),
  `instagram_link` varchar(255),
  `website` varchar(255),
  `youtube_link` varchar(255),
  `bandcamp_link` varchar(255),
  `spotify_link` varchar(255),
  `deezer_link` varchar(255),
  `apple_music_link` varchar(255),
  `amazon_music_link` varchar(255),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`country_id`) REFERENCES `Country`(`id`)
);

CREATE TABLE `Genre_Tag` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL
);

CREATE TABLE `Artist_Genre_Tag` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `genre_tag_id` int NOT NULL,
  FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`id`),
  FOREIGN KEY (`genre_tag_id`) REFERENCES `Genre_Tag`(`id`)
);

CREATE TABLE `Event_Artist` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `artist_id` int NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`),
  FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`id`)
);

CREATE TABLE `Event_Save` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `status` enum('interested','going','attended') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`)
);

CREATE TABLE `User_Favorite_Artist` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`id`)
);

CREATE TABLE `User_Favorite_Location` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `location_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`)
);

CREATE TABLE `User_User` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  FOREIGN KEY (`user1_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`user2_id`) REFERENCES `User`(`id`)
);

INSERT INTO `User` (`id`, `username`, `email`, `password`) VALUES
(1, 'JohnnyPunk', 'johnny@example.com', 'password1'),
(2, 'LilyRiot', 'lily@example.com', 'password2'),
(3, 'SkateMike', 'mike@example.com', 'password3'),
(4, 'AnarchyAnne', 'anne@example.com', 'password4'),
(5, 'GrungeGary', 'gary@example.com', 'password5'),
(6, 'PunkPrincess', 'princess@example.com', 'password6'),
(7, 'HardcoreHarry', 'harry@example.com', 'password7'),
(8, 'IndieIvy', 'ivy@example.com', 'password8'),
(9, 'RockyRick', 'rick@example.com', 'password9'),
(10, 'EmoEli', 'eli@example.com', 'password10'),
(11, 'CrustyChris', 'chris@example.com', 'password11'),
(12, 'NoiseNina', 'nina@example.com', 'password12'),
(13, 'GarageGreg', 'greg@example.com', 'password13'),
(14, 'SynthSue', 'sue@example.com', 'password14'),
(15, 'WaveWendy', 'wendy@example.com', 'password15');

INSERT INTO `Country` (`label`) VALUES ('France'),('Allemagne'),('Italie'),('Espagne'),('Royaume-Uni'),('Belgique'),('Pays-Bas'),('Suisse'),('Autriche'),('Suède'),('Norvège'),('Danemark'),('Finlande'),('Portugal'),('Grèce'),('Irlande'),('Pologne'),('République Tchèque'),('Hongrie'),('Roumanie'),('Bulgarie'),('Croatie'),('Slovaquie'),('Slovénie'),('Lituanie'),('Lettonie'),('Estonie'),('Luxembourg'),('Malte'),('Chypre'),('Russie'),('Turquie'),('Ukraine'),('Islande'),('États-Unis'),('Canada'),('Brésil'),('Australie'),('Japon'),('Chine'),('Inde'),('Afrique du Sud'),('Jamaïque');

INSERT INTO `Location` (`name`, `address`, `city`, `state`, `country`, `postal_code`, `capacity`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `logo`, `year_opened`, `is_closed`, `latitude`, `longitude`) VALUES
('Au Bout de Nos Rêves', 'Grand\'Route 141', 'Tournai', 'Wallonie', 'Belgique', '7500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.595729, 3.480900),
('Le Grand Mix', '5 Rue de l\'Hôpital Militaire', 'Tourcoing', 'Nord', 'France', '59200', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.721500, 3.157000),
('Aéronef', '168 Avenue Willy Brandt', 'Lille', 'Nord', 'France', '59777', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.637083, 3.070833),
('Le Splendid', '1 Rue de la Gare', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.631788, 3.067778),
('La Cave aux Poètes', '16 Rue du Grand Chemin', 'Roubaix', 'Nord', 'France', '59100', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.691400, 3.174700),
('Théâtre Sébastopol', 'Place Sébastopol', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.629788, 3.053211),
('La Brat Cave', '23 Rue Henri Kolb', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.624164, 3.065137),
('DVG Club', 'Weggevoerdenlaan 5', 'Kortrijk', 'Vlaanderen', 'Belgique', '8500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.826100, 3.265300),
('Sint-Rochuslaan', 'Sint-Rochuslaan 1', 'Kortrijk', 'Vlaanderen', 'Belgique', '8500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.828200, 3.266700),
('La Bulle Café - Maison Folie Moulins', '47/49 rue d\'Arras', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.619100, 3.070000),
('Microbrasserie Bon Vent', '23 rue de la pomme d\'or', 'Calais', 'Pas-de-Calais', 'France', '62100', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.956100, 1.852500),
('Le Lab-t', 'Begijnenstraat 1a', 'Diest', 'Vlaams-Brabant', 'Belgique', '3290', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.989500, 5.056700),
('Le Distrot', '233 Rue du Faubourg de Roubaix', 'Lille', 'Nord', 'France', '59800', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.640000, 3.086700),
('Le bistro de Saint-So', '25 boulevard Jean-Baptiste Lebas', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.629000, 3.066700),
('Salle Notre Maison', 'Rue de l\'Avedelle, 173', 'Ecaussinnes', 'Wallonie', 'Belgique', '7190', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.564500, 4.181700),
('Le Grammophone', '27 rue Sadi Carnot', 'Cambrai', 'Nord', 'France', '59400', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.176800, 3.234300),
('Amul Solo', '9 rue des arts', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.632000, 3.062700),
('Les 3 Auvergnats', 'Grand Place 28', 'Beaumont', 'Wallonie', 'Belgique', '6500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.332500, 4.237300),
('Chaud Bouillon', '23 Rue Vaucanson', 'Lille', 'Nord', 'France', '59000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.628300, 3.094990),
('Bunker Paillettes', '420 Rue des Bourreliers', 'Hallennes-lez-Haubourdin', 'Nord', 'France', '59320', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 50.619000, 2.956000);

INSERT INTO `Event` (`title`, `description`, `start_date`, `end_date`, `start_time`, `location_id`, `created_by`, `poster_image`, `price_prevent`, `price_at_door`, `facebook_link`, `is_free`)
VALUES
('Festival de Ska', 'Un festival de ska avec des groupes locaux et internationaux.', '2024-09-01', '2024-09-01', '20:00:00', (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves'), 1, NULL, 15.00, 20.00, NULL, FALSE),
('Nuit Punk', 'Une soirée punk avec des performances énergiques.', '2024-10-15', '2024-10-15', '22:00:00', (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves'), 2, NULL, 10.00, 15.00, NULL, FALSE),
('Rock Extrême', 'Des groupes de punk et hardcore en concert.', '2024-11-05', '2024-11-05', '21:00:00', (SELECT id FROM Location WHERE name = 'Le Grand Mix'), 3, NULL, 12.00, 18.00, NULL, FALSE),
('Concert de Musette', 'Un soir de musette avec des groupes traditionnels.', '2024-12-01', '2024-12-01', '19:00:00', (SELECT id FROM Location WHERE name = 'Le Grand Mix'), 4, NULL, 8.00, 12.00, NULL, FALSE),
('Soirée Synthpunk', 'Concert de synthpunk avec des groupes locaux.', '2024-09-20', '2024-09-20', '20:00:00', (SELECT id FROM Location WHERE name = 'Aéronef'), 5, NULL, 14.00, 18.00, NULL, FALSE),
('Punk Revolution', 'Un événement de punk avec des performances intenses.', '2024-10-25', '2024-10-25', '22:00:00', (SELECT id FROM Location WHERE name = 'Aéronef'), 6, NULL, 15.00, 20.00, NULL, FALSE),
('Chanson Punk Night', 'Concert de chanson punk avec des artistes invités.', '2024-11-10', '2024-11-10', '21:00:00', (SELECT id FROM Location WHERE name = 'Le Splendid'), 7, NULL, 12.00, 16.00, NULL, FALSE),
('Nuit Electro Queer', 'Une soirée de musique électronique queer.', '2024-12-15', '2024-12-15', '23:00:00', (SELECT id FROM Location WHERE name = 'Le Splendid'), 8, NULL, 18.00, 22.00, NULL, FALSE),
('Soirée Chanson Punk', 'Une nuit dédiée à la chanson punk.', '2024-09-15', '2024-09-15', '20:00:00', (SELECT id FROM Location WHERE name = 'La Cave aux Poètes'), 9, NULL, 10.00, 15.00, NULL, FALSE),
('Concert de Musette', 'Un concert de musique musette.', '2024-10-05', '2024-10-05', '19:00:00', (SELECT id FROM Location WHERE name = 'La Cave aux Poètes'), 10, NULL, 8.00, 12.00, NULL, FALSE),
('Festival de Ska', 'Un festival de ska avec des groupes de renom.', '2024-11-20', '2024-11-20', '20:00:00', (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol'), 11, NULL, 15.00, 20.00, NULL, FALSE),
('Soirée Punk', 'Concert punk avec plusieurs groupes.', '2024-12-10', '2024-12-10', '21:00:00', (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol'), 12, NULL, 12.00, 18.00, NULL, FALSE),
('Punk Night', 'Un concert punk avec des groupes énergétiques.', '2024-09-25', '2024-09-25', '20:00:00', (SELECT id FROM Location WHERE name = 'La Brat Cave'), 13, NULL, 10.00, 15.00, NULL, FALSE),
('Soirée Ska', 'Une soirée ska avec des performances locales.', '2024-10-30', '2024-10-30', '22:00:00', (SELECT id FROM Location WHERE name = 'La Brat Cave'), 14, NULL, 12.00, 16.00, NULL, FALSE),
('Concert Punk', 'Des concerts de punk dans un cadre intimiste.', '2024-11-10', '2024-11-10', '20:00:00', (SELECT id FROM Location WHERE name = 'DVG Club'), 15, NULL, 10.00, 15.00, NULL, FALSE),
('Festival DIY', 'Festival de musique DIY avec des groupes variés.', '2024-12-05', '2024-12-05', '19:00:00', (SELECT id FROM Location WHERE name = 'DVG Club'), 1, NULL, 12.00, 18.00, NULL, FALSE),
('Nuit Ska', 'Concert de ska avec des groupes internationaux.', '2024-09-30', '2024-09-30', '21:00:00', (SELECT id FROM Location WHERE name = 'Sint-Rochuslaan'), 2, NULL, 15.00, 20.00, NULL, FALSE),
('Punk Extrême', 'Un événement punk avec des groupes extrêmes.', '2024-10-25', '2024-10-25', '22:00:00', (SELECT id FROM Location WHERE name = 'Sint-Rochuslaan'), 3, NULL, 12.00, 18.00, NULL, FALSE),
('Soirée Queer', 'Une soirée de musique queer avec des performances uniques.', '2024-11-15', '2024-11-15', '20:00:00', (SELECT id FROM Location WHERE name = 'La Bulle Café - Maison Folie Moulins'), 4, NULL, 12.00, 16.00, NULL, FALSE),
('Festival de Musette', 'Un festival de musique musette avec des artistes de renom.', '2024-12-10', '2024-12-10', '19:00:00', (SELECT id FROM Location WHERE name = 'La Bulle Café - Maison Folie Moulins'), 5, NULL, 10.00, 14.00, NULL, FALSE),
('Concert de Ska', 'Un concert de ska avec des groupes locaux.', '2024-09-10', '2024-09-10', '20:00:00', (SELECT id FROM Location WHERE name = 'Microbrasserie Bon Vent'), 6, NULL, 10.00, 15.00, NULL, FALSE),
('Punk Extravaganza', 'Une soirée punk avec plusieurs groupes invités.', '2024-10-20', '2024-10-20', '21:00:00', (SELECT id FROM Location WHERE name = 'Microbrasserie Bon Vent'), 7, NULL, 12.00, 18.00, NULL, FALSE),
('Soirée Chanson Punk', 'Concert de chanson punk avec des groupes émergents.', '2024-11-25', '2024-11-25', '19:00:00', (SELECT id FROM Location WHERE name = 'Le Lab-t'), 8, NULL, 10.00, 15.00, NULL, FALSE),
('Nuit Synthpunk', 'Une nuit de musique synthpunk avec des artistes innovants.', '2024-12-20', '2024-12-20', '22:00:00', (SELECT id FROM Location WHERE name = 'Le Lab-t'), 9, NULL, 14.00, 18.00, NULL, FALSE),
('Punk Rock Night', 'Un concert de punk rock avec des groupes locaux.', '2024-09-15', '2024-09-15', '20:00:00', (SELECT id FROM Location WHERE name = 'Le Distrot'), 10, NULL, 10.00, 15.00, NULL, FALSE),
('Ska Fest', 'Un festival de ska avec des groupes internationaux.', '2024-10-10', '2024-10-10', '19:00:00', (SELECT id FROM Location WHERE name = 'Le Distrot'), 11, NULL, 12.00, 18.00, NULL, FALSE),
('Nuit Chanson Punk', 'Soirée dédiée à la chanson punk avec des performances live.', '2024-11-05', '2024-11-05', '21:00:00', (SELECT id FROM Location WHERE name = 'Le bistro de Saint-So'), 12, NULL, 12.00, 16.00, NULL, FALSE),
('Soirée Electro Queer', 'Concert de musique électro queer.', '2024-12-10', '2024-12-10', '20:00:00', (SELECT id FROM Location WHERE name = 'Le bistro de Saint-So'), 13, NULL, 15.00, 20.00, NULL, FALSE),
('Punk Show', 'Un show punk avec des groupes locaux et internationaux.', '2024-09-25', '2024-09-25', '20:00:00', (SELECT id FROM Location WHERE name = 'Salle Notre Maison'), 14, NULL, 10.00, 15.00, NULL, FALSE),
('Musette Festival', 'Festival de musique musette avec des artistes de la région.', '2024-10-15', '2024-10-15', '19:00:00', (SELECT id FROM Location WHERE name = 'Salle Notre Maison'), 15, NULL, 12.00, 16.00, NULL, FALSE),
('Chanson Punk Night', 'Concert de chanson punk avec des performances dynamiques.', '2024-09-20', '2024-09-20', '21:00:00', (SELECT id FROM Location WHERE name = 'Le Grammophone'), 1, NULL, 10.00, 15.00, NULL, FALSE),
('Festival DIY', 'Un festival DIY avec plusieurs groupes punk.', '2024-10-05', '2024-10-05', '20:00:00', (SELECT id FROM Location WHERE name = 'Le Grammophone'), 2, NULL, 12.00, 18.00, NULL, FALSE),
('Punk & Ska Night', 'Concert combinant punk et ska avec des groupes locaux.', '2024-09-30', '2024-09-30', '20:00:00', (SELECT id FROM Location WHERE name = 'Amul Solo'), 3, NULL, 10.00, 15.00, NULL, FALSE),
('Synthpunk Extravaganza', 'Une soirée synthpunk avec des groupes innovants.', '2024-10-25', '2024-10-25', '22:00:00', (SELECT id FROM Location WHERE name = 'Amul Solo'), 4, NULL, 14.00, 18.00, NULL, FALSE),
('Soirée Musette', 'Concert de musique musette avec des artistes de renom.', '2024-11-15', '2024-11-15', '19:00:00', (SELECT id FROM Location WHERE name = 'Les 3 Auvergnats'), 5, NULL, 8.00, 12.00, NULL, FALSE),
('Chanson Punk Fest', 'Un festival de chanson punk avec des groupes invités.', '2024-12-05', '2024-12-05', '20:00:00', (SELECT id FROM Location WHERE name = 'Les 3 Auvergnats'), 6, NULL, 12.00, 16.00, NULL, FALSE),
('Festival de Punk', 'Un festival de punk avec plusieurs groupes invités.', '2024-10-10', '2024-10-10', '20:00:00', (SELECT id FROM Location WHERE name = 'Chaud Bouillon'), 7, NULL, 10.00, 15.00, NULL, FALSE),
('Ska Night', 'Soirée ska avec des groupes locaux et internationaux.', '2024-11-05', '2024-11-05', '22:00:00', (SELECT id FROM Location WHERE name = 'Chaud Bouillon'), 8, NULL, 12.00, 18.00, NULL, FALSE),
('Chanson Punk', 'Concert de chanson punk avec des groupes locaux.', '2024-09-15', '2024-09-15', '21:00:00', (SELECT id FROM Location WHERE name = 'Bunker Paillettes'), 9, NULL, 10.00, 15.00, NULL, FALSE),
('Synthpunk Night', 'Soirée synthpunk avec des artistes locaux.', '2024-10-20', '2024-10-20', '22:00:00', (SELECT id FROM Location WHERE name = 'Bunker Paillettes'), 10, NULL, 12.00, 16.00, NULL, FALSE);



-- Correction des instructions d'insertion

-- Pour 'Boom Boom Racoon'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Boom Boom Racoon', (SELECT id FROM Country WHERE label = 'Royaume-Uni'), NULL, 'DIY Acoustic Ska', 'https://facebook.com/boomboomracoon', NULL, 'https://instagram.com/boomboomracoon', 'https://boomboomracoon.bandcamp.com', NULL, 'https://open.spotify.com/artist/4m9o0WlMRuD4XjWZfUzWSM');

-- Pour 'Delilah Bon'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Delilah Bon', (SELECT id FROM Country WHERE label = 'Royaume-Uni'), NULL, 'Punk Rap Power Violence', 'https://facebook.com/delilahbonofficial', NULL, 'https://instagram.com/delilahbonofficial', 'https://delilahbon.bandcamp.com', 'https://youtube.com/delilahbon', 'https://open.spotify.com/artist/0jE8yDgy6G1VvaG4bKcP4V');

-- Pour 'Les Vaches Laitières'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Les Vaches Laitières', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Chanson Punk', 'https://facebook.com/lesvacheslaitieres', NULL, NULL, NULL, NULL, NULL);

-- Pour 'The Gladiators'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('The Gladiators', (SELECT id FROM Country WHERE label = 'Jamaïque'), NULL, 'Traditionnal Ska', 'https://facebook.com/thegladiatorsreggae', NULL, NULL, 'https://thegladiatorsband.com', NULL, 'https://open.spotify.com/artist/7MndAg9Uu6eww4A07OWvJF');

-- Pour 'Ken Boothe'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Ken Boothe', (SELECT id FROM Country WHERE label = 'Jamaïque'), NULL, 'Traditionnal Ska', 'https://facebook.com/kenboothe', NULL, NULL, NULL, NULL, 'https://open.spotify.com/artist/3MYdpHhjUe0DlzpTJVdY2y');

-- Pour 'Ultramoderne'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Ultramoderne', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Synthpunk', 'https://facebook.com/ultramoderne', NULL, 'https://instagram.com/ultramoderne', 'https://ultramoderne.bandcamp.com', NULL, NULL);

-- Pour 'Skindred'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Skindred', (SELECT id FROM Country WHERE label = 'Royaume-Uni'), NULL, 'Ragga Metal', 'https://facebook.com/skindredofficial', 'https://twitter.com/skindredmusic', 'https://instagram.com/skindredmusic', 'https://skindred.net', 'https://youtube.com/skindredmusic', 'https://open.spotify.com/artist/5rFZcoCvmCaQqQmEdkzod6');

-- Pour 'Mégadef'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Mégadef', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Ponk Shlagos', NULL, NULL, NULL, NULL, NULL, NULL);

-- Pour 'Cuir'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Cuir', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Punk Oi!', 'https://facebook.com/cuir.punk', NULL, 'https://instagram.com/cuir.punk', 'https://cuir.bandcamp.com', NULL, NULL);

-- Pour 'Justine'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Justine', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Chanson Punk', 'https://facebook.com/justinepunkrock', NULL, 'https://instagram.com/justinepunkrock', 'https://justinepunkrock.bandcamp.com', NULL, 'https://open.spotify.com/artist/5TbfP8EkntA5UKoNCCcbce');

-- Pour 'Graphy-T'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Graphy-T', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Queer Teck', NULL, NULL, NULL, NULL, NULL, NULL);

-- Pour 'Brigada Flores Magon'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Brigada Flores Magon', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Oi! Punk Révolutionnaire', 'https://facebook.com/brigadafloresmagon', NULL, NULL, 'https://brigadafloresmagon.bandcamp.com', NULL, 'https://open.spotify.com/artist/6An4lZpOMWlhbCgZ3zkc6J');

-- Pour 'TedaAk'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('TedaAk', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Queer Tack', NULL, NULL, NULL, NULL, NULL, NULL);

-- Pour 'UltraMoule'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('UltraMoule', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Punk/Electro Queer', 'https://facebook.com/ultramoule', NULL, 'https://instagram.com/ultramoule', 'https://ultramoule.bandcamp.com', NULL, 'https://open.spotify.com/artist/3hZNV34CNVcXAPZKmMjYoV');

-- Pour 'Maggy Bolle'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Maggy Bolle', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Chanson Française Musette', 'https://facebook.com/maggybolle', NULL, 'https://instagram.com/maggybolle', 'https://maggybolle.com', NULL, NULL);

-- Pour 'Joey Glüten'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Joey Glüten', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Acoustic Shlagos', NULL, NULL, NULL, NULL, NULL, NULL);

-- Pour 'Glitoris'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Glitoris', (SELECT id FROM Country WHERE label = 'Australie'), NULL, 'Punk Rock', 'https://facebook.com/glitorisband', NULL, 'https://instagram.com/glitorisband', 'https://glitorisband.com', 'https://youtube.com/glitorisband', 'https://open.spotify.com/artist/5LVt96b48k2UXhTpHC3N5j');

-- Pour 'Thom Souyeur et les Petits Grégory'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Thom Souyeur et les Petits Grégory', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Punk/Chanson', 'https://facebook.com/thomsouyeur', NULL, NULL, 'https://thomsouyeur.bandcamp.com', NULL, NULL);

-- Pour 'Gogol Bordello'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Gogol Bordello', (SELECT id FROM Country WHERE label = 'États-Unis'), NULL, 'Gypsy Punk', 'https://facebook.com/gogolbordello', 'https://twitter.com/gogolbordello', 'https://instagram.com/gogolbordello', 'https://gogolbordello.com', 'https://youtube.com/gogolbordello', 'https://open.spotify.com/artist/4Ol4cjHGRf6KR4FGi8bU6J');

-- Pour 'Athena'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Athena', (SELECT id FROM Country WHERE label = 'Turquie'), NULL, 'Ska Punk', 'https://facebook.com/athenamusic', NULL, 'https://instagram.com/athenamusic', 'https://athenamusic.com', NULL, 'https://open.spotify.com/artist/4y48KqO2BaGyqHUl6rJHvx');

-- Pour 'Corrupt Vision'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`, `deezer_link`)
VALUES
('Corrupt Vision', (SELECT id FROM Country WHERE label = 'États-Unis'), NULL, 'Anti Ska / Punk Hardcore', 'https://facebook.com/corruptvision', NULL, 'https://instagram.com/corruptvision', NULL, NULL, 'https://open.spotify.com/artist/6dsg9yZW9tMvWiYKP7RCCX', 'https://deezer.page.link/xZrrE9UhwiPj4BmaA');

-- Pour 'Dures & Gays'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Dures & Gays', (SELECT id FROM Country WHERE label = 'France'), NULL, 'Oi!', 'https://facebook.com/duresetgays', NULL, 'https://instagram.com/duresetgays', 'https://duresetgays.bandcamp.com', NULL, NULL);

-- Pour 'Symarip'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Symarip', (SELECT id FROM Country WHERE label = 'Jamaïque'), NULL, 'Ska', 'https://facebook.com/symarip', NULL, 'https://instagram.com/symarip', 'https://symarip.com', 'https://youtube.com/symarip', 'https://open.spotify.com/artist/6R3rdUnYVVfRTHYpRlaMQH');

-- Pour 'Bad Manners'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Bad Manners', (SELECT id FROM Country WHERE label = 'Royaume-Uni'), NULL, 'Ska', 'https://facebook.com/badmannersofficial', 'https://twitter.com/badmanners', 'https://instagram.com/badmannersofficial', 'https://badmanners.co.uk', 'https://youtube.com/user/badmanners1', 'https://open.spotify.com/artist/4z6sEcdmB8IN2Tk7y7deL9');

-- Pour 'Toy Dolls'
INSERT INTO `Artist` (`name`, `country_id`, `logo`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Toy Dolls', (SELECT id FROM Country WHERE label = 'Royaume-Uni'), NULL, 'Punk', 'https://facebook.com/toydolls', 'https://twitter.com/toydolls', 'https://instagram.com/toydolls', 'https://toydolls.co.uk', 'https://youtube.com/user/toydollsofficial', 'https://open.spotify.com/artist/2MLbb9YZH1G0cY3CijbqLO');


-- Ajout des associations événement-artistes
INSERT INTO `Event_Artist` (`event_id`, `artist_id`)
VALUES
(1, (SELECT id FROM Artist WHERE name = 'The Gladiators')),
(1, (SELECT id FROM Artist WHERE name = 'Bad Manners')),
(2, (SELECT id FROM Artist WHERE name = 'Cuir')),
(2, (SELECT id FROM Artist WHERE name = 'Dures & Gays')),
(3, (SELECT id FROM Artist WHERE name = 'Skindred')),
(3, (SELECT id FROM Artist WHERE name = 'Delilah Bon')),
(4, (SELECT id FROM Artist WHERE name = 'Maggy Bolle')),
(5, (SELECT id FROM Artist WHERE name = 'Ultramoderne')),
(6, (SELECT id FROM Artist WHERE name = 'Graphy-T')),
(6, (SELECT id FROM Artist WHERE name = 'Cuir')),
(7, (SELECT id FROM Artist WHERE name = 'Justine')),
(7, (SELECT id FROM Artist WHERE name = 'Brigada Flores Magon')),
(8, (SELECT id FROM Artist WHERE name = 'UltraMoule')),
(9, (SELECT id FROM Artist WHERE name = 'Les Vaches Laitières')),
(10, (SELECT id FROM Artist WHERE name = 'Maggy Bolle')),
(11, (SELECT id FROM Artist WHERE name = 'Symarip')),
(12, (SELECT id FROM Artist WHERE name = 'Mégadef')),
(13, (SELECT id FROM Artist WHERE name = 'TedaAk')),
(14, (SELECT id FROM Artist WHERE name = 'Bad Manners')),
(15, (SELECT id FROM Artist WHERE name = 'Dures & Gays')),
(16, (SELECT id FROM Artist WHERE name = 'Athena')),
(17, (SELECT id FROM Artist WHERE name = 'Justine')),
(18, (SELECT id FROM Artist WHERE name = 'Maggy Bolle')),
(19, (SELECT id FROM Artist WHERE name = 'Justine')),
(20, (SELECT id FROM Artist WHERE name = 'Delilah Bon')),
(21, (SELECT id FROM Artist WHERE name = 'Boom Boom Racoon')),
(22, (SELECT id FROM Artist WHERE name = 'Ultramoderne')),
(23, (SELECT id FROM Artist WHERE name = 'Maggy Bolle')),
(24, (SELECT id FROM Artist WHERE name = 'Cuir')),
(25, (SELECT id FROM Artist WHERE name = 'Dures & Gays')),
(26, (SELECT id FROM Artist WHERE name = 'Bad Manners')),
(27, (SELECT id FROM Artist WHERE name = 'Justine')),
(28, (SELECT id FROM Artist WHERE name = 'Ultramoderne'));

INSERT INTO `Genre_Tag` (`label`)
VALUES ('Punk'),('Ska'),('Electro'),('Indie'),('Folk'),('Metal'),('Rap'),('Jazz'),('Rock'),('Musette'),('Pop'),('Alternative'),('Blues'),('Classical'),('Reggae'),('Experimental'),('Ambient'),('House'),('Techno'),('R&B'),('Soul'),('Hardcore'),('Crust'),('Militant'),('Queer'),('Gothic'),('Industrial'),('Post'),('Progressive'),('Ambient'),('Dub'),('Psychedelic'),('New Wave'),('Synthwave'),("Synth'"),('Grunge'),('Dubstep'),('Trap'),('Hardstyle'),('Funk'),('Country'),('Jungle'),('Metalcore'),('Shoegaze'),('Trip-Hop'),('Breakbeat'),('Garage'),('K-Pop'),('Reggaeton'),('Tango'),('Chiptune'),('Death'),('Black'),('Doom'),('Emo'),('Noise');

-- Associer les genres aux artistes
INSERT INTO `Artist_Genre_Tag` (`artist_id`, `genre_tag_id`) VALUES
(1, 1),(1, 2),(1, 25),(2, 1),(2,24),(2, 22),(2, 23),(2,25),(3, 1),(3, 10),(4, 15),(4, 2),(5, 15),(5, 2),(6, 1),(6, 3),(7, 6),(7, 15),(8, 1),(9, 1),(9, 23),(10, 1),
(11, 25),(11,3),(12, 1),(12, 24),(13, 25),(13,3),(14, 1),(14, 3),(14, 25),(15, 10),(16, 1),(16, 24),(16, 25), (17, 1),(17, 9),(18, 1),(18, 10),(19, 1),(19, 2),(20, 1), (20, 2), (21, 1), (21, 2), (21, 22),(22, 1), (22, 23), (22, 25),(23, 2),(24, 2), (25, 1);

-- Exemple d'insertion pour `User_User`
INSERT INTO `User_User` (`user1_id`, `user2_id`)
VALUES (1, 2),(1, 3),(2, 4),(4, 5),(3, 6),(3, 7),(4, 8),(4, 9),(5, 10),(5, 11),(6, 12),(6, 13),(7, 14),(7, 15),(8, 9),(8, 10),(9, 11),(9, 12),(10, 13),(10, 14),(11, 15),(12, 13),(12, 14),(13, 15),(14, 15);

-- Insérer des données aléatoires dans la table Event_Save
INSERT INTO `Event_Save` (`user_id`, `event_id`, `status`) VALUES
(1, 2, 'going'),
(2, 5, 'interested'),
(3, 7, 'attended'),
(4, 1, 'going'),
(5, 3, 'interested'),
(6, 8, 'attended'),
(7, 4, 'going'),
(8, 6, 'interested'),
(9, 9, 'attended'),
(10, 10, 'going'),
(11, 11, 'interested'),
(12, 12, 'attended'),
(13, 13, 'going'),
(14, 14, 'interested'),
(15, 15, 'attended'),
(6, 2, 'going'),
(6, 5, 'interested'),
(6, 7, 'attended'),
(6, 10, 'going'),
(6, 12, 'attended');

-- Insérer des données aléatoires dans la table User_Favorite_Artist
INSERT INTO `User_Favorite_Artist` (`user_id`, `artist_id`) VALUES
(1, 3),
(2, 7),
(3, 10),
(4, 12),
(5, 5),
(6, 8),
(7, 15),
(8, 2),
(9, 6),
(10, 13),
(11, 9),
(12, 1),
(13, 11),
(14, 4),
(15, 14),
(6, 2),
(6, 4),
(6, 7),
(6, 10),
(6, 15);

-- Insérer des données aléatoires dans la table User_Favorite_Location
INSERT INTO `User_Favorite_Location` (`user_id`, `location_id`) VALUES
(1, 5),
(2, 8),
(3, 12),
(4, 3),
(5, 15),
(6, 7),
(7, 10),
(8, 1),
(9, 4),
(10, 14),
(11, 11),
(12, 6),
(13, 13),
(14, 9),
(15, 2),
(6, 1),
(6, 3),
(6, 7),
(6, 10),
(6, 12);
