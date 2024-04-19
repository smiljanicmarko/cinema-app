package modul3.test.model;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import modul3.test.enumeration.ProjectionTypeEnum;

@Entity
public class ProjectionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProjectionTypeEnum type;
    
    @ManyToMany(mappedBy = "projectionTypes")
    private Set<Theater> theaters;
    
    @OneToMany(mappedBy = "projectionType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Projection> projections = new ArrayList<Projection>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectionTypeEnum getType() {
		return type;
	}

	public void setType(ProjectionTypeEnum type) {
		this.type = type;
	}

	public Set<Theater> getTheaters() {
		return theaters;
	}

	public void setTheaters(Set<Theater> theaters) {
		this.theaters = theaters;
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
		ProjectionType other = (ProjectionType) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "ProjectionType [id=" + id + ", type=" + type + "]";
	}

	

	
	

   

//    @OneToMany(mappedBy = "adresa", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    private List<Korisnik> korisnici = new ArrayList<>();

    
    
    
}
