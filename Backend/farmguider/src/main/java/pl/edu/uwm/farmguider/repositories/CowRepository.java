package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

import java.util.Collection;
import java.util.List;

public interface CowRepository extends JpaRepository<Cow, Long>, JpaSpecificationExecutor<Cow> {

    @Query("""
            SELECT f.owner.id
            FROM Cow c
            JOIN c.breeding b
            JOIN b.farm f
            WHERE c.id = :cowId
            """)
    Long findUserIdByCowId(@Param("cowId") Long cowId);

    List<Cow> findByGenderAndBreedingIn(Gender gender, Collection<Breeding> breedings);

}
