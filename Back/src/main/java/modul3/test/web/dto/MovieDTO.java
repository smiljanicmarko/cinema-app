package modul3.test.web.dto;

import java.util.HashMap;
import java.util.Map;

import javax.validation.constraints.Min;

public class MovieDTO {

	private Long id;
	
	private String name;

	private String director;
	
	private String actors;

	private Map<Long, String>genres = new HashMap<Long, String>();
	
	@Min(0)
	private Integer duration;
	
	private String distributor;
	
	private String country;
	@Min(0)
	private Integer year;

	private String description;

	private Boolean deleted;
	
	
	
	
	
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

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getActors() {
		return actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}



	public Map<Long, String> getGenres() {
		return genres;
	}

	public void setGenres(Map<Long, String> genres) {
		this.genres = genres;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getDistributor() {
		return distributor;
	}

	public void setDistributor(String distributor) {
		this.distributor = distributor;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}  
	
	
	
}
