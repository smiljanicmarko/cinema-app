package modul3.test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import modul3.test.model.Ticket;
import modul3.test.repository.TicketRepository;
import modul3.test.service.TicketService;

public class JpaTicketService implements TicketService {

	@Autowired 
	private TicketRepository r;
	
	@Override
	public Ticket findById(Long id) {
		
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

}
