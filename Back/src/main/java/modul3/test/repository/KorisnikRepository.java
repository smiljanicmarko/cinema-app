package modul3.test.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.Korisnik;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

    Optional<Korisnik> findFirstByKorisnickoIme(String korisnickoIme);

    Optional<Korisnik> findFirstByKorisnickoImeAndLozinka(String korisnickoIme,String lozinka);
    
    Korisnik findOneById (Long id);
    
    Korisnik findByKorisnickoIme(String korisnickoIme);
}
