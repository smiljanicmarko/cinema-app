package modul3.test.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

public class KosturDTO {

    @Positive(message = "Id mora biti pozitivan broj.")
    @NotNull
    @NotBlank
    
    //datum u  stringu
    @NotBlank(message = "Datum i vreme nisu zadati.")
    @Pattern(regexp = "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$", message = "Datum i vreme nisu validni.")
    private String datumIVreme;
    
   
}
