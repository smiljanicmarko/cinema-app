package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Seat;
import modul3.test.web.dto.SeatDTO;

@Component
public class SeatToSeatDto implements Converter<Seat, SeatDTO> {

    @Override
    public SeatDTO convert(Seat e) {
    	SeatDTO dto = new SeatDTO();
        
    	dto.setId(e.getId());
    	dto.setTheater(e.getTheater().getName());
    	dto.setTheaterId(e.getTheater().getId());
    	dto.setNumber(e.getNumber());
    	
        return dto;
    }

    public List<SeatDTO> convert(List<Seat> lista){
        List<SeatDTO> listaDTO = new ArrayList<>();

        for(Seat e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



