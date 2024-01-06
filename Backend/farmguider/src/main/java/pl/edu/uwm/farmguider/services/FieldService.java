package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.InvalidEnumException;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.models.field.dtos.FieldSearchParams;
import pl.edu.uwm.farmguider.models.field.enums.SoilClass;
import pl.edu.uwm.farmguider.repositories.FieldRepository;

import java.math.BigDecimal;
import java.util.List;

import static pl.edu.uwm.farmguider.utils.FieldSpecification.bySearchParams;

@Service
@RequiredArgsConstructor
public class FieldService {

    private final FieldRepository fieldRepository;

    public Field getFieldById(Long fieldId) {
        return fieldRepository.findById(fieldId)
                .orElseThrow(() -> new EntityNotFoundException("Field", "Field with id: " + fieldId + " not found."));
    }

    public Field createField(Farm farm, String fieldName, BigDecimal fieldArea, String soilClass) {
        if (!SoilClass.isValid(soilClass)) {
            throw new InvalidEnumException("SoilClass", "Invalid soil class: " + soilClass);
        }

        SoilClass enumSoilClass = SoilClass.valueOf(soilClass);
        Field field = new Field(farm, fieldName, fieldArea, enumSoilClass);
        return fieldRepository.saveAndFlush(field);
    }

    public List<Field> getAllFieldsByFarmId(Long farmId) {
        return fieldRepository.findAllByFarmId(farmId);
    }

    public List<Field> getFieldsByFarmId(Long farmId, FieldSearchParams fieldSearchParams) {
        Specification<Field> spec = bySearchParams(farmId, fieldSearchParams);
        return fieldRepository.findAll(spec);
    }

    public Long getUserIdByFieldId(Long fieldId) {
        return fieldRepository.findUserIdByFieldId(fieldId);
    }

    public Field updateFieldById(Long fieldId, String fieldName, BigDecimal fieldArea, String soilClass) {
        if (!SoilClass.isValid(soilClass)) {
            throw new InvalidEnumException("SoilClass", "Invalid soil class: " + soilClass);
        }

        Field field = getFieldById(fieldId);
        SoilClass enumSoilClass = SoilClass.valueOf(soilClass);

        field.setFieldName(fieldName);
        field.setFieldArea(fieldArea);
        field.setSoilClass(enumSoilClass);
        return fieldRepository.saveAndFlush(field);
    }

    public void deleteFieldById(Long fieldId) {
        Field field = getFieldById(fieldId);
        fieldRepository.delete(field);
    }

}
