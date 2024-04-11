package modul3.test.web.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import modul3.test.model.Projection;
import modul3.test.service.ProjectionService;
import modul3.test.support.ProjectionDtoToProjection;
import modul3.test.support.ProjectionToProjectionDto;
import modul3.test.web.dto.ProjectionDTO;

@RestController
@RequestMapping(value = "/api/projections", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectionController {

	@Autowired 
	private ProjectionService projectionService;
	@Autowired
	private ProjectionToProjectionDto toDto;
	@Autowired
	private ProjectionDtoToProjection toClass;
	
	
	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	 // @PreAuthorize("hasRole('ADMIN')")
	
	
	//GET ALL
	
	@GetMapping
	public ResponseEntity<List<ProjectionDTO>> getAll(
			@RequestParam(required=false) String movie,			
			@RequestParam(required=false) Long projectionTypeId,
			@RequestParam(required=false) Long theaterId,
			@RequestParam(required=false) LocalDateTime timeFrom,
			@RequestParam(required=false) LocalDateTime timeTo,
			@RequestParam(required=false) Double priceFrom,
			@RequestParam(required=false) Double priceTo,
			
			@RequestParam(defaultValue="0") int pageNo) {
		System.out.println("IZ KONTROLERA: ");
		System.out.println("vremeOd =" + timeFrom);
		System.out.println("vremeDo =" + timeTo);
		
		
		Page<Projection> stranice = projectionService.searchProjections(movie, timeFrom, timeTo, projectionTypeId, theaterId, priceFrom, priceTo, pageNo);

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Total-Pages", stranice.getTotalPages() + "");

		return new ResponseEntity<>(toDto.convert(stranice.getContent()), responseHeaders, HttpStatus.OK);

	}

	
	//GET ALL LISTA
	
		@GetMapping("/all")
		public ResponseEntity<List<ProjectionDTO>> getAll() {

			List<Projection> stranice = projectionService.findAll();

		
			return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);

		}
	
		
		@GetMapping("/today")
		public ResponseEntity<List<ProjectionDTO>> projectionsToday () {
			LocalDate now = LocalDate.now();
			
			List<Projection> stranice = projectionService.findAll();
			List<Projection> today = new ArrayList<Projection>();
			
			for (Projection p : stranice) {
				if (p.getTime().toLocalDate().equals(now)) {
					today.add(p);
				}
			}
			
			return new ResponseEntity<>(toDto.convert(today), HttpStatus.OK);

		}
		
	
	//GET BY ID

	@GetMapping("/{id}")
	public ResponseEntity <ProjectionDTO> get(@PathVariable Long id) {
		Projection obj = projectionService.findOneById(id);

		if(obj != null) {
			return new ResponseEntity<>(toDto.convert(obj), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}




	//CREATE
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProjectionDTO> create(@Valid @RequestBody ProjectionDTO dto){

		Projection obj = toClass.convert(dto);
		Projection saved = projectionService.save(obj);

		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
	}


	//DELETE
	//@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		Projection obrisan = projectionService.delete(id);

		if(obrisan != null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//UPDATE
	//@PreAuthorize("hasRole('ADMIN')")
	 @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<ProjectionDTO> update(@PathVariable Long id, @Valid @RequestBody ProjectionDTO dto){

	        if(!id.equals(dto.getId())) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }

	        Projection linija = toClass.convert(dto);
	        Projection saved = projectionService.update(linija);

	        return new ResponseEntity<>(toDto.convert(saved),HttpStatus.OK);
	    }

	 
	 
}
