package modul3.test.service;

import java.util.List;

import modul3.test.model.Theater;

public interface TheaterService {

	Theater findOneById (Long id);
	List<Theater>findAll ();
	
}
