package modul3.test.model;

import java.time.LocalDateTime;
import java.util.Objects;

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
	  	
	  	
	  	
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Projection getProjection() {
			return projection;
		}
		public void setProjection(Projection projection) {
			this.projection = projection;
		}
		public Seat getSeat() {
			return seat;
		}
		public void setSeat(Seat seat) {
			this.seat = seat;
		}
		public LocalDateTime getPurchaseTime() {
			return purchaseTime;
		}
		public void setPurchaseTime(LocalDateTime purchaseTime) {
			this.purchaseTime = purchaseTime;
		}
		public Korisnik getUser() {
			return user;
		}
		public void setUser(Korisnik user) {
			this.user = user;
		}
		@Override
		public int hashCode() {
			return Objects.hash(id);
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Ticket other = (Ticket) obj;
			return Objects.equals(id, other.id);
		}

	  	
	  	
		 public void removeReferences() {
		        if (projection != null) {
		            projection.getTickets().remove(this);
		        }
		        if (seat != null) {
		            seat.getTickets().remove(this);
		        }
		       
		    }
	  
	  	
	  	
	  	
	  	
	  	
	  	
	  	
}
