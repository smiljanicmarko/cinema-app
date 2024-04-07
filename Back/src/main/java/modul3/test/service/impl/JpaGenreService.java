package modul3.test.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.Genre;
import modul3.test.repository.GenreRepository;
import modul3.test.service.GenreService;

@Service
public class JpaGenreService implements GenreService {

	@Autowired
	private GenreRepository r;
	
	@Override
	public Genre findOneById(Long id) {
		
		return r.findOneById(id);
	}

	@Override
	public List<Genre> findAll() {
		
		return r.findAll();
	}

	@Override
	public Set<Genre> findGenresByIdIn(List<Long> ids) {
		// TODO Auto-generated method stub
		return r.findByIdIn(ids);
	}

	

}
