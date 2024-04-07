//package modul3.test.model;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Objects;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.OneToMany;
//
//@Entity
//public class Movie {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String name;
//    
//    private String director;
//    
//    private List<String> actors = new ArrayList<String>();
//    
//    private List<String> genres = new ArrayList<String>();
//    @Column(nullable = false)
//    private Integer duration;
//    @Column(nullable = false)
//    private String distributor;
//    @Column(nullable = false)
//    private String country;
//    @Column(nullable = false)
//    private Integer year;
//    
//    private String description;
//    
//	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<Projection>projections = new ArrayList<Projection>();
//    
//    
//    
//    
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getDirector() {
//		return director;
//	}
//
//	public void setDirector(String director) {
//		this.director = director;
//	}
//
//	public List<String> getActors() {
//		return actors;
//	}
//
//	public void setActors(List<String> actors) {
//		this.actors = actors;
//	}
//
//	public List<String> getGenres() {
//		return genres;
//	}
//
//	public void setGenres(List<String> genres) {
//		this.genres = genres;
//	}
//
//	public Integer getDuration() {
//		return duration;
//	}
//
//	public void setDuration(Integer duration) {
//		this.duration = duration;
//	}
//
//	public String getDistributor() {
//		return distributor;
//	}
//
//	public void setDistributor(String distributor) {
//		this.distributor = distributor;
//	}
//
//	public String getCountry() {
//		return country;
//	}
//
//	public void setCountry(String country) {
//		this.country = country;
//	}
//
//	public Integer getYear() {
//		return year;
//	}
//
//	public void setYear(Integer year) {
//		this.year = year;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(id);
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		Movie other = (Movie) obj;
//		return Objects.equals(id, other.id);
//	}
//
//    
//    
////    @ManyToOne(fetch = FetchType.EAGER)
////    @JoinColumn(nullable = false)
////    private Film film;
//
//    
//   
//
//}
