package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Movie;
import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieDTO;

@Component
public class MovieToMovieDto implements Converter<Movie, MovieDTO> {

	@Autowired
	private MovieService movieService;
	
    @Override
    public MovieDTO convert(Movie e) {
    	MovieDTO dto = new MovieDTO();
        
    	dto.setActors(e.getActors());
    	dto.setCountry(e.getCountry());
    	dto.setDescription(e.getDescription());
    	dto.setDirector(e.getDirector());
    	dto.setDistributor(e.getDistributor());
    	dto.setDuration(e.getDuration());
    	dto.setId(e.getId());
    	dto.setName(e.getName());
    	dto.setYear(e.getYear());     	
    	dto.setGenres(e.getGenres());
    	dto.setDeleted(e.getDeleted());
    	dto.setProjectionsNumber(movieService.numberOfProjectionsForMovie(e.getId()));
    	
        return dto;
    }

    public List<MovieDTO> convert(List<Movie> lista){
        List<MovieDTO> listaDTO = new ArrayList<>();

        for(Movie e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



