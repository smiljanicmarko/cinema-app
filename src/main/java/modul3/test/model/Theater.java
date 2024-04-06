package modul3.test.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Theater {

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 
		private String name;
		
		private List<ProjectionType>types = new ArrayList<ProjectionType>();

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

		public List<ProjectionType> getTypes() {
			return types;
		}

		public void setTypes(List<ProjectionType> types) {
			this.types = types;
		}

		@Override
		public int hashCode() {
			return Objects.hash(id);
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Theater other = (Theater) obj;
			return Objects.equals(id, other.id);
		}

		@Override
		public String toString() {
			return "Theater [id=" + id + ", name=" + name + ", types=" + types + "]";
		}
		
		
}
