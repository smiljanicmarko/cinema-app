package modul3.test.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ProjectionType> getProjectionTypes() {
		return projectionTypes;
	}

	public void setProjectionTypes(List<ProjectionType> projectionTypes) {
		this.projectionTypes = projectionTypes;
	}

	public Set<Seat> getSeats() {
		return seats;
	}

	public void setSeats(Set<Seat> seats) {
		this.seats = seats;
	}

	public List<Projection> getProjections() {
		return projections;
	}

	public void setProjections(List<Projection> projections) {
		this.projections = projections;
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
		Theater other = (Theater) obj;
		return Objects.equals(id, other.id);
	}




}
