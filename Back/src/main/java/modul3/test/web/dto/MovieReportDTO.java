package modul3.test.web.dto;

public class MovieReportDTO {

	private Long movieId;
	
	private String movieName;
	
	private Integer totalProjections;
	
	private Integer totalTickets;
	
	private Double totalPrice;

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

	public Integer getTotalProjections() {
		return totalProjections;
	}

	public void setTotalProjections(Integer totalProjections) {
		this.totalProjections = totalProjections;
	}

	public Integer getTotalTickets() {
		return totalTickets;
	}

	public void setTotalTickets(Integer totalTickets) {
		this.totalTickets = totalTickets;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "MovieReportDTO [movieId=" + movieId + ", movieName=" + movieName + ", totalProjections="
				+ totalProjections + ", totalTickets=" + totalTickets + ", totalPrice=" + totalPrice + "]";
	}
	
	
	
}
