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

	@Query("SELECT p FROM Projection p "
			+ "JOIN p.projectionType pt "
			+ "JOIN p.theater t "
			+ "WHERE "
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
