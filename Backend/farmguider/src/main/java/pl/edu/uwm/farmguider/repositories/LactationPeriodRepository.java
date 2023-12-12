package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;

import java.util.List;

public interface LactationPeriodRepository extends JpaRepository<LactationPeriod, Long> {

    List<LactationPeriod> findAllByCowId(Long cowId);

}
