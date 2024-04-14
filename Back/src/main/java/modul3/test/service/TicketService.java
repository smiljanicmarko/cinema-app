package modul3.test.service;

import java.util.List;

import modul3.test.model.Ticket;
import modul3.test.web.dto.BuyTicketDTO;

public interface TicketService {

	Ticket findOneById (Long id);
	
	List<Ticket> findAll ();
	
	List<Ticket> findAllTicketsForProjection (Long projectionId);
	
	List<Ticket> findAllTicketsForUser (Long userId);
	
	List<Ticket> buyTicket (BuyTicketDTO dto);
	
	boolean deleteTicket (Long id);
}
