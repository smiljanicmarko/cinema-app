package modul3.test.web.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BuyTicketDTO {		
	  
	  	private Long projectionId; 		  	
	  
	  	private List<Long> seatIds;	  
	  	
	  	private LocalDateTime purchaseTime;	   	
	  	
	  	private String username;

		public Long getProjectionId() {
			return projectionId;
		}

		public void setProjectionId(Long projectionId) {
			this.projectionId = projectionId;
		}

		public List<Long> getSeatIds() {
			return seatIds;
		}

		public void setSeatIds(List<Long> seatIds) {
			this.seatIds = seatIds;
		}

		public LocalDateTime getPurchaseTime() {
			return purchaseTime;
		}

		public void setPurchaseTime(LocalDateTime purchaseTime) {
			this.purchaseTime = purchaseTime;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}
	  	
	  	
	  	
		
    
   
	  	
	  	
}
