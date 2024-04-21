package modul3.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import modul3.test.model.ProjectionType;


@Repository
public interface ProjectionTypeRepository extends JpaRepository<ProjectionType, Long> {

	ProjectionType findOneById(Long id);



}
