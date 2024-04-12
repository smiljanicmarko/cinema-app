package modul3.test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.Ticket;
import modul3.test.repository.TicketRepository;
import modul3.test.service.TicketService;

@Service
public class JpaTicketService implements TicketService {

	@Autowired 
	private TicketRepository r;
	
	@Override
	public Ticket findOneById(Long id) {
		
		return r.findOneById(id);
	}

	@Override
	public List<Ticket> findAll() {
		
		return r.findAll();
	}

	@Override
	public List<Ticket> findAllTicketsForProjection(Long projectionId) {
		
		return r.findByProjectionId(projectionId);
	}

	@Override
	public List<Ticket> findAllTicketsForUser(Long userId) {
		
		return r.findByUserId(userId);
	}

}
