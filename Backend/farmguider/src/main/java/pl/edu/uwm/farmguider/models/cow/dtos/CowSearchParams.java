package pl.edu.uwm.farmguider.models.cow.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CowSearchParams {

    @Min(value = 0)
    private int page = 0;

    @Min(value = 1)
    @Max(value = 100)
    private int size = 25;

    private String sortBy = "earTagNumber";
    private boolean sortDesc = false;

    private String earTagNumber;
    private String gender;
    private String cowName;

    private LocalDate minDateOfBirth;
    private LocalDate maxDateOfBirth;

    private BigDecimal minWeight;
    private BigDecimal maxWeight;

    private BigDecimal minMilkingQuantity;
    private BigDecimal maxMilkingQuantity;

    public Pageable toPageable() {
        Sort sort = Sort.by(sortDesc ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy);
        return PageRequest.of(page, size, sort);
    }

}
