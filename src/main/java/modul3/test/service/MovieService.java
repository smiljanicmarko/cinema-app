package modul3.test.service;

import java.util.List;

import org.springframework.data.domain.Page;

import modul3.test.model.Movie;

public interface MovieService {

    Movie findOneById(Long id);
	
    List<Movie> findAll();

    Movie save(Movie m);

    Movie update(Movie m);

    Movie delete(Long id);

    Page<Movie> searchMovies (String name, String distributor, String country, 
    							Long genreId,Integer durationFrom, Integer durationTo, 
    							Integer yearFrom, Integer yearTo, int pageNo);

	
//    Page<Film> findAll(Integer pageNo);
//    Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//    List<Film> findByZanrId(Long zanrId);
//    List<Linija> nadjiPoId (List<Long>ids);
}
