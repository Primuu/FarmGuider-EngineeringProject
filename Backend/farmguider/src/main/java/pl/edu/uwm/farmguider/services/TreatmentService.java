package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.crop.Crop;
import pl.edu.uwm.farmguider.models.treatment.Treatment;
import pl.edu.uwm.farmguider.repositories.TreatmentRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;

    public Treatment getTreatmentById(Long treatmentId) {
        return treatmentRepository.findById(treatmentId)
                .orElseThrow(() -> new EntityNotFoundException("Treatment", "Treatment with id: " + treatmentId + " not found."));
    }

    public Treatment createTreatment(Crop crop,
                                     String treatmentName,
                                     LocalDate treatmentDate,
                                     BigDecimal quantity,
                                     String details) {
        Treatment treatment = new Treatment(crop, treatmentName, treatmentDate, quantity, details);
        return treatmentRepository.saveAndFlush(treatment);
    }

    public List<Treatment> getTreatmentsByCropId(Long cropId) {
        return treatmentRepository.findAllByCropId(cropId);
    }

    public Long getUserIdByTreatmentId(Long treatmentId) {
        return treatmentRepository.findUserIdByTreatmentId(treatmentId);
    }

    public Treatment updateTreatment(Long treatmentId,
                                     String treatmentName,
                                     LocalDate treatmentDate,
                                     BigDecimal quantity,
                                     String details) {
        Treatment treatment = getTreatmentById(treatmentId);
        treatment.setTreatmentName(treatmentName);
        treatment.setTreatmentDate(treatmentDate);
        treatment.setQuantity(quantity);
        treatment.setDetails(details);
        return treatmentRepository.saveAndFlush(treatment);
    }

    public void deleteTreatmentById(Long treatmentId) {
        Treatment treatment = getTreatmentById(treatmentId);
        treatmentRepository.delete(treatment);
    }

}
