package modul3.test.service;

import java.util.List;

import modul3.test.model.Seat;

public interface SeatService {

	Seat findOneById (Long id);

	List<Seat> findAll ();

}
