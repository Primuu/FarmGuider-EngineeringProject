package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.farm.Farm;

import java.util.Optional;

public interface FarmRepository extends JpaRepository<Farm, Long> {

    @Query("""
            SELECT f
            FROM Farm f
            WHERE f.owner.email = :email
            """)
    Optional<Farm> findFarmByOwnerEmail(@Param("email") String email);

}
