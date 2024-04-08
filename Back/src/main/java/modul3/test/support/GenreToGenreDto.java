package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Genre;
import modul3.test.web.dto.GenreDTO;

@Component
public class GenreToGenreDto implements Converter<Genre, GenreDTO> {

    @Override
    public GenreDTO convert(Genre e) {
    	GenreDTO dto = new GenreDTO();
        
    	dto.setId(e.getId());
    	dto.setName(e.getName());
    	
    	return dto;
    }

    public List<GenreDTO> convert(List<Genre> lista){
        List<GenreDTO> listaDTO = new ArrayList<>();

        for(Genre e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



