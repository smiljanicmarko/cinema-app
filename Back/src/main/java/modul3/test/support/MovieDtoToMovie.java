package modul3.test.support;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Movie;
import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieDTO;

@Component
public class MovieDtoToMovie implements Converter<MovieDTO, Movie> {

    @Autowired
    private MovieService movieService;

    

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
        	e.setGenres(dto.getGenres());
        	
        	
        }

        return e;
    }
}