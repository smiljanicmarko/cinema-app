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
INSERT INTO theater_projection_type VALUES (1, 3);

INSERT INTO theater_projection_type VALUES (2, 1);

INSERT INTO theater_projection_type VALUES (3, 2);
INSERT INTO theater_projection_type VALUES (3, 3);

INSERT INTO seat (theater_id) VALUES ( 1);
INSERT INTO seat (theater_id) VALUES ( 1);
INSERT INTO seat (theater_id) VALUES ( 1);
INSERT INTO seat (theater_id) VALUES ( 1);
INSERT INTO seat (theater_id) VALUES ( 1);


INSERT INTO seat (theater_id) VALUES ( 2);
INSERT INTO seat (theater_id) VALUES ( 2);
INSERT INTO seat (theater_id) VALUES ( 2);


INSERT INTO seat (theater_id) VALUES ( 3);
INSERT INTO seat (theater_id) VALUES ( 3);
INSERT INTO seat (theater_id) VALUES ( 3);
INSERT INTO seat (theater_id) VALUES ( 3);
INSERT INTO seat (theater_id) VALUES ( 3);

INSERT INTO movie (id, name, director, actors, genres, duration, distributor, country, year, description) VALUES (1, "Maratonci", "Slobodan Sijan", 
"Bogdan Diklic, Bata Stojkovic, Pavle Vujisic", "Komedija, Drama", 92, "Yugo-film", "Jugoslavija", 1982, "The Topalovic family has been in the burial business for generations. When the old (150 yrs old) Pantelija dies, five generations of his heirs start to fight for the inheritance.");



--'2020-06-21 20:00'
--'2020-07-22 21:00'
--'2020-06-22 20:00'
--'2020-08-10 18:00'
--'2020-08-12 19:00'

