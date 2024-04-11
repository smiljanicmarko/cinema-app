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

    Page<Projection> searchProjections (String movie, LocalDateTime timeFrom, LocalDateTime timeTo, Long projectionTypeId, 
    									Long theaterId, Double priceFrom, Double priceTo, int pageNo);

    
    List<Projection> todaysProjections (LocalDateTime startOfDay, LocalDateTime endOfDay);
    
    Integer numberOfSeatsAvailable (Long projectionId);
	
//    Page<Film> findAll(Integer pageNo);
//    Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//    List<Film> findByZanrId(Long zanrId);
//    List<Linija> nadjiPoId (List<Long>ids);
}
