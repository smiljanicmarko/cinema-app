package modul3.test.web.dto;

public class SeatDTO {

	 	private Long id;

	 	private Long theaterId;
	 	private String theater;
	 	private Integer number;
	 	
	 	
	 	
		public Integer getNumber() {
			return number;
		}
		public void setNumber(Integer number) {
			this.number = number;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Long getTheaterId() {
			return theaterId;
		}
		public void setTheaterId(Long theaterId) {
			this.theaterId = theaterId;
		}
		public String getTheater() {
			return theater;
		}
		public void setTheater(String theater) {
			this.theater = theater;
		}
	 	
	 	
	
}
