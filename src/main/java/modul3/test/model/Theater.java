package modul3.test.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Theater {

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 
		private String name;
		
		 @ManyToMany
		    @JoinTable(name = "theater_projection_type",
		               joinColumns = @JoinColumn(name = "theater_id"),
		               inverseJoinColumns = @JoinColumn(name = "projection_type_id"))		
		private List<ProjectionType>projectionTypes = new ArrayList<ProjectionType>();
		 
		 
		
		@OneToMany(mappedBy = "theater", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
		private Set<Seat> seats = new HashSet<Seat>();		 
		 
		@OneToMany(mappedBy = "theater", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
		private List<Projection>projections = new ArrayList<Projection>();

	
		
		
}
