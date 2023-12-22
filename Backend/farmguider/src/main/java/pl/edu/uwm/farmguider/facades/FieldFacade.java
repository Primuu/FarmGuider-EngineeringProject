package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.models.field.dtos.FieldCreateDTO;
import pl.edu.uwm.farmguider.models.field.dtos.FieldMapper;
import pl.edu.uwm.farmguider.models.field.dtos.FieldResponseDTO;
import pl.edu.uwm.farmguider.models.field.dtos.FieldSearchParams;
import pl.edu.uwm.farmguider.services.FarmService;
import pl.edu.uwm.farmguider.services.FieldService;

import java.util.Comparator;
import java.util.List;

import static pl.edu.uwm.farmguider.models.field.dtos.FieldMapper.mapToFieldResponseDTO;

@Component
@RequiredArgsConstructor
public class FieldFacade {

    private final FieldService fieldService;
    private final FarmService farmService;

    public FieldResponseDTO createField(Long farmId, FieldCreateDTO fieldCreateDTO) {
        Farm farm = farmService.getFarmById(farmId);
        Field field = fieldService.createField(
                farm,
                fieldCreateDTO.fieldName(),
                fieldCreateDTO.fieldArea(),
                fieldCreateDTO.soilClass()
        );
        return mapToFieldResponseDTO(field);
    }

    public List<FieldResponseDTO> getFieldsByFarmId(Long farmId, FieldSearchParams fieldSearchParams) {
        List<Field> fields = fieldService.getFieldsByFarmId(farmId, fieldSearchParams);
        return fields.stream()
                .map(FieldMapper::mapToFieldResponseDTO)
                .sorted(Comparator.comparing(FieldResponseDTO::fieldName))
                .toList();
    }

    public FieldResponseDTO getFieldById(Long fieldId) {
        return mapToFieldResponseDTO(fieldService.getFieldById(fieldId));
    }

}
