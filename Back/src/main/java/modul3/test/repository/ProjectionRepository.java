package modul3.test.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import modul3.test.model.Projection;


@Repository
public interface ProjectionRepository extends JpaRepository<Projection, Long> {

	Projection findOneById(Long id);

	@Query("SELECT p FROM Projection p WHERE "
			+ "(:movie IS NULL OR p.movie.name like %:movie%) AND "       
			+ "(:projectionTypeId IS NULL OR p.projectionType.id = :projectionTypeId) AND "
			+ "(:priceFrom IS NULL OR p.price >= :priceFrom) AND"
			+ "(:priceTo IS NULL OR p.price <= :priceTo) AND"
			+ "(:theaterId IS NULL OR p.theater.id = :theaterId)AND"
			+ "(:start is NULL OR p.time > :start) AND"
			+ "(:end is NULL OR p.time < :end)")

	Page<Projection> searchProjections (
			@Param("movie") String movie , 
			@Param("projectionTypeId") Long projectionTypeId,
			@Param("theaterId") Long theaterId,
			@Param("priceFrom") Double priceFrom, 
			@Param("priceTo") Double priceTo, 
			@Param("start") LocalDateTime start,	
			@Param("end") LocalDateTime end,
			Pageable pageable);




	List<Projection> findByTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

	List<Projection> findByMovieIdAndTimeAfter(Long movieId, LocalDateTime now);









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
