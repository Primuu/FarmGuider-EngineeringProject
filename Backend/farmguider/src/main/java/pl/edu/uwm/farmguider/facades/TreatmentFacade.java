package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.crop.Crop;
import pl.edu.uwm.farmguider.models.treatment.Treatment;
import pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentCreateDTO;
import pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentMapper;
import pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentResponseDTO;
import pl.edu.uwm.farmguider.services.CropService;
import pl.edu.uwm.farmguider.services.TreatmentService;

import java.util.Comparator;
import java.util.List;

import static pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentMapper.mapToTreatmentResponseDTO;

@Component
@RequiredArgsConstructor
public class TreatmentFacade {

    private final CropService cropService;
    private final TreatmentService treatmentService;

    public TreatmentResponseDTO createTreatment(Long cropId, TreatmentCreateDTO treatmentCreateDTO) {
        Crop crop = cropService.getCropById(cropId);
        Treatment treatment = treatmentService.createTreatment(
                crop,
                treatmentCreateDTO.treatmentName(),
                treatmentCreateDTO.treatmentDate(),
                treatmentCreateDTO.quantity(),
                treatmentCreateDTO.details()
        );
        return mapToTreatmentResponseDTO(treatment);
    }

    public List<TreatmentResponseDTO> getTreatmentsByCropId(Long cropId) {
        List<Treatment> treatments = treatmentService.getTreatmentsByCropId(cropId);
        return treatments
                .stream()
                .map(TreatmentMapper::mapToTreatmentResponseDTO)
                .sorted(Comparator.comparing(TreatmentResponseDTO::treatmentDate).reversed())
                .toList();
    }

    public TreatmentResponseDTO updateTreatmentById(Long treatmentId, TreatmentCreateDTO treatmentCreateDTO) {
        Treatment treatment = treatmentService.updateTreatment(
                treatmentId,
                treatmentCreateDTO.treatmentName(),
                treatmentCreateDTO.treatmentDate(),
                treatmentCreateDTO.quantity(),
                treatmentCreateDTO.details()
        );
        return mapToTreatmentResponseDTO(treatment);
    }

    public void deleteTreatmentById(Long treatmentId) {
        treatmentService.deleteTreatmentById(treatmentId);
    }

}
