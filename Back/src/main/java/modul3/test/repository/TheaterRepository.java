package modul3.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.Theater;


@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long> {

	Theater findOneById(Long id);

}


