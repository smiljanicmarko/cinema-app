package modul3.test.service;

import java.util.List;

import modul3.test.model.Ticket;

public interface TicketService {

	Ticket findById (Long id);
	
	List<Ticket> findAll ();
	
	List<Ticket> findAllTicketsForProjection (Long projectionId);
	
}
