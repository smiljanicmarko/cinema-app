package modul3.test.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Seat {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 	
	 	private Integer number;
	 	
	 	@ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false) 	
	 	private Theater theater;
	 	@OneToMany(mappedBy = "seat")
	 	private List<Ticket>tickets = new ArrayList<Ticket>();
	 	
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}
		
		

		public Integer getNumber() {
			return number;
		}

		public void setNumber(Integer number) {
			this.number = number;
		}

		public Theater getTheater() {
			return theater;
		}

		public void setTheater(Theater theater) {
			this.theater = theater;
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
			Seat other = (Seat) obj;
			return Objects.equals(id, other.id);
		}

	 	
	 	
}
