//package modul3.test.web.controller;
//
//import java.util.List;
//
//import javax.validation.Valid;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import autobuskastanica.model.Linija;
//import modul3.test.model.Doktor;
//import modul3.test.web.dto.DoktorDTO;
//import modul3.test.web.dto.LinijaDTO;
//
//@RestController
//@RequestMapping(value = "/api/", produces = MediaType.APPLICATION_JSON_VALUE)
//public class KosturController {
//
//	@Autowired 
//	private KlasaService klasaService;
//	@Autowired
//	private KlasaToKlasaDto toDto;
//	@Autowired
//	private KlasaDtoToKlasa toKlasa;
//	
//	
//	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
//	 // @PreAuthorize("hasRole('ADMIN')")
//	
//	
//	//GET ALL
//	
//	@GetMapping
//	public ResponseEntity<List<KlasaDto>> getAll(
//			@RequestParam(required=false) String destinacija,
//			@RequestParam(required=false) Long prevoznikId,
//			@RequestParam(required=false) Double cenaKarteDo,
//			@RequestParam(defaultValue="0") int pageNo) {
//
//		Page<Klasa> stranice = klasaService.pretraga(destinacija, prevoznikId, cenaKarteDo, pageNo);
//
//		HttpHeaders responseHeaders = new HttpHeaders();
//		responseHeaders.set("Total-Pages", stranice.getTotalPages() + "");
//
//		return new ResponseEntity<>(toDto.convert(stranice.getContent()), responseHeaders, HttpStatus.OK);
//
//	}
//
//	
//	//GET ALL LISTA
//	
//		@GetMapping
//		public ResponseEntity<List<DoktorDTO>> getAll() {
//
//			List<Doktor> stranice = doktorService.findAll();
//
//		
//			return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);
//
//		}
//	
//	
//	//GET BY ID
//
//	@GetMapping("/{id}")
//	public ResponseEntity <KlasaDto> get(@PathVariable Long id) {
//		Klasa obj = klasaService.findOneById(id);
//
//		if(obj != null) {
//			return new ResponseEntity<>(toDto.convert(obj), HttpStatus.OK);
//		}else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}
//
//
//
//
//	//CREATE
//	//@PreAuthorize("hasRole('ADMIN')")
//	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<KlasaDTO> create(@Valid @RequestBody KlasaDTO dto){
//
//		Klasa obj = toKlasa.convert(dto);
//		Klasa saved = adresaService.save(obj);
//
//		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
//	}
//
//
//	//DELETE
//	//@PreAuthorize("hasRole('ADMIN')")
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> delete(@PathVariable Long id){
//		Klasa obrisan = klasaService.delete(id);
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
//	    public ResponseEntity<LinijaDTO> update(@PathVariable Long id, @Valid @RequestBody LinijaDTO dto){
//
//	        if(!id.equals(dto.getId())) {
//	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	        }
//
//	        Linija linija = toKlasa.convert(dto);
//	        Linija saved = linijaService.update(linija);
//
//	        return new ResponseEntity<>(toDto.convert(saved),HttpStatus.OK);
//	    }
//
//	 
//	 
//}
