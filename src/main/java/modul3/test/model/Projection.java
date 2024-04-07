package modul3.test.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
@Entity
public class Projection {	
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		
		@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false) 	
		private Movie movie;
		
		@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false, name = "projection_type_id") 	
		private ProjectionType projectionType;
		
		@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false) 	
		private Theater theater;
		
		private LocalDateTime time;
		
		private Double price;
		
		@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false, name = "admin_id") 	
		private Korisnik admin;
		
		@OneToMany(mappedBy = "projection", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
		private List<Ticket>tickets = new ArrayList<Ticket>();

		
		
	
		
		
		
		
}
