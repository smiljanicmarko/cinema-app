package modul3.test.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;

import modul3.test.model.Movie;
import modul3.test.web.dto.MovieReportDTO;

public interface MovieService {

    Movie findOneById(Long id);
	
    List<Movie> findAll();

    Movie save(Movie m);

    Movie update(Movie m);

    Movie delete(Long id);
    
    Movie logicallyDelete (Long id);

    Page<Movie> searchMovies (String name, String distributor, String country, 
    							Long genreId,Integer durationFrom, Integer durationTo, 
    							Integer yearFrom, Integer yearTo, int pageNo);

    Boolean movieAvailable (Long movieId);
    
    List<MovieReportDTO> report (LocalDate start, LocalDate end);
	
    Integer numberOfProjectionsForMovie (Long movieId);
    
//    Page<Film> findAll(Integer pageNo);
//    Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//    List<Film> findByZanrId(Long zanrId);
//    List<Linija> nadjiPoId (List<Long>ids);
}
