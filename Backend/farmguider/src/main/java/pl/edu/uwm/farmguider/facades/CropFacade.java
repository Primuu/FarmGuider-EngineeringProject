package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.exceptions.global.InvalidEnumException;
import pl.edu.uwm.farmguider.models.crop.Crop;
import pl.edu.uwm.farmguider.models.crop.dtos.CropCreateDTO;
import pl.edu.uwm.farmguider.models.crop.dtos.CropMapper;
import pl.edu.uwm.farmguider.models.crop.dtos.CropResponseDTO;
import pl.edu.uwm.farmguider.models.crop.dtos.HarvestCreateDTO;
import pl.edu.uwm.farmguider.models.cropType.CropType;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.services.CropService;
import pl.edu.uwm.farmguider.services.CropTypeService;
import pl.edu.uwm.farmguider.services.FieldService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import static pl.edu.uwm.farmguider.models.crop.dtos.CropMapper.mapToCropResponseDTO;
import static pl.edu.uwm.farmguider.utils.DateUtils.convertMonthDayToDate;

@Component
@RequiredArgsConstructor
public class CropFacade {

    private final CropService cropService;
    private final CropTypeService cropTypeService;
    private final FieldService fieldService;

    public CropResponseDTO createCrop(Long fieldId, CropCreateDTO cropCreateDTO) {
        if(!CropTypeEnum.isValid(cropCreateDTO.cropType())) {
            throw new InvalidEnumException("CropType", "Invalid crop type: " + cropCreateDTO.cropType());
        }

        CropTypeEnum cropTypeEnum = CropTypeEnum.valueOf(cropCreateDTO.cropType());
        CropType cropType = cropTypeService.getCropTypeByCropTypeEnum(cropTypeEnum);
        LocalDate sowingDate = cropCreateDTO.sowingDate();

        LocalDate expectedHarvestStartDate = calculateExpectedHarvestStartDate(sowingDate, cropType);
        LocalDate expectedHarvestEndDate = calculateExpectedHarvestEndDate(sowingDate, cropType);
        Field field = fieldService.getFieldById(fieldId);

        Crop crop = cropService.createCrop(
                field,
                cropTypeEnum,
                cropCreateDTO.sowingDate(),
                expectedHarvestStartDate,
                expectedHarvestEndDate,
                calculateExpectedYield(cropType.getAverageYield(), field.getFieldArea())
        );
        return mapToCropResponseDTO(crop);
    }

    public List<CropResponseDTO> getCropsByFieldId(Long fieldId) {
        List<Crop> crops = cropService.getCropsByFieldId(fieldId);
        return crops
                .stream()
                .map(CropMapper::mapToCropResponseDTO)
                .sorted(Comparator.comparing(CropResponseDTO::sowingDate).reversed())
                .toList();
    }

    public CropResponseDTO addHarvestByCropId(Long cropId, HarvestCreateDTO harvestCreateDTO) {
        Crop crop = cropService.addHarvestByCropId(
                cropId,
                harvestCreateDTO.harvestDate(),
                harvestCreateDTO.yield()
        );
        return mapToCropResponseDTO(crop);
    }

    public void deleteCropById(Long cropId) {
        cropService.deleteCropById(cropId);
    }

    private BigDecimal calculateExpectedYield(BigDecimal averageYield, BigDecimal fieldArea) {
        return averageYield.multiply(fieldArea).setScale(3, RoundingMode.HALF_UP);
    }

    private LocalDate calculateExpectedHarvestStartDate(LocalDate sowingDate, CropType cropType) {
        int year = calculateHarvestYear(sowingDate, cropType.getOptimalHarvestEndDate());
        return convertMonthDayToDate(cropType.getOptimalHarvestStartDate(), String.valueOf(year));
    }

    private LocalDate calculateExpectedHarvestEndDate(LocalDate sowingDate, CropType cropType) {
        int year = calculateHarvestYear(sowingDate, cropType.getOptimalHarvestEndDate());
        return convertMonthDayToDate(cropType.getOptimalHarvestEndDate(), String.valueOf(year));
    }

    private int calculateHarvestYear(LocalDate sowingDate, String optimalHarvestEndDate) {
        LocalDate harvestEndDate = convertMonthDayToDate(optimalHarvestEndDate, String.valueOf(sowingDate.getYear()));
        return sowingDate.isAfter(harvestEndDate) ? sowingDate.getYear() + 1 : sowingDate.getYear();
    }

}
