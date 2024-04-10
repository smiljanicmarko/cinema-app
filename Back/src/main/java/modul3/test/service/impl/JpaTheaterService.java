package modul3.test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.Theater;
import modul3.test.repository.TheaterRepository;
import modul3.test.service.TheaterService;

@Service
public class JpaTheaterService implements TheaterService {

	@Autowired
	private TheaterRepository r;
	
	@Override
	public Theater findOneById(Long id) {
		// TODO Auto-generated method stub
		return r.findOneById(id);
	}

	@Override
	public List<Theater> findAll() {
		// TODO Auto-generated method stub
		return r.findAll();
	}

}
