package modul3.test.web.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class ProjectionDTO {

	private Long id;	
	
	@NotNull
	private Long movieId;
	private String movieName;
	@NotNull
	private Long projectionTypeId;
	private String projectionType;	
	@NotNull
	private Long theaterId;
	
	private String theaterName;
	
	private LocalDateTime time;
	@Min(0)
	private Double price;	

	private String username;
	
	private Integer seatsAvailable;
	
	private Integer ticketsSold;

	private Boolean deleted;
	
	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Integer getSeatsAvailable() {
		return seatsAvailable;
	}

	public void setSeatsAvailable(Integer seatsAvailable) {
		this.seatsAvailable = seatsAvailable;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public Long getProjectionTypeId() {
		return projectionTypeId;
	}

	public void setProjectionTypeId(Long projectionTypeId) {
		this.projectionTypeId = projectionTypeId;
	}

	public String getProjectionType() {
		return projectionType;
	}

	public void setProjectionType(String projectionType) {
		this.projectionType = projectionType;
	}

	public Long getTheaterId() {
		return theaterId;
	}

	public void setTheaterId(Long theaterId) {
		this.theaterId = theaterId;
	}

	public String getTheaterName() {
		return theaterName;
	}

	public void setTheaterName(String theaterName) {
		this.theaterName = theaterName;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getTicketsSold() {
		return ticketsSold;
	}

	public void setTicketsSold(Integer ticketsSold) {
		this.ticketsSold = ticketsSold;
	}

	
	
	
	
}
