package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.breeding.Breeding;

public interface BreedingRepository extends JpaRepository<Breeding, Long> {

}
