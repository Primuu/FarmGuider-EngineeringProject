package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

public interface WeightGainRepository extends JpaRepository<WeightGain, Long> {

}