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
import org.springframework.stereotype.Service;

import modul3.test.model.Movie;
import modul3.test.model.Projection;
import modul3.test.repository.MovieRepository;
import modul3.test.repository.ProjectionRepository;
import modul3.test.repository.TicketRepository;
import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieReportDTO;

@Service
public class JpaMovieService implements MovieService {

	@Autowired
	private MovieRepository r;
	@Autowired
	private ProjectionRepository projectionRepository;
	@Autowired
	private TicketRepository ticketRepository;

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

	@Override
	public List<MovieReportDTO> report(LocalDate start, LocalDate end) {

		System.out.println("iz SERVISAAAAAAAAAAAAAAAAAAAAA: ");


		LocalDateTime startTime = start.atStartOfDay();
		LocalDateTime endTime = end.atTime(23, 59, 59);	
		System.out.println(startTime);
		System.out.println(endTime);
		List<Projection> projections = projectionRepository.findByTimeBetween(startTime, endTime);
		System.out.println("VELICINA LISTEEE "+projections.size());
		List<MovieReportDTO> dtoList = new ArrayList<MovieReportDTO>();

		Set<Movie>movies = new HashSet<Movie>();
		for (Projection p : projections) {
			movies.add(p.getMovie());
		}

		for (Movie m : movies) {
			MovieReportDTO dto= new MovieReportDTO();
			dto.setMovieId(m.getId());
			dto.setMovieName(m.getName());
			dto.setTotalProjections(m.getProjections().size());
			dto.setTotalTickets(ticketRepository.countTicketsByProjectionMovieId(m.getId()));
			Double totalPrice = 0.0;

			for (Projection p : m.getProjections()) {
				totalPrice += p.getPrice() * p.getTickets().size();
			}

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

	



}
