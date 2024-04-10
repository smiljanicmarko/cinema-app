package modul3.test.service;

import java.util.List;

import modul3.test.model.ProjectionType;

public interface ProjectionTypeService {

	ProjectionType findById (Long id);
	
	List<ProjectionType> findAll ();
}
