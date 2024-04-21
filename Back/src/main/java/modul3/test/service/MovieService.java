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
    
    Boolean logicallyDelete (Long id);

    public Page<Movie> searchMovies(String name, String distributor, String country, 
    								String genres, Integer durationFrom, Integer durationTo, 
    								Integer yearFrom, Integer yearTo, int pageNo, String sortby, String orderBy);

    Boolean movieAvailable (Long movieId);
    
    List<MovieReportDTO> report (LocalDate start, LocalDate end);
	
    Integer numberOfProjectionsForMovie (Long movieId);
    

}
