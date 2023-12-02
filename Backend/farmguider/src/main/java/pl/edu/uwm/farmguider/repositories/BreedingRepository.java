package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.breeding.Breeding;

import java.util.List;

public interface BreedingRepository extends JpaRepository<Breeding, Long> {

    List<Breeding> findAllByFarmId(Long farmId);

    @Query("""
           SELECT b.farm.owner.id
           FROM Breeding b
           JOIN b.farm.owner
           WHERE b.id = :breedingId
           """)
    Long findUserIdByBreedingId(@Param("breedingId") Long breedingId);

}
