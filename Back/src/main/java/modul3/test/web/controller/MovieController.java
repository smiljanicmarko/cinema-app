package modul3.test.web.controller;

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

import modul3.test.model.Movie;
import modul3.test.service.MovieService;
import modul3.test.support.MovieDtoToMovie;
import modul3.test.support.MovieToMovieDto;
import modul3.test.web.dto.MovieAvailableDTO;
import modul3.test.web.dto.MovieDTO;

@RestController
@RequestMapping(value = "/api/movies", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovieController {

	@Autowired 
	private MovieService movieService;
	@Autowired
	private MovieToMovieDto toDto;
	@Autowired
	private MovieDtoToMovie toClass;


	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	// @PreAuthorize("hasRole('ADMIN')")


	//GET ALL

	@GetMapping
	public ResponseEntity<List<MovieDTO>> getAll(
			@RequestParam(required=false) String name,
			@RequestParam(required=false) String distributor,
			@RequestParam(required=false) String country,			
			@RequestParam(required=false) String genres,
			@RequestParam(required=false) Integer durationFrom,
			@RequestParam(required=false) Integer durationTo,
			@RequestParam(required=false) Integer yearFrom,
			@RequestParam(required=false) Integer yearTo,
			
			@RequestParam(required=false, defaultValue = "ASC") String orderBy,
			@RequestParam(required=false, defaultValue = "name") String sortBy,
			
			@RequestParam(defaultValue="0") int pageNo) {
		
		if (genres != null) {
			genres = genres.trim();
		}
		
		Page<Movie> stranice = movieService.searchMovies(name, distributor, country, genres, durationFrom, durationTo, yearFrom, yearTo, pageNo, sortBy, orderBy);

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Total-Pages", stranice.getTotalPages() + "");

		return new ResponseEntity<>(toDto.convert(stranice.getContent()), responseHeaders, HttpStatus.OK);

	}


	//GET ALL LISTA

	@GetMapping("/all")
	public ResponseEntity<List<MovieDTO>> getAll() {

		List<Movie> stranice = movieService.findAll();


		return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);

	}


	

	//GET BY ID

	@GetMapping("/{id}")
	public ResponseEntity <MovieDTO> get(@PathVariable Long id) {
		Movie obj = movieService.findOneById(id);

		if(obj != null) {
			return new ResponseEntity<>(toDto.convert(obj), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	@GetMapping("/{id}/available")
	public ResponseEntity <MovieAvailableDTO> isMovieAvailable (@PathVariable Long id) {
		Boolean available = movieService.movieAvailable(id);

		if (available != null) {
			MovieAvailableDTO dto = new MovieAvailableDTO();
			dto.setMovieAvailable(available);	
			System.out.println("=========================================================================================================");
			System.out.println(available);
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}else {
			return new ResponseEntity<MovieAvailableDTO>(HttpStatus.BAD_REQUEST);
		}


	}




	//CREATE
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MovieDTO> create(@Valid @RequestBody MovieDTO dto){

		Movie obj = toClass.convert(dto);
		Movie saved = movieService.save(obj);

		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
	}


	//DELETE
	//@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		Movie obrisan = movieService.delete(id);

		if(obrisan != null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	//@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}/logically")
	public ResponseEntity<Void> deleteLogically(@PathVariable Long id){
		
		Boolean obrisan = movieService.logicallyDelete(id);

		if(obrisan != null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//UPDATE
	//@PreAuthorize("hasRole('ADMIN')")
	@PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MovieDTO> update(@PathVariable Long id, @Valid @RequestBody MovieDTO dto){

		if(!id.equals(dto.getId())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Movie linija = toClass.convert(dto);
		Movie saved = movieService.update(linija);

		return new ResponseEntity<>(toDto.convert(saved),HttpStatus.OK);
	}



}
