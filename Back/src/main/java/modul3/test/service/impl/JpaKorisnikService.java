package modul3.test.service.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import modul3.test.enumeration.KorisnickaUloga;
import modul3.test.model.Korisnik;
import modul3.test.repository.KorisnikRepository;
import modul3.test.service.KorisnikService;
import modul3.test.web.dto.KorisnikPromenaLozinkeDto;

@Service
public class JpaKorisnikService implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<Korisnik> findOne(Long id) {
        return korisnikRepository.findById(id);
    }

    @Override
    public List<Korisnik> findAll() {
        return korisnikRepository.findAll();
    }

    @Override
    public Page<Korisnik> findAll(int brojStranice) {
        return korisnikRepository.findAll(PageRequest.of(brojStranice,10));
    }

    @Override
    public Korisnik save(Korisnik korisnik) {
        korisnik.setUloga(KorisnickaUloga.KORISNIK);
        return korisnikRepository.save(korisnik);
    }

    @Override
    public void delete(Long id) {
        korisnikRepository.deleteById(id);
    }

    @Override
    public Optional<Korisnik> findbyKorisnickoIme(String korisnickoIme) {
        return korisnikRepository.findFirstByKorisnickoIme(korisnickoIme);
    }

    @Override
    public boolean changePassword(Long id, KorisnikPromenaLozinkeDto korisnikPromenaLozinkeDto) {
        Optional<Korisnik> rezultat = korisnikRepository.findById(id);

        if(!rezultat.isPresent()) {
            throw new EntityNotFoundException();
        }

        Korisnik korisnik = rezultat.get();

        boolean passwordsMatch = BCrypt.checkpw(korisnikPromenaLozinkeDto.getStaraLozinka(), korisnik.getLozinka());
        if(!korisnik.getKorisnickoIme().equals(korisnikPromenaLozinkeDto.getKorisnickoIme()) || !passwordsMatch){
            return false;
        }

        // dodatak za zadatak 2
        String password = korisnikPromenaLozinkeDto.getLozinka();
        if (!korisnikPromenaLozinkeDto.getLozinka().equals("")) {
            password = passwordEncoder.encode(korisnikPromenaLozinkeDto.getLozinka());
        }

        korisnik.setLozinka(password);

        korisnikRepository.save(korisnik);

        return true;
    }

	@Override
	public Korisnik updateRole(Long id) {
		Korisnik korisnik = korisnikRepository.findOneById(id);
		if (korisnik != null) {
			if(korisnik.getUloga().toString().equals("KORISNIK")) {				
				korisnik.setUloga(KorisnickaUloga.ADMIN);				
			}else {
				korisnik.setUloga(KorisnickaUloga.KORISNIK);
			}
			korisnik = korisnikRepository.save(korisnik);
		}
		
		return korisnik;
	}

	@Override
	public Korisnik findOneById(Long id) {
		// TODO Auto-generated method stub
		return korisnikRepository.findOneById(id);
	}

	@Override
	public Korisnik logicalDelete(Long id) {
		Korisnik k = korisnikRepository.findOneById(id);		
		if (k != null) {
			k.setDeleted(true);
			korisnikRepository.save(k);
		}
		return k;
	}

	@Override
	public Korisnik findByKorisnickoIme(String korisnickoIme) {
		// TODO Auto-generated method stub
		return korisnikRepository.findByKorisnickoIme(korisnickoIme);
	}
}
