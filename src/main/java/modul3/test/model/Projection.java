package modul3.test.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Movie getMovie() {
			return movie;
		}

		public void setMovie(Movie movie) {
			this.movie = movie;
		}

		public ProjectionType getProjectionType() {
			return projectionType;
		}

		public void setProjectionType(ProjectionType projectionType) {
			this.projectionType = projectionType;
		}

		public Theater getTheater() {
			return theater;
		}

		public void setTheater(Theater theater) {
			this.theater = theater;
		}

		public LocalDateTime getTime() {
			return time;
		}

		public void setTime(LocalDateTime time) {
			this.time = time;
		}

		public Double getPrice() {
			return price;
		}

		public void setPrice(Double price) {
			this.price = price;
		}

		public Korisnik getAdmin() {
			return admin;
		}

		public void setAdmin(Korisnik admin) {
			this.admin = admin;
		}

		public List<Ticket> getTickets() {
			return tickets;
		}

		public void setTickets(List<Ticket> tickets) {
			this.tickets = tickets;
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
			Projection other = (Projection) obj;
			return Objects.equals(id, other.id);
		}

		
		
	
		
		
		
		
}
