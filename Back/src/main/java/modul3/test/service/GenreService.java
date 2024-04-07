package modul3.test.service;

import java.util.List;
import java.util.Set;

import modul3.test.model.Genre;

public interface GenreService {
	
	
  Genre findOneById(Long id);
	
  List<Genre> findAll();

  Set<Genre> findGenresByIdIn (List<Long>ids);
  
//  Film save(Film film);
//
//  Film update(Film film);
//
//  Film delete(Long id);
//
//  Page<Linija> pretraga(String destinacija, Long prevoznikId, Double cenaKarteDo, int pageNo);
  
  
//  
//
//  
	
	
//  Page<Film> findAll(Integer pageNo);
//  Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//  List<Film> findByZanrId(Long zanrId);
//  List<Linija> nadjiPoId (List<Long>ids);
}
