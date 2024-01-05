package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.cropType.CropType;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;
import pl.edu.uwm.farmguider.repositories.CropTypeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CropTypeService {

    private final CropTypeRepository cropTypeRepository;

    public CropType getCropTypeByCropTypeEnum(CropTypeEnum cropType) {
        return cropTypeRepository.findByCropType(cropType);
    }

    public List<CropType> getAllCropTypes(){
        return cropTypeRepository.findAll();
    }

}
