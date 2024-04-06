package modul3.test.model;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProjectionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProjectionType type;

	public ProjectionType() {
		super();
	}

	public ProjectionType(Long id, ProjectionType type) {
		super();
		this.id = id;
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectionType getType() {
		return type;
	}

	public void setType(ProjectionType type) {
		this.type = type;
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
