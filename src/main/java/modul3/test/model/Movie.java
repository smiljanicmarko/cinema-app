package modul3.test.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    private String director;
    
    //iz liste prebaceni u obican String. 
    //Ukoliko kasnije bude trebalo, postoji mogucnost za pravljenje objekata
    
    private String actors;
    
    private String genres;
    
    @Column(nullable = false)
    private Integer duration;
    @Column(nullable = false)
    private String distributor;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private Integer year;
    
    private String description;  
    
    
    
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Projection>projections = new ArrayList<Projection>();
    
    
    
    


    
    
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(nullable = false)
//    private Film film;

    
   

}
