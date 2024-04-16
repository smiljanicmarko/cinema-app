package modul3.test.web.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import modul3.test.service.MovieService;
import modul3.test.web.dto.MovieReportDTO;

@RestController
@RequestMapping(value = "/api/report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportController {

	@Autowired 
	private MovieService movieService;
	

	
		@GetMapping
		public ResponseEntity<List<MovieReportDTO>> getAll(@RequestParam String start, 
															@RequestParam String end) {

//	@GetMapping
//	public ResponseEntity<List<MovieReportDTO>> getAll(@RequestParam String ovo) {
	
			System.out.println("ovooooooooooooooooooooooooooooooo: ");
			start = start.substring(0,10);
			System.out.println("start SUBSTRINGOVAN " +start);
			
			end = end.substring(0,10);
			System.out.println("end SUBSTRINGOVAN " +end);
			LocalDate startDatum = LocalDate.parse(start);
			
			LocalDate endDatum = LocalDate.parse(end);
			System.out.println("END neSubstringovan"+end);
     		List<MovieReportDTO> data = movieService.report(startDatum, endDatum);
     		System.out.println(data);
			//List<MovieReportDTO> data = new ArrayList<MovieReportDTO>();
			return new ResponseEntity<>(data, HttpStatus.OK);

		}
		

	 
	 
}
