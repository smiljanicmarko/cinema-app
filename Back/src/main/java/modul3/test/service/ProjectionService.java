package modul3.test.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

import modul3.test.model.Projection;

public interface ProjectionService {

    Projection findOneById(Long id);
	
    List<Projection> findAll();

    Projection save(Projection p);

    Projection update(Projection p);

    Projection delete(Long id);
    
    Projection deleteLogically (Long id);

    Page<Projection> searchProjections (String movie, LocalDateTime start, LocalDateTime end, Long projectionTypeId, 
    									Long theaterId, Double priceFrom, Double priceTo, int pageNo, String sortby, String orderBy);
    
    Projection createProjection (Projection projection);
    
    List<Projection> todaysProjections (LocalDateTime startOfDay, LocalDateTime endOfDay);
    
    Integer numberOfSeatsAvailable (Long projectionId);
    
    Integer getNumberOfSoldTickets (Long projectionId);
    
    List<Projection> findProjectionsByMovieAndTime (Long movieId, LocalDateTime now);
	

}
