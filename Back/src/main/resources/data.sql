INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (1,'miroslav@maildrop.cc','miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','Miroslav','Simic','ADMIN');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (2,'tamara@maildrop.cc','tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','Tamara','Milosavljevic','KORISNIK');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (3,'petar@maildrop.cc','petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','Petar','Jovic','KORISNIK');

INSERT INTO projection_type (type) VALUES ("_2D");
INSERT INTO projection_type (type) VALUES ("_3D");
INSERT INTO projection_type (type) VALUES ("_4D");

INSERT INTO theater (name) VALUES ("Theater 1");
INSERT INTO theater (name) VALUES ("Theater 2");
INSERT INTO theater (name) VALUES ("Theater 3");

INSERT INTO theater_projection_type VALUES (1, 1);
INSERT INTO theater_projection_type VALUES (1, 2);

INSERT INTO theater_projection_type VALUES (2, 1);

INSERT INTO theater_projection_type VALUES (3, 2);
INSERT INTO theater_projection_type VALUES (3, 3);

INSERT INTO seat (theater_id, number) VALUES ( 1, 1);
INSERT INTO seat (theater_id, number) VALUES ( 1, 2);
INSERT INTO seat (theater_id, number) VALUES ( 1, 3);
INSERT INTO seat (theater_id, number) VALUES ( 1, 4);
INSERT INTO seat (theater_id, number) VALUES ( 1, 5);


INSERT INTO seat (theater_id, number) VALUES ( 2, 1);
INSERT INTO seat (theater_id, number) VALUES ( 2, 2);
INSERT INTO seat (theater_id, number) VALUES ( 2, 3);


INSERT INTO seat (theater_id, number) VALUES ( 3, 1);
INSERT INTO seat (theater_id, number) VALUES ( 3, 2);
INSERT INTO seat (theater_id, number) VALUES ( 3, 3);
INSERT INTO seat (theater_id, number) VALUES ( 3, 4);
INSERT INTO seat (theater_id, number) VALUES ( 3, 5);

INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (1, "Maratonci", "Slobodan Sijan", 
"Bogdan Diklic, Bata Stojkovic, Pavle Vujisic", 92, "Yugo-film", "Jugoslavija", 1982, "The Topalovic family has been in the burial business for generations. When the old (150 yrs old) Pantelija dies, five generations of his heirs start to fight for the inheritance.");

INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (2, "Into the wild", "Sean Penn", 
"Emilie Hirsch, Vince Vaughn, Catherine Keener", 148, "Paramount Vantage", "USA", 2007, "After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions and esaceps to Alaska");

INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (3, "Rocky", "John G. Avildsen", 
"Sylvester Stallone, Talia Shire", 120, "United Artists", "USA", 1976, "A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.");

INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (4, "Dune, part one", "Denis Villeneuve",
"Timothée Chalamet, Rebecca Ferguson, Zendaya", 155, "Warner-Bros", "USA", 2021, "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.");
INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (5, "Kad porastem bicu Kengur", "Radivoje Andric",
"Sergej Trifunovic, Marija Karan, Nebojsa Glogovac", 92, "Yodi Movie Craftsman", "Srbija", 2004, "During one peculiar night, the lives of several interconnected people are changed, as they rapidly experience love, disappointment, joy, greed and remorse.");

