package pl.edu.uwm.farmguider.models.cow.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class CowSearchParams {

    @Min(value = 0)
    private int page = 0;

    @Min(value = 1)
    @Max(value = 100)
    private int size = 25;

    public Pageable toPageable() {
        return PageRequest.of(page, size);
    }

}
