package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

import java.util.List;

public interface WeightGainRepository extends JpaRepository<WeightGain, Long> {

    List<WeightGain> findAllByCowId(Long cowId);

}
