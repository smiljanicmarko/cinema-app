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
			"SELECT p FROM Movie p " +
		       "JOIN p.genres g " +
		       "WHERE " 			
			+ "(:name IS NULL OR p.name like %:name%) AND " 			
			+ "(:distributor IS NULL OR p.distributor like %:distributor%) AND " 
			+ "(:country IS NULL OR p.country like %:country%) AND " 
			+ "(:genreId IS NULL OR g.id = :genreId) AND"
			+ "(:durationFrom IS NULL OR p.duration >= :durationFrom) AND"
			+ "(:durationTo IS NULL OR p.duration <= :durationTo) AND"
			
			+ "(:yearFrom IS NULL OR p.year >= :yearFrom) AND"
			+ "(:yearTo IS NULL OR p.year <= :yearTo)")
	Page<Movie> searchMovies (
			@Param("name")String name, 			
			@Param("distributor")String distributor, 
			@Param("country")String country, 
			@Param("genreId") Long genreId,
			@Param("durationFrom")Integer durationFrom,
			@Param("durationTo")Integer durationTo,
			@Param("yearFrom")Integer yearFrom,
			@Param("yearTo")Integer yearTo
			, Pageable pageable);




}



//List<Linija> findByIdIn(List<Long> ids);  

// ============================     neka dodatna pojasnjenja za pretragu

////		@Query("SELECT f FROM Film f WHERE" +
////     	   "(:filmNaziv = NULL OR f.naziv LIKE :filmNaziv)")
////		List<Film> search(@Param("filmNaziv") String filmNaziv); */
//    
//		//f.naziv LIKE :filmNaziv - oznacava tacan naziv (case sensitive),  
//		  //  a ova je (case insesnsitive!) @Query("SELECT f FROM Film f WHERE LOWER(f.naziv) LIKE LOWER(:filmNaziv)")
//

//@Query("SELECT p FROM Projekcija p WHERE" +
//        "(p.datumIVreme BETWEEN :datumIVremeOd AND :datumIVremeDo) AND " +
//        "(p.cenaKarte BETWEEN :cenaKarteOd AND :cenaKarteDo) AND "+
//        "(:tip = NULL OR p.tip LIKE :tip) AND " +
//        "(:filmId = NULL OR p.film.id = :filmId) AND " +
//        "(:sala = NULL OR p.sala = :sala)")
//List<Projekcija> search(@Param("datumIVremeOd") LocalDateTime datumIVremeOd,@Param("datumIVremeDo") LocalDateTime datumIVremeDo,
//                        @Param("cenaKarteOd") Double cenaKarteOd, @Param("cenaKarteDo") Double cenaKarteDo,
//                        @Param("tip") String tip, @Param("filmId") Long filmId, @Param("sala") Integer sala);
