package modul3.test.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import modul3.test.model.Projection;
import modul3.test.repository.ProjectionRepository;
import modul3.test.service.ProjectionService;

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
	public Page<Projection> searchProjections(String movie, LocalDateTime timeFrom, LocalDateTime timeTo,
			Long projectionTypeId, Long theaterId, Double priceFrom, Double priceTo, int pageNo) {
		
		return r.searchProjections(movie, projectionTypeId, theaterId, priceFrom, priceTo, timeFrom, timeTo, PageRequest.of(pageNo, 5));
	}

}