INSERT INTO movie (id, name, director, actors, duration, distributor, country, year, description) VALUES (6, "Oppenheimer", "Christopher Nolan", 
"Cillian Murphy, Emily Blunt, Matt Damon", 180, "Universal Pictures", "USA", 2023, "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.");
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (7, 'Bruen and Sons', 'Dr. Lloyd Metz-Schimmel Jr.', 'Geraldine Wiza', 153, 'Ledner - Skiles', 'Saint Barthelemy', 2019, 'Culpa laudantium ipsum possimus eos. Ratione consequatur voluptatem ut distinctio libero nobis eligendi provident. Ratione repellat deserunt.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (8, 'Maggio, O\'Hara and Donnelly', 'Joe McKenzie', 'Julius Weissnat', 107, 'Littel Inc', 'Nicaragua', 2004, 'Pariatur delectus et eaque rerum optio autem magnam optio. Eius consequatur nobis cum iure ab maxime quas. Reprehenderit eum provident recusandae placeat nesciunt quos adipisci.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (9, 'Stoltenberg LLC', 'Roosevelt Nolan', 'Trevor Jaskolski', 168, 'Berge - Becker', 'France', 2024, 'Voluptatum deserunt voluptatum repellendus debitis accusamus blanditiis commodi adipisci deserunt. Natus suscipit rerum. Ab placeat quibusdam consectetur assumenda aliquid eveniet necessitatibus.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (10, 'Kautzer Inc', 'Miss Margaret Brown', 'Israel Mraz', 94, 'Abshire - Mante', 'Faroe Islands', 2021, 'Vitae minus ducimus sequi qui sed dolor corporis ullam est. Alias debitis ab consectetur aspernatur eaque reprehenderit vel quasi. Laborum distinctio vitae itaque explicabo delectus porro voluptatum.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (11, 'Thompson Group', 'Rosie Huel', 'Jamie Cummings', 100, 'Kub, Fritsch and Considine', 'Hong Kong', 2018, 'Vitae modi similique quidem. Odit velit animi quia est veniam voluptas modi reprehenderit a. Omnis fuga aperiam.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (12, 'Kris, Windler and Harris', 'Alfredo Waelchi', 'Ernest Hayes', 109, 'Carroll - Lebsack', 'Singapore', 2023, 'Excepturi inventore quos. Deserunt dolore voluptatem animi consequuntur excepturi aut quis. Mollitia ipsam eos.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (13, 'Grant - Donnelly', 'Mr. Luther Kunde', 'Jamie Lueilwitz-Lemke', 156, 'Olson, Metz and Yundt', 'Bulgaria', 2015, 'Suscipit quia dicta laudantium nam possimus. Mollitia recusandae eos. Dolorem accusantium nobis repellendus aspernatur at.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (14, 'McKenzie, Reilly and Doyle', 'Luz White', 'Blanche Quitzon-Metz', 106, 'Dicki and Sons', 'Senegal', 2012, 'Delectus molestias perferendis iure animi. Rerum dolores doloribus quae eum est excepturi facere consequatur. Provident iure sint vitae.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (15, 'Runolfsdottir, Macejkovic and Wiza', 'Bradford Price', 'Rosalie Spinka', 120, 'O\'Hara, Rau and Stroman', 'Cayman Islands', 1992, 'Aliquam sapiente veniam quod mollitia necessitatibus error praesentium nam. Neque consectetur occaecati incidunt perferendis nesciunt tempora atque autem. Iste minus iure.');  
--Insert Into movie (id, name, director, actors, duration, distributor, country, year, description) Values (16, 'Bogisich and Sons', 'Clayton Terry', 'Roberta Wiegand', 80, 'Robel, Goyette and Cruickshank', 'Micronesia', 2018, 'Repellendus harum quisquam voluptatem natus id incidunt. Dolorum suscipit facere. Unde sed voluptatum consequuntur quaerat similique possimus dolorem sed.');  


INSERT INTO genre (id, name) VALUES (1, "Comedy");
INSERT INTO genre (id, name) VALUES (2, "Drama");
INSERT INTO genre (id, name) VALUES (3, "Sport");
INSERT INTO genre (id, name) VALUES (4, "Adventure");
INSERT INTO genre (id, name) VALUES (5, "Action");
INSERT INTO genre (id, name) VALUES (6, "Mystery");
INSERT INTO genre (id, name) VALUES (7, "Biography");
INSERT INTO genre (id, name) VALUES (8, "History");

INSERT INTO movie_genre (movie_id, genre_id) VALUES (1, 1);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (1, 2);

INSERT INTO movie_genre (movie_id, genre_id) VALUES (2, 4);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (2, 6);


INSERT INTO movie_genre (movie_id, genre_id) VALUES (3, 2);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (3, 3);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (3, 5);

INSERT INTO movie_genre (movie_id, genre_id) VALUES (4, 2);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (4, 4);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (4, 5);

INSERT INTO movie_genre (movie_id, genre_id) VALUES (5, 1);

INSERT INTO movie_genre (movie_id, genre_id) VALUES (6, 2);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (6, 7);
INSERT INTO movie_genre (movie_id, genre_id) VALUES (6, 8);

INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (1, 1, 1, '2024-04-14 20:00', 500, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (1, 1, 2, '2024-04-14 21:00', 500, 1 );

INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (2, 1, 2, '2024-04-15 20:00', 500, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (2, 1, 1, '2024-04-16 20:00', 500, 1 );

INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 2, 1, '2024-04-26 20:00', 600, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 3, 3, '2024-04-14 20:00', 700, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 3, 3, '2024-04-15 20:00', 700, 1 );


INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (1, 1, '2024-04-01 14:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (1, 2, '2024-04-03 17:00', 3);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (2, 6, '2024-04-01 20:00', 2);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (3, 6, '2024-04-03 18:00', 3);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (4, 2, '2024-04-01 20:00', 2);


INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (7, 1, '2024-04-01 14:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (7, 2, '2024-04-03 17:00', 3);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (7, 3, '2024-04-01 14:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (7, 4, '2024-04-03 17:00', 3);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (7, 5, '2024-04-03 17:00', 3);


INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (5, 4, '2024-04-03 19:00', 3);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (5, 1, '2024-04-01 14:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (5, 2, '2024-04-03 17:00', 3);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (5, 3, '2024-04-01 14:00', 2);



--'2020-06-21 20:00'
--'2020-07-22 21:00'
--'2020-06-22 20:00'
--'2020-08-10 18:00'
--'2020-08-12 19:00'

