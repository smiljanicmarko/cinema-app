package modul3.test.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import modul3.test.model.Projection;
import modul3.test.model.Ticket;
import modul3.test.service.ProjectionService;
import modul3.test.service.TicketService;
import modul3.test.support.TicketToTicketDto;
import modul3.test.web.dto.TicketDTO;

@RestController
@RequestMapping(value = "/api/tickets", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketController {

	@Autowired 
	private TicketService ticketService;
	@Autowired
	private ProjectionService projectionService;
	@Autowired
	private TicketToTicketDto toDto;
//	@Autowired
//	private MovieDtoToMovie toClass;
	
	
	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	 // @PreAuthorize("hasRole('ADMIN')")
	
	
	//GET ALL
	


	
	//GET ALL LISTA
	
		@GetMapping
		public ResponseEntity<List<TicketDTO>> getAll() {

			List<Ticket> stranice = ticketService.findAll();

		
			return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);

		}
		
		
		@GetMapping("/projection/{projectionId}")
		public ResponseEntity<List<TicketDTO>> getAllTicketsForProjection(@PathVariable Long projectionId) {

			Projection projection = projectionService.findOneById(projectionId);
			if (projection!=null) {
				List<Ticket> stranice = projection.getTickets();
				return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			

		
			

		}
		
	
	
	//GET BY ID

	@GetMapping("/{id}")
	public ResponseEntity <TicketDTO> get(@PathVariable Long id) {
		Ticket obj = ticketService.findOneById(id);

		if(obj != null) {
			return new ResponseEntity<>(toDto.convert(obj), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//
//
//
//	//CREATE
//	//@PreAuthorize("hasRole('ADMIN')")
//	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<MovieDTO> create(@Valid @RequestBody MovieDTO dto){
//
//		Movie obj = toClass.convert(dto);
//		Movie saved = movieService.save(obj);
//
//		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
//	}
//
//
//	//DELETE
//	//@PreAuthorize("hasRole('ADMIN')")
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> delete(@PathVariable Long id){
//		Movie obrisan = movieService.delete(id);
//
//		if(obrisan != null) {
//			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}
//
//	//UPDATE
//	//@PreAuthorize("hasRole('ADMIN')")
//	 @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
//	    public ResponseEntity<MovieDTO> update(@PathVariable Long id, @Valid @RequestBody MovieDTO dto){
//
//	        if(!id.equals(dto.getId())) {
//	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	        }
//
//	        Movie linija = toClass.convert(dto);
//	        Movie saved = movieService.update(linija);
//
//	        return new ResponseEntity<>(toDto.convert(saved),HttpStatus.OK);
//	    }

	 
	 
}