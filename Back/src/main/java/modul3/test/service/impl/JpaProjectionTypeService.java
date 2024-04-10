package modul3.test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.ProjectionType;
import modul3.test.repository.ProjectionTypeRepository;
import modul3.test.service.ProjectionTypeService;

@Service
public class JpaProjectionTypeService implements ProjectionTypeService {

	@Autowired
	private ProjectionTypeRepository r;

	@Override
	public ProjectionType findById(Long id) {
		// TODO Auto-generated method stub
		return r.findOneById(id);
	}

	@Override
	public List<ProjectionType> findAll() {
		// TODO Auto-generated method stub
		return r.findAll();
	}
	
}
