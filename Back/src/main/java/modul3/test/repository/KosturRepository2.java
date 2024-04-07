package modul3.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import modul3.test.model.Korisnik;
////import org.springframework.data.domain.Pageable; pageable se uvozi odavde!
//@Repository
//public interface Repository extends JpaRepository<Korisnik, Long> {
//	
//	Prevoznik findOneById(Long id);
//
//    Optional<Korisnik> findFirstByKorisnickoIme(String korisnickoIme);
//    
//    List<Linija> findByIdIn(List<Long> ids);
//    
//    @Query("SELECT p FROM Linija p WHERE "
//			+ "(:destinacija IS NULL OR p.destinacija like %:destinacija%) AND "
//			+ "(:prevoznikId IS NULL OR p.prevoznik.id = :prevoznikId) AND "
//			+ "(:cenaKarteDo IS NULL OR p.cenaKarte < :cenaKarteDo)")
//	Page<Linija> pretraga(@Param("destinacija")String destinacija , @Param("prevoznikId") Long prevoznikId,
//			@Param("cenaKarteDo") Double cenaKarteDo, Pageable pageable);
//    
//    List<Linija> findByIdIn(List<Long> ids);
//}
