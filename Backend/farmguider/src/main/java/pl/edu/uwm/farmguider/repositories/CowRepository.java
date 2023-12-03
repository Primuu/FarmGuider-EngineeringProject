package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.cow.Cow;

public interface CowRepository extends JpaRepository<Cow, Long> {

}
