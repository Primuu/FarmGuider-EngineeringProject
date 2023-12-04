package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.milking.Milking;

public interface MilkingRepository extends JpaRepository<Milking, Long> {

}
