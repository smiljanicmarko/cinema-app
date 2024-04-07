package modul3.test.support;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Genre;
import modul3.test.model.Movie;
import modul3.test.service.GenreService;
import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieDTO;

@Component
public class MovieDtoToMovie implements Converter<MovieDTO, Movie> {

    @Autowired
    private MovieService movieService;

    @Autowired
    private GenreService genreService;

    @Override
    public Movie convert(MovieDTO dto) {

    	Movie e;

        if(dto.getId() == null) {
            e = new Movie();
        }else {
            e = movieService.findOneById(dto.getId());
        }

        if(e != null) {
           
        	e.setActors(dto.getActors());
        	e.setCountry(dto.getCountry());
        	e.setDescription(dto.getDescription());
        	e.setDirector(dto.getDirector());
        	e.setDistributor(dto.getDistributor());
        	e.setDuration(dto.getDuration());
        	e.setId(dto.getId());
        	e.setName(dto.getName());
        	e.setYear(dto.getYear());        	
        	Set<Genre>genres = new HashSet<Genre>();
        	if (dto.getGenres()!=null) {
        		genres = genreService.findGenresByIdIn(new ArrayList<> (dto.getGenres().keySet()));        		
        		e.setGenres(genres);
        	}
        	
        }

        return e;
    }
}