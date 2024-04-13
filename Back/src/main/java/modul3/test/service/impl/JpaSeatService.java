package modul3.test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.Seat;
import modul3.test.repository.SeatRepository;
import modul3.test.service.SeatService;

@Service
public class JpaSeatService implements SeatService {

	@Autowired 
	private SeatRepository r;

	@Override
	public Seat findOneById(Long id) {
		// TODO Auto-generated method stub
		return r.findOneById(id);
	}

	@Override
	public List<Seat> findAll() {
		// TODO Auto-generated method stub
		return r.findAll();
	}
	
	

}
