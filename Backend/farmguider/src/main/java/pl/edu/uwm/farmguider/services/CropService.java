package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
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

    public Crop getCropById(Long cropId) {
        return cropRepository.findById(cropId)
                .orElseThrow(() -> new EntityNotFoundException("Crop", "Crop with id: " + cropId + " not found."));
    }

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

    public List<Crop> getCropsSownAfterDate(Long farmId, LocalDate date) {
        return cropRepository.findCropsSownAfterDate(farmId, date);
    }

    public Long getUserIdByCropId(Long cropId) {
        return cropRepository.findUserIdByCropId(cropId);
    }

    public Crop addHarvestByCropId(Long cropId, LocalDate harvestDate, BigDecimal yield) {
        Crop crop = getCropById(cropId);
        if (crop.getSowingDate().isAfter(harvestDate)) {
            throw new InvalidDateException("Crop", "Harvest date cannot be before sowing date.");
        }

        crop.setHarvestDate(harvestDate);
        crop.setYield(yield);
        return cropRepository.saveAndFlush(crop);
    }

    public void deleteCropById(Long cropId) {
        Crop crop = getCropById(cropId);
        cropRepository.delete(crop);
    }

}
