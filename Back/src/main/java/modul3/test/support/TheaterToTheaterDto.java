package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Theater;
import modul3.test.web.dto.TheaterDTO;

@Component
public class TheaterToTheaterDto implements Converter<Theater, TheaterDTO> {

    @Override
    public TheaterDTO convert(Theater e) {
    	TheaterDTO dto = new TheaterDTO();
        
    	dto.setId(e.getId());
    	dto.setName(e.getName());
    	
    	
        return dto;
    }

    public List<TheaterDTO> convert(List<Theater> lista){
        List<TheaterDTO> listaDTO = new ArrayList<>();

        for(Theater e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



