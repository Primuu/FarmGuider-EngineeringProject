package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.breeding.Breeding;

import java.util.List;

public interface BreedingRepository extends JpaRepository<Breeding, Long> {

    List<Breeding> findAllByFarmId(Long farmId);

}
