package modul3.test.support;
//
//
//import modul3.test.model.Film;
//import modul3.test.model.Zanr;
//import modul3.test.service.KosturService;
//import modul3.test.service.ZanrService;
//import modul3.test.web.dto.FilmDTO;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//
//@Component
//public class FilmDtoToFilm implements Converter<FilmDTO,Film> {
//
//    @Autowired
//    private KosturService filmService;
//
//    @Autowired
//    private ZanrService zanrService;
//
//    @Override
//    public Film convert(FilmDTO dto) {
//
//        Film e;
//
//        if(dto.getId() == null) {
//            e = new Film();
//        }else {
//            e = filmService.findOneById(dto.getId());
//        }
//
//        if(e != null) {
//            e.setNaziv(dto.getNaziv());
//            e.setTrajanje(dto.getTrajanje());
//
//            List<Zanr> zanrovi = zanrService.find(new ArrayList<>(dto.getZanrovi().keySet()));
//            e.setZanrovi(new HashSet<>(zanrovi));
//        }
//
//        return e;
//    }
//}