package modul3.test.web.dto;

public class KorisnikDTO {

    //@Positive(message = "Id mora biti pozitivan broj.")
    private Long id;

    //@NotBlank
    private String korisnickoIme;

    //@NotEmpty
    //@Email
    private String eMail;

    //@Size(min=3, max=50)
    private String ime;

    //@Size(min=3, max=50)
    private String prezime;
    
    private String uloga;

    private Boolean deleted;
    
	public String getUloga() {
		return uloga;
	}

	public void setUloga(String uloga) {
		this.uloga = uloga;
	}

	public KorisnikDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

   

}
