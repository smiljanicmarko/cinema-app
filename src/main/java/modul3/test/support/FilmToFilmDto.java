package modul3.test.support;
//
//
//import modul3.test.model.Film;
//import modul3.test.model.Zanr;
//import modul3.test.web.dto.FilmDTO;
//
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.List;
//
//@Component
//public class FilmToFilmDto implements Converter<Film, FilmDTO> {
//
//    @Override
//    public FilmDTO convert(Film e) {
//        FilmDTO dto = new FilmDTO();
//        dto.setId(e.getId());
//        dto.setNaziv(e.getNaziv());
//        dto.setTrajanje(e.getTrajanje());
//        LinkedHashMap<Long, String> zanroviMap = new LinkedHashMap<>();
//        for (Zanr zanr: e.getZanrovi()) {
//            zanroviMap.put(zanr.getId(), zanr.getNaziv());
//        }
//        dto.setZanrovi(zanroviMap);
//        return dto;
//    }
//
//    public List<FilmDTO> convert(List<Film> lista){
//        List<FilmDTO> listaDTO = new ArrayList<>();
//
//        for(Film e : lista) {
//            listaDTO.add(convert(e));
//        }
//
//        return listaDTO;
//    }
//
//}



