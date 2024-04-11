package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Projection;
import modul3.test.service.ProjectionService;
import modul3.test.web.dto.ProjectionDTO;

@Component
public class ProjectionToProjectionDto implements Converter<Projection, ProjectionDTO> {

	@Autowired
	private ProjectionService projectionService;
	
    @Override
    public ProjectionDTO convert(Projection e) {
    	ProjectionDTO dto = new ProjectionDTO();
        	
    	dto.setId(e.getId());
    	dto.setMovieId(e.getMovie().getId());
    	dto.setMovieName(e.getMovie().getName());
    	dto.setPrice(e.getPrice());
    	dto.setProjectionType(e.getProjectionType().getType().toString());
    	dto.setProjectionTypeId(e.getProjectionType().getId());
    	dto.setTheaterId(e.getTheater().getId());
    	dto.setTheaterName(e.getTheater().getName());
    	dto.setTime(e.getTime());
    	dto.setUsername(e.getAdmin().getKorisnickoIme());
    	dto.setSeatsAvailable(projectionService.numberOfSeatsAvailable(e.getId()));
    	
    	
        return dto;
    }

    public List<ProjectionDTO> convert(List<Projection> lista){
        List<ProjectionDTO> listaDTO = new ArrayList<>();

        for(Projection e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



