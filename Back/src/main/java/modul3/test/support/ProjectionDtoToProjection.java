package modul3.test.support;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Projection;
import modul3.test.service.KorisnikService;
import modul3.test.service.MovieService;
import modul3.test.service.ProjectionService;
import modul3.test.service.ProjectionTypeService;
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
        	e.setMovie(null);
        	e.setPrice(dto.getPrice());
        	e.setProjectionType(null);
        	e.setTheater(null);
        }

        return e;
    }
}