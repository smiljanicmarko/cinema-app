package modul3.test.web.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
	
	
	//There was some issue with Spring parsing dates, so that's the reason why the dates are received as Strings in Controller.
	
	@GetMapping
	public ResponseEntity<List<ProjectionDTO>> getAll(
			@RequestParam(required=false) String movie,			
			@RequestParam(required=false) Long projectionTypeId,
			@RequestParam(required=false) Long theaterId,
			@RequestParam(required=false) Double priceFrom,
			@RequestParam(required=false) Double priceTo,
			@RequestParam(required=false) String dateFrom,
			@RequestParam(required=false) String dateTo,	
			
			@RequestParam(required=false, defaultValue = "ASC") String orderBy,
			@RequestParam(required=false, defaultValue = "movie.name") String sortBy,
			
			@RequestParam(defaultValue="0") int pageNo) {
		
		LocalDateTime start = null;
		LocalDateTime end= null;		
		
		if (!dateFrom.isBlank()) { 
			try {
				start = LocalDate.parse(dateFrom).atStartOfDay();
			} catch (Exception e) {				
				e.printStackTrace();
			}
		}
		if (!dateTo.isBlank()){
			try {
				end = LocalDate.parse(dateTo).atTime(23, 59, 59);
			} catch (Exception e) {				
				e.printStackTrace();
			}
		}	 
		
		
		Page<Projection> stranice = projectionService.searchProjections(movie, start, end, projectionTypeId, theaterId, priceFrom, priceTo, pageNo, sortBy, orderBy);
		
		
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
			LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
	        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59, 999_999_999));
			
			List<Projection> projections = projectionService.todaysProjections(startOfDay, endOfDay);		
			
			return new ResponseEntity<>(toDto.convert(projections), HttpStatus.OK);

		}
		
		@GetMapping("/movie/{movieId}")
		public ResponseEntity<List<ProjectionDTO>> projectionsForMovieToday (@PathVariable Long movieId) {
			LocalDateTime now = LocalDateTime.now();
			
			
			List<Projection> projectionsAll = projectionService.findProjectionsByMovieAndTime(movieId, now);	
			List<Projection> projections = new ArrayList<Projection>();
			
			for (Projection p : projectionsAll) {
				if (p.getAvailableTickets()>0) {
					projections.add(p);
				}
			}
			
			
			if (projections != null) {
				return new ResponseEntity<>(toDto.convert(projections), HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			

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
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProjectionDTO> create(@Valid @RequestBody ProjectionDTO dto){

		Projection obj = toClass.convert(dto);
		System.out.println(obj.getDeleted());
		Projection saved = projectionService.createProjection(obj);

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
	
	@DeleteMapping("/{id}/logical")
	public ResponseEntity<Void> deleteLogically (@PathVariable Long id){
		Projection projection = projectionService.findOneById(id);
		
		if(projection != null) {
			projectionService.deleteLogically(id);
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
