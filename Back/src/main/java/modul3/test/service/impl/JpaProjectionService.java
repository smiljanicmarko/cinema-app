package modul3.test.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import modul3.test.model.Projection;
import modul3.test.repository.MovieRepository;
import modul3.test.repository.ProjectionRepository;
import modul3.test.service.ProjectionService;

@Service
public class JpaProjectionService implements ProjectionService {

	@Autowired
	private ProjectionRepository r;
	@Autowired
	private MovieRepository movieRepository;
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

	


	

	

}
