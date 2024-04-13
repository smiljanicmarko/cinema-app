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
VALUES (1, 1, 1, '2024-04-13 20:00', 500, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (1, 1, 2, '2024-04-14 21:00', 500, 1 );

INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (2, 1, 2, '2024-04-14 20:00', 500, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (2, 1, 1, '2024-04-13 20:00', 500, 1 );

INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 2, 1, '2024-04-14 20:00', 600, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 3, 3, '2024-04-13 20:00', 700, 1 );
INSERT INTO projection (movie_id, projection_type_id, theater_id, time, price, admin_id)
VALUES (3, 3, 3, '2024-04-15 20:00', 700, 1 );


INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (1, 1, '2024-04-01 14:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (1, 2, '2024-04-03 17:00', 3);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (2, 1, '2024-04-01 20:00', 2);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (3, 6, '2024-04-03 18:00', 3);

INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (4, 2, '2024-04-01 20:00', 2);
INSERT INTO ticket (projection_id, seat_id, purchase_time, user_id)
VALUE (5, 3, '2024-04-03 19:00', 3);

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

--'2020-06-21 20:00'
--'2020-07-22 21:00'
--'2020-06-22 20:00'
--'2020-08-10 18:00'
--'2020-08-12 19:00'

