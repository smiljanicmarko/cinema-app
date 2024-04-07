package modul3.test.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import modul3.test.model.Movie;
import modul3.test.repository.MovieRepository;
import modul3.test.service.MovieService;

@Service
public class JpaMovieService implements MovieService {

	@Autowired
	private MovieRepository r;

	@Override
	public Movie findOneById(Long id) {
		
		return r.findOneById(id);
	}

	@Override
	public List<Movie> findAll() {
		
		return r.findAll();
	}

	@Override
	public Movie save(Movie m) {
		
		return r.save(m);
	}

	@Override
	public Movie update(Movie m) {
		
		return r.save(m);
	}

	@Override
	public Movie delete(Long id) {
		Movie m = r.findOneById(id);
		if (m!= null) {
			r.deleteById(id);
		}
		return m;
	}

	@Override
	public Page<Movie> searchMovies(String name, String distributor, String country, Long genreId, Integer durationFrom,
			Integer durationTo, Integer yearFrom, Integer yearTo, int pageNo) {
		
		return r.searchMovies(name, distributor, country, genreId, durationFrom, durationTo, yearFrom, yearTo, PageRequest.of(pageNo, 8));
	}	
	
	
   
}
