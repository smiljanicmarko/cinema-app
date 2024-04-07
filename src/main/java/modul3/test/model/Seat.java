//package modul3.test.model;
//
//import java.util.Objects;
//
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//@Entity
//public class Seat {
//
//	 	@Id
//	    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	    private Long id;
//
//	 	@ManyToOne(fetch = FetchType.EAGER)
//	    @JoinColumn(nullable = false) 	
//	 	private Theater theater;
//
//		public Long getId() {
//			return id;
//		}
//
//		public void setId(Long id) {
//			this.id = id;
//		}
//
//		public Theater getTheater() {
//			return theater;
//		}
//
//		public void setTheater(Theater theater) {
//			this.theater = theater;
//		}
//
//		@Override
//		public int hashCode() {
//			return Objects.hash(id);
//		}
//
//		@Override
//		public boolean equals(Object obj) {
//			if (this == obj)
//				return true;
//			if (obj == null)
//				return false;
//			if (getClass() != obj.getClass())
//				return false;
//			Seat other = (Seat) obj;
//			return Objects.equals(id, other.id);
//		}
//
//		@Override
//		public String toString() {
//			return "Seat [id=" + id + ", theater=" + theater + "]";
//		}
//	 	
//}
