CREATE TABLE `User` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image_url',
  `preferred_streaming_platform` ENUM ('Spotify', 'Deezer', 'YouTube', 'Bandcamp', 'AppleMusic', 'AmazonMusic') NOT NULL DEFAULT 'YouTube',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Country` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL
);

CREATE TABLE `Location` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country_id` int NOT NULL,
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
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`country_id`) REFERENCES `Country`(`id`)
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
  `country_id` int NOT NULL,
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

CREATE TABLE `Badge` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `descr` text NOT NULL
);

CREATE TABLE `User_Badge` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge` int NOT NULL,
  `awarded_at` date NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`badge`) REFERENCES `Badge`(`id`)
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

INSERT INTO `Country` (`label`) VALUES ('France'),('Allemagne'),('Italie'),('Espagne'),('Royaume-Uni'),('Belgique'),('Pays-Bas'),('Suisse'),('Autriche'),('Suède'),('Norvège'),('Danemark'),('Finlande'),('Portugal'),('Grèce'),('Irlande'),('Pologne'),('République Tchèque'),('Hongrie'),('Roumanie'),('Bulgarie'),('Croatie'),('Slovaquie'),('Slovénie'),('Lituanie'),('Lettonie'),('Estonie'),('Luxembourg'),('Malte'),('Chypre'),('Russie'),('Turquie'),('Ukraine'),('Islande'),('États-Unis'),('Canada'),('Brésil'),('Australie'),('Japon'),('Chine'),('Inde'),('Afrique du Sud');

INSERT INTO `Location` (`name`, `address`, `city`, `state`, `country_id`, `postal_code`, `latitude`, `longitude`)
VALUES
('Au Bout de Nos Rêves', "Grand'Route 141", 'Tournai', '', (SELECT id FROM Country WHERE label = 'Belgique'), '7500', 50.595729, 3.480900),
('Le Grand Mix', '5 Rue de l\'Hôpital Militaire', 'Tourcoing', '', (SELECT id FROM Country WHERE label = 'France'), '59200', 50.721500, 3.157000),
('Aéronef', '168 Avenue Willy Brandt', 'Lille', '', (SELECT id FROM Country WHERE label = 'France'), '59777', 50.637083, 3.070833),
('Le Splendid', '1 Rue de la Gare', 'Lille', '', (SELECT id FROM Country WHERE label = 'France'), '59000', 50.631788, 3.067778),
('La Cave aux Poètes', '16 Rue du Grand Chemin', 'Roubaix', '', (SELECT id FROM Country WHERE label = 'France'), '59100', 50.691400, 3.174700),
('Théâtre Sébastopol', 'Place Sébastopol', 'Lille', '', (SELECT id FROM Country WHERE label = 'France'), '59000', 50.629788, 3.053211),
('La Brat Cave', '23 Rue Henri Kolb', 'Lille', '', (SELECT id FROM Country WHERE label = 'France'), '59000', 50.624164, 3.065137);

INSERT INTO `Event` (`title`, `description`, `start_date`, `end_date`, `start_time`, `location_id`, `created_by`, `poster_image`, `price_prevent`, `price_at_door`, `facebook_link`, `is_free`)
VALUES
('Concert Punk Rock', 'Un concert énergique avec plusieurs groupes locaux.', '2024-09-15', NULL, '20:00:00', (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves'), 1, 'punk_rock_poster.jpg', 10.00, 12.00, 'https://facebook.com/event1', false),
('Soirée Ska', 'Venez danser sur les rythmes endiablés du ska !', '2024-09-22', NULL, '21:00:00', (SELECT id FROM Location WHERE name = 'Le Grand Mix'), 2, 'ska_night_poster.jpg', 8.00, 10.00, NULL, false),
('Festival Musique du Monde', 'Une journée dédiée à la découverte de musiques du monde entier.', '2024-10-01', '2024-10-02', '15:00:00', (SELECT id FROM Location WHERE name = 'Aéronef'), 3, NULL, 15.00, 20.00, 'https://facebook.com/event3', false),
('Soirée Electro', 'Des DJs de renom pour une nuit électrisante.', '2024-09-29', NULL, '22:00:00', (SELECT id FROM Location WHERE name = 'Le Splendid'), 4, 'electro_night_poster.jpg', 12.00, 15.00, NULL, false),
('Jam Session Jazz', 'Scène ouverte pour tous les amateurs de jazz.', '2024-10-05', NULL, '19:30:00', (SELECT id FROM Location WHERE name = 'La Cave aux Poètes'), 5, NULL, NULL, NULL, NULL, true),
('Concert Rap', 'Venez découvrir la scène rap locale.', '2024-10-10', NULL, '20:00:00', (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol'), 6, 'rap_concert_poster.jpg', 10.00, 12.00, NULL, false),
('Gala de Musette', 'Un gala pour les amateurs de musette et de danse.', '2024-10-15', NULL, '20:00:00', (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves'), 7, 'musette_gala_poster.jpg', 8.00, 10.00, 'https://facebook.com/event7', false),
('Soirée Indé', 'Concerts de groupes indépendants de la région.', '2024-10-20', NULL, '19:00:00', (SELECT id FROM Location WHERE name = 'La Brat Cave'), 8, NULL, 5.00, 7.00, NULL, false),
('Concert Metal', 'Un concert pour les fans de métal avec des groupes locaux.', '2024-11-01', NULL, '21:00:00', (SELECT id FROM Location WHERE name = 'Le Grand Mix'), 9, 'metal_concert_poster.jpg', 12.00, 15.00, 'https://facebook.com/event9', false),
('Soirée Folk', 'Une soirée douce et mélodique avec des artistes folk.', '2024-11-05', NULL, '20:30:00', (SELECT id FROM Location WHERE name = 'La Cave aux Poètes'), 10, NULL, 8.00, 10.00, 'https://facebook.com/event10', false);

-- Ajout des artistes fictifs
INSERT INTO `Artist` (`name`, `country_id`, `genre`, `facebook_link`, `twitter_link`, `instagram_link`, `website`, `youtube_link`, `spotify_link`)
VALUES
('Les Révoltés', (SELECT id FROM Country WHERE label = 'France'), 'Punk', 'https://facebook.com/lesrevoltes', NULL, 'https://instagram.com/lesrevoltes', 'https://lesrevoltes.fr', 'https://youtube.com/lesrevoltes', 'https://spotify.com/lesrevoltes'),
('Les Invincibles', (SELECT id FROM Country WHERE label = 'France'), 'Ska', NULL, NULL, NULL, 'https://lesinvincibles.fr', NULL, 'https://spotify.com/lesinvincibles'),
('The Cosmic Beats', (SELECT id FROM Country WHERE label = 'Belgique'), 'Electro', 'https://facebook.com/thecosmicbeats', 'https://twitter.com/thecosmicbeats', 'https://instagram.com/thecosmicbeats', 'https://thecosmicbeats.be', NULL, 'https://spotify.com/thecosmicbeats'),
('L’Assemblée', (SELECT id FROM Country WHERE label = 'Belgique'), 'Indie', 'https://facebook.com/lassemblee', NULL, 'https://instagram.com/lassemblee', 'https://assemblee.be', 'https://youtube.com/lassemblee', 'https://spotify.com/lassemblee'),
('Les Échos du Monde', (SELECT id FROM Country WHERE label = 'France'), 'Folk', NULL, NULL, 'https://instagram.com/echosdumonde', 'https://echosdumonde.fr', NULL, NULL),
('Les Rouges', (SELECT id FROM Country WHERE label = 'France'), 'Metal', 'https://facebook.com/lesrouges', 'https://twitter.com/lesrouges', NULL, 'https://lesrouges.fr', NULL, 'https://spotify.com/lesrouges'),
('The Urban Legends', (SELECT id FROM Country WHERE label = 'France'), 'Rap', NULL, 'https://twitter.com/theurbanlegends', NULL, NULL, 'https://youtube.com/theurbanlegends', 'https://spotify.com/theurbanlegends'),
('SoulSync', (SELECT id FROM Country WHERE label = 'Belgique'), 'Jazz', NULL, NULL, 'https://instagram.com/soulsync', NULL, 'https://youtube.com/soulsync', 'https://spotify.com/soulsync'),
('The Brat Pack', (SELECT id FROM Country WHERE label = 'France'), 'Rock', 'https://facebook.com/thebratpack', NULL, 'https://instagram.com/thebratpack', 'https://thebratpack.fr', NULL, NULL),
('Moonlight Melody', (SELECT id FROM Country WHERE label = 'France'), 'Musette', NULL, 'https://twitter.com/moonlightmelody', NULL, NULL, 'https://youtube.com/moonlightmelody', 'https://spotify.com/moonlightmelody');

-- Ajout des associations événement-artistes
INSERT INTO `Event_Artist` (`event_id`, `artist_id`)
VALUES
((SELECT id FROM Event WHERE title = 'Concert Punk Rock'), (SELECT id FROM Artist WHERE name = 'Les Révoltés')),
((SELECT id FROM Event WHERE title = 'Concert Punk Rock'), (SELECT id FROM Artist WHERE name = 'Les Invincibles')),
((SELECT id FROM Event WHERE title = 'Soirée Ska'), (SELECT id FROM Artist WHERE name = 'Les Invincibles')),
((SELECT id FROM Event WHERE title = 'Soirée Ska'), (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
((SELECT id FROM Event WHERE title = 'Festival Musique du Monde'), (SELECT id FROM Artist WHERE name = 'L’Assemblée')),
((SELECT id FROM Event WHERE title = 'Festival Musique du Monde'), (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
((SELECT id FROM Event WHERE title = 'Soirée Electro'), (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
((SELECT id FROM Event WHERE title = 'Soirée Electro'), (SELECT id FROM Artist WHERE name = 'The Brat Pack')),
((SELECT id FROM Event WHERE title = 'Jam Session Jazz'), (SELECT id FROM Artist WHERE name = 'SoulSync')),
((SELECT id FROM Event WHERE title = 'Jam Session Jazz'), (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
((SELECT id FROM Event WHERE title = 'Concert Rap'), (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
((SELECT id FROM Event WHERE title = 'Concert Rap'), (SELECT id FROM Artist WHERE name = 'Les Rouges')),
((SELECT id FROM Event WHERE title = 'Gala de Musette'), (SELECT id FROM Artist WHERE name = 'Moonlight Melody')),
((SELECT id FROM Event WHERE title = 'Gala de Musette'), (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
((SELECT id FROM Event WHERE title = 'Soirée Indé'), (SELECT id FROM Artist WHERE name = 'L’Assemblée')),
((SELECT id FROM Event WHERE title = 'Soirée Indé'), (SELECT id FROM Artist WHERE name = 'The Brat Pack')),
((SELECT id FROM Event WHERE title = 'Concert Metal'), (SELECT id FROM Artist WHERE name = 'Les Rouges')),
((SELECT id FROM Event WHERE title = 'Concert Metal'), (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
((SELECT id FROM Event WHERE title = 'Soirée Folk'), (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
((SELECT id FROM Event WHERE title = 'Soirée Folk'), (SELECT id FROM Artist WHERE name = 'Moonlight Melody'));

INSERT INTO `Genre_Tag` (`label`)
VALUES ('Punk'),('Ska'),('Electro'),('Indie'),('Folk'),('Metal'),('Rap'),('Jazz'),('Rock'),('Musette'),('Pop'),('Alternative'),('Blues'),('Classical'),('Reggae'),('Experimental'),('Ambient'),('House'),('Techno'),('R&B'),('Soul');

-- Associer les genres aux artistes
INSERT INTO `Artist_Genre_Tag` (`artist_id`, `genre_tag_id`)
VALUES
((SELECT id FROM Artist WHERE name = 'Les Révoltés'), (SELECT id FROM Genre_Tag WHERE label = 'Punk')),
((SELECT id FROM Artist WHERE name = 'Les Invincibles'), (SELECT id FROM Genre_Tag WHERE label = 'Ska')),
((SELECT id FROM Artist WHERE name = 'The Cosmic Beats'), (SELECT id FROM Genre_Tag WHERE label = 'Electro')),
((SELECT id FROM Artist WHERE name = 'L’Assemblée'), (SELECT id FROM Genre_Tag WHERE label = 'Indie')),
((SELECT id FROM Artist WHERE name = 'Les Échos du Monde'), (SELECT id FROM Genre_Tag WHERE label = 'Folk')),
((SELECT id FROM Artist WHERE name = 'Les Rouges'), (SELECT id FROM Genre_Tag WHERE label = 'Metal')),
((SELECT id FROM Artist WHERE name = 'The Urban Legends'), (SELECT id FROM Genre_Tag WHERE label = 'Rap')),
((SELECT id FROM Artist WHERE name = 'SoulSync'), (SELECT id FROM Genre_Tag WHERE label = 'Jazz')),
((SELECT id FROM Artist WHERE name = 'The Brat Pack'), (SELECT id FROM Genre_Tag WHERE label = 'Rock')),
((SELECT id FROM Artist WHERE name = 'Moonlight Melody'), (SELECT id FROM Genre_Tag WHERE label = 'Musette'));

-- Exemple d'insertion pour `Event_Save`
INSERT INTO `Event_Save` (`user_id`, `event_id`, `status`)
VALUES
(1, (SELECT id FROM Event WHERE title = 'Concert Punk Rock'), 'going'),
(1, (SELECT id FROM Event WHERE title = 'Soirée Ska'), 'interested'),
(2, (SELECT id FROM Event WHERE title = 'Festival Musique du Monde'), 'attended'),
(2, (SELECT id FROM Event WHERE title = 'Soirée Electro'), 'going'),
(3, (SELECT id FROM Event WHERE title = 'Jam Session Jazz'), 'interested'),
(3, (SELECT id FROM Event WHERE title = 'Concert Rap'), 'attended'),
(4, (SELECT id FROM Event WHERE title = 'Gala de Musette'), 'going'),
(4, (SELECT id FROM Event WHERE title = 'Soirée Indé'), 'interested'),
(5, (SELECT id FROM Event WHERE title = 'Concert Metal'), 'attended'),
(5, (SELECT id FROM Event WHERE title = 'Soirée Ska'), 'going'),
(6, (SELECT id FROM Event WHERE title = 'Soirée Folk'), 'interested'),
(6, (SELECT id FROM Event WHERE title = 'Festival Musique du Monde'), 'going'),
(7, (SELECT id FROM Event WHERE title = 'Soirée Electro'), 'attended'),
(7, (SELECT id FROM Event WHERE title = 'Jam Session Jazz'), 'interested'),
(8, (SELECT id FROM Event WHERE title = 'Concert Rap'), 'going'),
(8, (SELECT id FROM Event WHERE title = 'Concert Metal'), 'attended'),
(9, (SELECT id FROM Event WHERE title = 'Gala de Musette'), 'interested'),
(9, (SELECT id FROM Event WHERE title = 'Soirée Indé'), 'going'),
(10, (SELECT id FROM Event WHERE title = 'Soirée Ska'), 'attended'),
(10, (SELECT id FROM Event WHERE title = 'Soirée Folk'), 'interested'),
(11, (SELECT id FROM Event WHERE title = 'Festival Musique du Monde'), 'going'),
(11, (SELECT id FROM Event WHERE title = 'Concert Punk Rock'), 'interested'),
(12, (SELECT id FROM Event WHERE title = 'Soirée Electro'), 'attended'),
(12, (SELECT id FROM Event WHERE title = 'Jam Session Jazz'), 'going'),
(13, (SELECT id FROM Event WHERE title = 'Concert Metal'), 'interested'),
(13, (SELECT id FROM Event WHERE title = 'Soirée Indé'), 'attended'),
(14, (SELECT id FROM Event WHERE title = 'Gala de Musette'), 'going'),
(14, (SELECT id FROM Event WHERE title = 'Soirée Ska'), 'interested'),
(15, (SELECT id FROM Event WHERE title = 'Soirée Folk'), 'attended'),
(15, (SELECT id FROM Event WHERE title = 'Concert Rap'), 'going');

-- Exemple d'insertion pour `User_Favorite_Artist`
INSERT INTO `User_Favorite_Artist` (`user_id`, `artist_id`)
VALUES
(1, (SELECT id FROM Artist WHERE name = 'Les Révoltés')),
(1, (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
(2, (SELECT id FROM Artist WHERE name = 'L’Assemblée')),
(2, (SELECT id FROM Artist WHERE name = 'Les Rouges')),
(3, (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
(3, (SELECT id FROM Artist WHERE name = 'SoulSync')),
(4, (SELECT id FROM Artist WHERE name = 'Moonlight Melody')),
(4, (SELECT id FROM Artist WHERE name = 'The Brat Pack')),
(5, (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
(5, (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
(6, (SELECT id FROM Artist WHERE name = 'Les Révoltés')),
(6, (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
(7, (SELECT id FROM Artist WHERE name = 'SoulSync')),
(7, (SELECT id FROM Artist WHERE name = 'Moonlight Melody')),
(8, (SELECT id FROM Artist WHERE name = 'The Brat Pack')),
(8, (SELECT id FROM Artist WHERE name = 'L’Assemblée')),
(9, (SELECT id FROM Artist WHERE name = 'Les Rouges')),
(9, (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
(10, (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
(10, (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
(11, (SELECT id FROM Artist WHERE name = 'Moonlight Melody')),
(11, (SELECT id FROM Artist WHERE name = 'SoulSync')),
(12, (SELECT id FROM Artist WHERE name = 'The Brat Pack')),
(12, (SELECT id FROM Artist WHERE name = 'Les Révoltés')),
(13, (SELECT id FROM Artist WHERE name = 'The Urban Legends')),
(13, (SELECT id FROM Artist WHERE name = 'The Cosmic Beats')),
(14, (SELECT id FROM Artist WHERE name = 'L’Assemblée')),
(14, (SELECT id FROM Artist WHERE name = 'Les Échos du Monde')),
(15, (SELECT id FROM Artist WHERE name = 'Moonlight Melody')),
(15, (SELECT id FROM Artist WHERE name = 'The Brat Pack'));

-- Exemple d'insertion pour `User_Favorite_Location`
INSERT INTO `User_Favorite_Location` (`user_id`, `location_id`)
VALUES
(1, (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves')),
(1, (SELECT id FROM Location WHERE name = 'Le Grand Mix')),
(2, (SELECT id FROM Location WHERE name = 'Aéronef')),
(2, (SELECT id FROM Location WHERE name = 'Le Splendid')),
(3, (SELECT id FROM Location WHERE name = 'La Cave aux Poètes')),
(3, (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol')),
(4, (SELECT id FROM Location WHERE name = 'La Brat Cave')),
(4, (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves')),
(5, (SELECT id FROM Location WHERE name = 'Le Grand Mix')),
(5, (SELECT id FROM Location WHERE name = 'Aéronef')),
(6, (SELECT id FROM Location WHERE name = 'Le Splendid')),
(6, (SELECT id FROM Location WHERE name = 'La Cave aux Poètes')),
(7, (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol')),
(7, (SELECT id FROM Location WHERE name = 'La Brat Cave')),
(8, (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves')),
(8, (SELECT id FROM Location WHERE name = 'Le Grand Mix')),
(9, (SELECT id FROM Location WHERE name = 'Aéronef')),
(9, (SELECT id FROM Location WHERE name = 'Le Splendid')),
(10, (SELECT id FROM Location WHERE name = 'La Cave aux Poètes')),
(10, (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol')),
(11, (SELECT id FROM Location WHERE name = 'La Brat Cave')),
(11, (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves')),
(12, (SELECT id FROM Location WHERE name = 'Le Grand Mix')),
(12, (SELECT id FROM Location WHERE name = 'Aéronef')),
(13, (SELECT id FROM Location WHERE name = 'Le Splendid')),
(13, (SELECT id FROM Location WHERE name = 'La Cave aux Poètes')),
(14, (SELECT id FROM Location WHERE name = 'Théâtre Sébastopol')),
(14, (SELECT id FROM Location WHERE name = 'La Brat Cave')),
(15, (SELECT id FROM Location WHERE name = 'Au Bout de Nos Rêves')),
(15, (SELECT id FROM Location WHERE name = 'Le Grand Mix'));

-- Exemple d'insertion pour `User_User`
INSERT INTO `User_User` (`user1_id`, `user2_id`)
VALUES (1, 2),(1, 3),(2, 4),(4, 5),(3, 6),(3, 7),(4, 8),(4, 9),(5, 10),(5, 11),(6, 12),(6, 13),(7, 14),(7, 15),(8, 9),(8, 10),(9, 11),(9, 12),(10, 13),(10, 14),(11, 15),(12, 13),(12, 14),(13, 15),(14, 15);

-- Insérer des badges dans la table `Badge`
INSERT INTO `Badge` (`id`, `label`, `img`, `descr`)
VALUES
(1, 'Top Contributor', 'https://example.com/badges/top_contributor.png', 'Attribué pour avoir ajouté le plus d\'événements dans un mois.'),
(2, 'Groupie', 'https://example.com/badges/groupie.png', 'Attribué pour avoir assisté au plus grand nombre d\'événements d\'un seul artiste.'),
(3, 'Pilier de Comptoir', 'https://example.com/badges/pilier_de_comptoir.png', 'Attribué pour avoir assisté au plus grand nombre d\'événements dans un seul lieu.');

-- Exemple d'insertion pour `User_Badge`
INSERT INTO `User_Badge` (`user_id`, `badge`, `awarded_at`)
VALUES
(1, 1, '2024-01-15'),(2, 2, '2024-02-20'),(3, 3, '2024-03-25'),(4, 1, '2024-04-10'),(5, 2, '2024-05-18'),(6, 3, '2024-06-22'),(7, 1, '2024-07-30'),(8, 2, '2024-08-15'),(9, 3, '2024-09-05'),(10, 1, '2024-10-12'),(11, 2, '2024-11-23'),(12, 3, '2024-12-30'),(13, 1, '2024-01-05'),(14, 2, '2024-02-14'),(15, 3, '2024-03-21');
