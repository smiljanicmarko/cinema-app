package modul3.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>{
	
Ticket findOneById (Long id);

List<Ticket> findByProjectionId (Long projectionId);
	
List<Ticket> findByUserId (Long korisnikId);	
}
