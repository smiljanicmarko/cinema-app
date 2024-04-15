package modul3.test.service.impl;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import modul3.test.model.Movie;
import modul3.test.model.Projection;
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

	@Override
	public Boolean movieAvailable(Long movieId) {
		Movie movie = r.findOneById(movieId);
		boolean available = false;
		if (movie==null) {
			return null;
		}
			List<Projection> projections = movie.getProjections();
			if (projections == null ) {
				return null;
			}
			for (Projection p : projections){
				if (p.getAvailableTickets()> 0 && p.getTime().isAfter(LocalDateTime.now())) {
				available = true;
				break;
				}
			}
				
		
		return available;
	}

//	@Override
//	public List<Movie> report(LocalDate start, LocalDate end) {
//		
//		List<Movie> movies = 
//		
//		
//		return null;
//	}	
	
	
   
}
