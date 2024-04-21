package modul3.test.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import modul3.test.model.Movie;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	Movie findOneById(Long id);





	@Query(
			"SELECT p FROM Movie p WHERE "  

			+ "(:name IS NULL OR p.name like %:name%) AND " 			
			+ "(:distributor IS NULL OR p.distributor like %:distributor%) AND " 
			+ "(:country IS NULL OR p.country like %:country%) AND " 
			+ "(:genres IS NULL OR p.genres like %:genres%) AND"
			+ "(:durationFrom IS NULL OR p.duration >= :durationFrom) AND"
			+ "(:durationTo IS NULL OR p.duration <= :durationTo) AND"

			+ "(:yearFrom IS NULL OR p.year >= :yearFrom) AND"
			+ "(:yearTo IS NULL OR p.year <= :yearTo)")
	Page<Movie> searchMovies (
			@Param("name")String name, 			
			@Param("distributor")String distributor, 
			@Param("country")String country, 
			@Param("genres") String genres,
			@Param("durationFrom")Integer durationFrom,
			@Param("durationTo")Integer durationTo,
			@Param("yearFrom")Integer yearFrom,
			@Param("yearTo")Integer yearTo
			, Pageable pageable);




}
