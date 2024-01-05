package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.cropType.CropType;
import pl.edu.uwm.farmguider.models.cropType.dtos.CropTypeMapper;
import pl.edu.uwm.farmguider.models.cropType.dtos.CropTypeResponseDTO;
import pl.edu.uwm.farmguider.services.CropTypeService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CropTypeFacade {

    private final CropTypeService cropTypeService;

    public List<CropTypeResponseDTO> getCropTypes() {
        List<CropType> cropTypes = cropTypeService.getAllCropTypes();
        return cropTypes
                .stream()
                .map(CropTypeMapper::mapToCropTypeResponseDTO)
                .toList();
    }

}
