package modul3.test.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import modul3.test.model.Korisnik;
import modul3.test.model.Projection;
import modul3.test.model.Seat;
import modul3.test.model.Ticket;
import modul3.test.repository.KorisnikRepository;
import modul3.test.repository.ProjectionRepository;
import modul3.test.repository.SeatRepository;
import modul3.test.repository.TicketRepository;
import modul3.test.service.TicketService;
import modul3.test.web.dto.BuyTicketDTO;

@Service
public class JpaTicketService implements TicketService {

	@Autowired 
	private TicketRepository r;
	@Autowired
	private SeatRepository seatRepository;
	
	@Autowired
	private ProjectionRepository projectionRepository;
	
	@Autowired
	private KorisnikRepository korisnikRepository;
	
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

	@Override
	public List<Ticket> buyTicket(BuyTicketDTO dto) {
		
		Projection projection = projectionRepository.findOneById(dto.getProjectionId());
		Korisnik korisnik = korisnikRepository.findByKorisnickoIme(dto.getUsername());
		LocalDateTime purchaseTime = LocalDateTime.now();
		
		if (projection == null  || korisnik == null || purchaseTime == null) {
			return null;
		}
		
		List<Long>ticketIds = dto.getSeatIds();
		
		List<Ticket>newTickets = new ArrayList<Ticket>();
		
		for (Long id : ticketIds) {
			Ticket ticket = new Ticket();
			Seat s = seatRepository.findOneById(id);
			if (s == null) {
				return null;
			}
			
			ticket.setSeat(s);
			newTickets.add(ticket);
		}
		
		
		for (Ticket ticket : newTickets) {
			ticket.setProjection(projection);
			ticket.setPurchaseTime(purchaseTime);
			ticket.setUser(korisnik);	
			r.save(ticket);
		}
		
		
		return newTickets;
	}

	@Override
	public boolean deleteTicket(Long id) {
		Ticket t = r.findOneById(id);
		if (t == null) {
			return false;
		}		
		t.removeReferences();
		r.deleteById(id);		
		
		return true;
	}

	@Override
	public Integer totalTicketsForMovie(Long movieId) {
		
		return r.countTicketsByProjectionMovieId(movieId);
	}

}
