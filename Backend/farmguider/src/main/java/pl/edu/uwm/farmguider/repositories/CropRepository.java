package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.crop.Crop;

import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {

    List<Crop> findAllByFieldId(Long fieldId);

}
