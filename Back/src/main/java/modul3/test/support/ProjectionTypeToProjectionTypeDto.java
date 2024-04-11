package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.ProjectionType;
import modul3.test.web.dto.ProjectionTypeDTO;

@Component
public class ProjectionTypeToProjectionTypeDto implements Converter<ProjectionType, ProjectionTypeDTO> {

    @Override
    public ProjectionTypeDTO convert(ProjectionType e) {
    	ProjectionTypeDTO dto = new ProjectionTypeDTO();
        
	    dto.setId(e.getId());
	    dto.setType(e.getType().toString());
    	
    	
        return dto;
    }

    public List<ProjectionTypeDTO> convert(List<ProjectionType> lista){
        List<ProjectionTypeDTO> listaDTO = new ArrayList<>();

        for(ProjectionType e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



