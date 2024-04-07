package modul3.test.repository;

////import org.springframework.data.domain.Pageable; pageable se uvozi odavde!
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.Genre;


@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

	Genre findOneById(Long id);

	Set<Genre> findByIdIn(List<Long> ids);  





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
