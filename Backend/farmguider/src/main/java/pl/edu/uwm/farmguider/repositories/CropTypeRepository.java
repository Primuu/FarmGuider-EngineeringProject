package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.cropType.CropType;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;

public interface CropTypeRepository extends JpaRepository<CropType, Long> {

    CropType findByCropType(CropTypeEnum cropTypeEnum);

}
