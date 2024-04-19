package modul3.test.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import modul3.test.model.Movie;
import modul3.test.model.Projection;
import modul3.test.model.ProjectionType;
import modul3.test.model.Theater;
import modul3.test.repository.ProjectionRepository;
import modul3.test.service.ProjectionService;

@Service
public class JpaProjectionService implements ProjectionService {

	@Autowired
	private ProjectionRepository r;

	@Override
	public Projection findOneById(Long id) {

		return r.findOneById(id);
	}

	@Override
	public List<Projection> findAll() {

		return r.findAll();
	}

	@Override
	public Projection save(Projection p) {

		return r.save(p);
	}

	@Override
	public Projection update(Projection p) {

		return r.save(p);
	}

	@Override
	public Projection delete(Long id) {
		Projection p = r.findOneById(id);
		if (p!=null) {
			r.deleteById(id);
		}
		return p;
	}

	@Override
	public Projection deleteLogically(Long id) {
		Projection p = r.findOneById(id);
		if (p!=null) {
			p.setDeleted(true);
			r.save(p);
		}
		return p;
	}



	@Override
	public List<Projection> todaysProjections(LocalDateTime startOfDay, LocalDateTime endOfDay) {
		// TODO Auto-generated method stub
		return r.findByTimeBetween(startOfDay, endOfDay);
	}

	@Override
	public Integer numberOfSeatsAvailable(Long projectionId) {
		Projection projection = r.findOneById(projectionId);
		Integer seats = 0;

		if (projection != null) {
			Integer totalNumber = projection.getTheater().getSeats().size();			
			seats = totalNumber - projection.getTickets().size();

		}



		return seats;
	}

	@Override
	public Integer getNumberOfSoldTickets(Long projectionId) {
		Projection p = r.findOneById(projectionId);
		Integer numberOfTickets = 0;
		if (p!=null) {
			numberOfTickets = p.getTickets().size();
		}
		return numberOfTickets;
	}

	@Override
	public List<Projection> findProjectionsByMovieAndTime(Long movieId, LocalDateTime now) {


		return r.findByMovieIdAndTimeAfter(movieId, now);
	}

	@Override
	public Page<Projection> searchProjections(String movie, LocalDateTime start, LocalDateTime end,
			Long projectionTypeId, Long theaterId, Double priceFrom, Double priceTo, int pageNo) {
		// TODO Auto-generated method stub
		return r.searchProjections(movie, projectionTypeId, theaterId, priceFrom, priceTo, start, end,  PageRequest.of(pageNo, 5));
	}

	@Override
	public Projection createProjection(Projection projection) {

		LocalDateTime time = projection.getTime();		
		ProjectionType type = projection.getProjectionType();
		Theater theater = projection.getTheater();
		Movie movie = projection.getMovie();
		Projection newProjection = null;

				
		
		if (time == null || type == null || theater == null	|| movie == null) {
			return null;
		}
		
		if (movie.getDeleted() == true) {
			throw new IllegalArgumentException("That movie is not available anymore!");
		}
		if (time.isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("Projection time can't be in the past!");
		}

		if (!theater.getProjectionTypes().contains(type)) {
			throw new IllegalArgumentException("The theater you chose, doesn't have that projection type!");
		}

		boolean collision = false;

		for (Projection p : r.findAll()) {
			if (p.getTheater().getId() == theater.getId()) {
				if (projection.getTime().isBefore(p.getTime().plusMinutes(p.getMovie().getDuration())) &&
						projection.getTime().plusMinutes(movie.getDuration()).isAfter(p.getTime())) {
					collision = true;
					throw new IllegalArgumentException("The theater you chose, doesn't have that projection type!");
				}
			}


		}

		if (!collision) {
			newProjection = r.save(projection);			
		}


		return newProjection;
		
	}









}
