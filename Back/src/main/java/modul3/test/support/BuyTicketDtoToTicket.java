//package modul3.test.support;
//
//
//import java.time.LocalDateTime;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.stereotype.Component;
//
//import modul3.test.model.Projection;
//import modul3.test.model.Ticket;
//import modul3.test.service.KorisnikService;
//import modul3.test.service.ProjectionService;
//import modul3.test.service.SeatService;
//import modul3.test.service.TicketService;
//import modul3.test.web.dto.BuyTicketDTO;
//
//@Component
//public class BuyTicketDtoToTicket implements Converter<BuyTicketDTO, Ticket> {
//
//  
//    @Autowired
//    private TicketService ticketService;
//    @Autowired
//    private ProjectionService projectionService;
//    @Autowired
//    private SeatService seatService;
//    @Autowired
//    private KorisnikService korisnikService;
//    @Override
//    public Ticket convert(BuyTicketDTO dto) {
//
//    	Ticket e = new Ticket();
//       
//    	e.setId(null);
//    	e.setPurchaseTime(LocalDateTime.now());
//    	
//    	Projection projection = projectionService.findOneById(dto.getProjectionId());
//    	if (projection != null) {    		
//    		e.setProjection(projection);
//    	}
//    	
//    	List
//    	e.setSeat(null);
//    	e.setUser(null);
//    	
//        
//           
//        
//
//        return e;
//    }
//}