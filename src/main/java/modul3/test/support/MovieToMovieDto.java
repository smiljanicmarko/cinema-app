package modul3.test.support;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Genre;
import modul3.test.model.Movie;
import modul3.test.web.dto.MovieDTO;

@Component
public class MovieToMovieDto implements Converter<Movie, MovieDTO> {

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
    	
    	Map<Long, String> genres = new HashMap<Long, String>();
    	if (e.getGenres()!=null) {
    		for (Genre g : e.getGenres()) {
    			genres.put(g.getId(), g.getName());
    		}
    	}    	
    	
    	dto.setGenres(genres);
    	
    	
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



