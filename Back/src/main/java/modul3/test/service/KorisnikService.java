package modul3.test.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import modul3.test.model.Korisnik;
import modul3.test.web.dto.KorisnikPromenaLozinkeDto;

public interface KorisnikService {

    Optional<Korisnik> findOne(Long id);

    List<Korisnik> findAll();

    Page<Korisnik> findAll(int brojStranice);

    Korisnik save(Korisnik korisnik);

    void delete(Long id);
    
    Korisnik logicalDelete (Long id);

    Optional<Korisnik> findbyKorisnickoIme(String korisnickoIme);

    boolean changePassword(Long id, KorisnikPromenaLozinkeDto korisnikPromenaLozinkeDto);
    
    Korisnik updateRole (Long id);
    
    Korisnik findOneById (Long id);
    
}
