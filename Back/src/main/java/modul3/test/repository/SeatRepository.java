package modul3.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>{
	
	Seat findOneById (Long id);
	
}
