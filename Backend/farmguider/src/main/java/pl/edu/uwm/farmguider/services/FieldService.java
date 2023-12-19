package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.InvalidEnumException;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.models.field.enums.SoilClass;
import pl.edu.uwm.farmguider.repositories.FieldRepository;

import java.math.BigDecimal;

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

}
