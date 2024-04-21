package modul3.test.service.impl;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import modul3.test.model.Movie;
import modul3.test.model.Projection;
import modul3.test.repository.MovieRepository;
import modul3.test.repository.ProjectionRepository;
import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieReportDTO;

@Service
public class JpaMovieService implements MovieService {

	@Autowired
	private MovieRepository r;
	@Autowired
	private ProjectionRepository projectionRepository;


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

	@Override
	public List<MovieReportDTO> report(LocalDate start, LocalDate end) {



		LocalDateTime startTime = start.atStartOfDay();
		LocalDateTime endTime = end.atTime(23, 59, 59);	

		List<Projection> projections = projectionRepository.findByTimeBetween(startTime, endTime);		
		List<MovieReportDTO> dtoList = new ArrayList<MovieReportDTO>();

		Set<Movie>movies = new HashSet<Movie>();
		for (Projection p : projections) {
			movies.add(p.getMovie());
		}

		for (Movie m : movies) {
			MovieReportDTO dto= new MovieReportDTO();
			dto.setMovieId(m.getId());
			dto.setMovieName(m.getName());


			int projectionsNumber = 0;
			int  ticketsNumber = 0;
			Double totalPrice = 0.0;

			for (Projection p : projections) {
				if (p.getMovie().getId() == m.getId()) {

					projectionsNumber ++;
					ticketsNumber += p.getTickets().size();
					totalPrice += p.getTickets().size() * p.getPrice();
				}
			}		

			dto.setTotalProjections(projectionsNumber);			
			dto.setTotalTickets(ticketsNumber);
			dto.setTotalPrice(totalPrice);

			dtoList.add(dto);
		}

		return dtoList;
	}

	@Override
	public Boolean logicallyDelete(Long id) {
		Movie m = r.findOneById(id);
		if (m!= null) {
			m.setDeleted(true);	
			r.save(m);
		}
		if (m== null) {
			return false;
		}
		return true;


	}

	@Override
	public Integer numberOfProjectionsForMovie(Long movieId) {
		Movie m = r.findOneById(movieId);
		Integer projectionsNumber = 0;
		if (m != null) {
			projectionsNumber = m.getProjections().size();
		}

		return projectionsNumber;
	}

	@Override
	public Page<Movie> searchMovies(String name, String distributor, String country, String genres,
			Integer durationFrom, Integer durationTo, Integer yearFrom, Integer yearTo, int pageNo, String sortBy,
			String orderBy) {

		Sort sort = Sort.by(Sort.Direction.fromString(orderBy), sortBy);
		Pageable customPageable = PageRequest.of(pageNo, 8, sort);
		return r.searchMovies(name, distributor, country, genres, durationFrom, durationTo, yearFrom, yearTo, customPageable);		

	}







}
