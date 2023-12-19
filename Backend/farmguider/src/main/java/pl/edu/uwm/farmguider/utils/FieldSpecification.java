package pl.edu.uwm.farmguider.utils;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.models.field.dtos.FieldSearchParams;
import pl.edu.uwm.farmguider.models.field.enums.SoilClass;

import java.math.BigDecimal;

public class FieldSpecification {

    public static Specification<Field> bySearchParams(Long farmId, FieldSearchParams params) {
        Specification<Field> spec = Specification.where(hasFarmId(farmId));

        if (params.fieldName() != null) {
            spec = spec.and(hasFieldNameLike(params.fieldName()));
        }
        if (params.fieldAreaFrom() != null || params.fieldAreaTo() != null) {
            spec = spec.and(hasFieldAreaBetween(params.fieldAreaFrom(), params.fieldAreaTo()));
        }
        if (params.soilClass() != null) {
            spec = spec.and(hasSoilClass(params.soilClass()));
        }

        return spec;
    }

    public static Specification<Field> hasFarmId(Long farmId) {
        return (root, query, criteriaBuilder) ->
                farmId == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("farm").get("id"), farmId);
    }

    public static Specification<Field> hasFieldNameLike(String fieldName) {
        return (root, query, criteriaBuilder) ->
                fieldName == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("fieldName")), fieldName.toLowerCase() + "%");
    }

    public static Specification<Field> hasFieldAreaBetween(BigDecimal fieldAreaFrom, BigDecimal fieldAreaTo) {
        return (root, query, criteriaBuilder) -> {
            if (fieldAreaFrom == null && fieldAreaTo == null) {
                return criteriaBuilder.conjunction();
            } else if (fieldAreaFrom == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("fieldArea"), fieldAreaTo);
            } else if (fieldAreaTo == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("fieldArea"), fieldAreaFrom);
            } else {
                return criteriaBuilder.between(root.get("fieldArea"), fieldAreaFrom, fieldAreaTo);
            }
        };
    }

    public static Specification<Field> hasSoilClass(String soilClass) {
        return (root, query, criteriaBuilder) ->
                soilClass == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("soilClass"), SoilClass.valueOf(soilClass));
    }

}