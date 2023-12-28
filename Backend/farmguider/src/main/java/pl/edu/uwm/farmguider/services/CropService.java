package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.crop.Crop;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.repositories.CropRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CropService {

    private final CropRepository cropRepository;

    public Crop createCrop(Field field,
                           CropTypeEnum cropTypeEnum,
                           LocalDate sowingDate,
                           LocalDate expectedHarvestStartDate,
                           LocalDate expectedHarvestEndDate,
                           BigDecimal expectedYield) {
        Crop crop = new Crop(field, cropTypeEnum, sowingDate, expectedHarvestStartDate, expectedHarvestEndDate, expectedYield);
        return cropRepository.saveAndFlush(crop);
    }

    public List<Crop> getCropsByFieldId(Long fieldId) {
        return cropRepository.findAllByFieldId(fieldId);
    }

}
