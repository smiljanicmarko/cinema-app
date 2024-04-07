package modul3.test.model;
import java.util.ArrayList;
import java.util.List;
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
	

	
	

   

//    @OneToMany(mappedBy = "adresa", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    private List<Korisnik> korisnici = new ArrayList<>();

    
    
    
}
