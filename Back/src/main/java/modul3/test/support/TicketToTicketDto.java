package modul3.test.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import modul3.test.model.Ticket;
import modul3.test.web.dto.TicketDTO;

@Component
public class TicketToTicketDto implements Converter<Ticket, TicketDTO> {

    @Override
    public TicketDTO convert(Ticket e) {
    	TicketDTO dto = new TicketDTO();
        
    	dto.setId(e.getId());
    	dto.setMovieId(e.getProjection().getMovie().getId());
    	dto.setMovie(e.getProjection().getMovie().getName());
    	dto.setProjectionId(e.getProjection().getId());
    	dto.setProjectionType(e.getProjection().getProjectionType().getType().toString());
    	dto.setPurchaseTime(e.getPurchaseTime());
    	dto.setSeatId(e.getSeat().getId());
    	dto.setTheaterName(e.getProjection().getTheater().getName());
    	dto.setUserId(e.getUser().getId());
    	dto.setUsername(e.getUser().getKorisnickoIme());
    	dto.setSeatNumber(e.getSeat().getNumber());   	
    	dto.setPrice(e.getProjection().getPrice());
    	
    	
        return dto;
    }

    public List<TicketDTO> convert(List<Ticket> lista){
        List<TicketDTO> listaDTO = new ArrayList<>();

        for(Ticket e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



