package modul3.test.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Ticket {
	
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	  	
	  	@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false) 	
	  	private Projection projection;
	  	
	  	@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false) 	
	  	private Seat seat;
	  	
	  	private LocalDateTime purchaseTime;
	  	@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false, name = "user_id") 
	  	private Korisnik user;

	  	
	  	
	  	
	  
	  	
	  	
	  	
	  	
	  	
	  	
	  	
}
