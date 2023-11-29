package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.farm.Farm;

public interface FarmRepository extends JpaRepository<Farm, Long> {

}
