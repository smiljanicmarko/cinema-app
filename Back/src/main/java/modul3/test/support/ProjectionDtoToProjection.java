package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Movie;
import modul3.test.model.Projection;
import modul3.test.model.ProjectionType;
import modul3.test.model.Theater;
import modul3.test.model.Ticket;
import modul3.test.service.KorisnikService;
import modul3.test.service.MovieService;
import modul3.test.service.ProjectionService;
import modul3.test.service.ProjectionTypeService;
import modul3.test.service.TheaterService;
import modul3.test.web.dto.ProjectionDTO;

@Component
public class ProjectionDtoToProjection implements Converter<ProjectionDTO, Projection> {

    @Autowired
    private MovieService movieService;
    @Autowired
    private ProjectionService projectionService;
    @Autowired
    private ProjectionTypeService projectionTypeService;
    @Autowired
    private KorisnikService korisnikService;    
    @Autowired
    private TheaterService theaterService;
    
    @Override
    public Projection convert(ProjectionDTO dto) {

    	Projection e;

        if(dto.getId() == null) {
            e = new Projection();
        }else {
            e = projectionService.findOneById(dto.getId());
        }

        if(e != null) {
           
        	e.setAdmin(korisnikService.findbyKorisnickoIme(dto.getUsername()).get());
        	e.setId(dto.getId());
        	e.setPrice(dto.getPrice());
        	e.setTime(dto.getTime());
        	
        	Movie m = movieService.findOneById(dto.getMovieId());
        	if (m!=null) {
        		e.setMovie(m);
        	}
        	
        	ProjectionType pt = projectionTypeService.findById(dto.getProjectionTypeId());
        	if (pt!=null) {
        		e.setProjectionType(pt);
        	}
        	
        	Theater t = theaterService.findOneById(dto.getTheaterId());
        	if (t!=null) {
        		e.setTheater(t);
        	}
        	
        	List<Ticket>tickets = new ArrayList<Ticket>();
        	e.setTickets(tickets);
        	
        	
        }

        return e;
    }
}