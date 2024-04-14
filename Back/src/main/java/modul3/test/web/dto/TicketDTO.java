package modul3.test.web.dto;

import java.time.LocalDateTime;

public class TicketDTO {

		private Long id;	  	
	  
	  	private Long projectionId;
	  	
	  	private Long movieId;
	  	private String movie;
	  	
	  	private String projectionType;
	  	
	  	private String theaterName;	  	
	  	
	  	private Long seatId;
	  	
	  	private Integer seatNumber;
	  	
	  	private LocalDateTime purchaseTime;
	  
	  	private Long userId;
	  	private String username;
	  	private Double price;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getProjectionId() {
			return projectionId;
		}

		public void setProjectionId(Long projectionId) {
			this.projectionId = projectionId;
		}

		public String getMovie() {
			return movie;
		}

		public void setMovie(String movie) {
			this.movie = movie;
		}

		public String getProjectionType() {
			return projectionType;
		}

		public void setProjectionType(String projectionType) {
			this.projectionType = projectionType;
		}

		public String getTheaterName() {
			return theaterName;
		}

		public void setTheaterName(String theaterName) {
			this.theaterName = theaterName;
		}

		public Long getSeatId() {
			return seatId;
		}

		public void setSeatId(Long seatId) {
			this.seatId = seatId;
		}

		public LocalDateTime getPurchaseTime() {
			return purchaseTime;
		}

		public void setPurchaseTime(LocalDateTime purchaseTime) {
			this.purchaseTime = purchaseTime;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public Integer getSeatNumber() {
			return seatNumber;
		}

		public void setSeatNumber(Integer seatNumber) {
			this.seatNumber = seatNumber;
		}

		public Double getPrice() {
			return price;
		}

		public void setPrice(Double price) {
			this.price = price;
		}

		public Long getMovieId() {
			return movieId;
		}

		public void setMovieId(Long movieId) {
			this.movieId = movieId;
		}
    
   
	  	
	  	
}
