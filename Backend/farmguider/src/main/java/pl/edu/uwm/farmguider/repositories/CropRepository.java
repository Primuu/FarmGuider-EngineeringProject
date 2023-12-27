package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.crop.Crop;

public interface CropRepository extends JpaRepository<Crop, Long> {

}
