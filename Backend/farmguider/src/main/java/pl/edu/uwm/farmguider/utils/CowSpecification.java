package pl.edu.uwm.farmguider.utils;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.dtos.CowSearchParams;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CowSpecification {

    public static Specification<Cow> bySearchParams(Long breedingId, CowSearchParams params) {
        Specification<Cow> spec = Specification.where(hasBreedingId(breedingId));

        if (params.getEarTagNumber() != null) {
            spec = spec.and(hasEarTagNumberLike(params.getEarTagNumber()));
        }
        if (params.getCowName() != null) {
            spec = spec.and(hasCowNameLike(params.getCowName()));
        }
        if (params.getGender() != null) {
            spec = spec.and(hasGender(params.getGender()));
        }
        if (params.getMinDateOfBirth() != null || params.getMaxDateOfBirth() != null) {
            spec = spec.and(hasDateOfBirthBetween(params.getMinDateOfBirth(), params.getMaxDateOfBirth()));
        }
        if (params.getMinWeight() != null || params.getMaxWeight() != null) {
            spec = spec.and(hasWeightBetween(params.getMinWeight(), params.getMaxWeight()));
        }
        if (params.getMinMilkingQuantity() != null || params.getMaxMilkingQuantity() != null) {
            spec = spec.and(hasMilkingQuantityBetween(params.getMinMilkingQuantity(), params.getMaxMilkingQuantity()));
        }

        return spec;
    }

    public static Specification<Cow> hasBreedingId(Long breedingId) {
        return (root, query, criteriaBuilder) ->
                breedingId == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("breeding").get("id"), breedingId);
    }

    public static Specification<Cow> hasEarTagNumberLike(String earTagNumber) {
        return (root, query, criteriaBuilder) ->
                earTagNumber == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.like(root.get("earTagNumber"), earTagNumber + "%");
    }

    public static Specification<Cow> hasCowNameLike(String cowName) {
        return (root, query, criteriaBuilder) ->
                cowName == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("cowName")), cowName.toLowerCase() + "%");
    }

    public static Specification<Cow> hasGender(String gender) {
        return (root, query, criteriaBuilder) ->
                gender == null ?
                        criteriaBuilder.conjunction() :
                        criteriaBuilder.equal(root.get("gender"), Gender.valueOf(gender));
    }

    public static Specification<Cow> hasDateOfBirthBetween(LocalDate minDateOfBirth, LocalDate maxDateOfBirth) {
        return (root, query, criteriaBuilder) -> {
            if (minDateOfBirth == null && maxDateOfBirth == null) {
                return criteriaBuilder.conjunction();
            } else if (minDateOfBirth == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("dateOfBirth"), maxDateOfBirth);
            } else if (maxDateOfBirth == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("dateOfBirth"), minDateOfBirth);
            } else {
                return criteriaBuilder.between(root.get("dateOfBirth"), minDateOfBirth, maxDateOfBirth);
            }
        };
    }

    public static Specification<Cow> hasWeightBetween(BigDecimal minWeight, BigDecimal maxWeight) {
        return (root, query, criteriaBuilder) -> {
            if (minWeight == null && maxWeight == null) {
                return criteriaBuilder.conjunction();
            } else if (minWeight == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("currentWeight"), maxWeight);
            } else if (maxWeight == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("currentWeight"), minWeight);
            } else {
                return criteriaBuilder.between(root.get("currentWeight"), minWeight, maxWeight);
            }
        };
    }

    public static Specification<Cow> hasMilkingQuantityBetween(BigDecimal minMilkingQuantity, BigDecimal maxMilkingQuantity) {
        return (root, query, criteriaBuilder) -> {
            if (minMilkingQuantity == null && maxMilkingQuantity == null) {
                return criteriaBuilder.conjunction();
            } else if (minMilkingQuantity == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("latestMilkingQuantity"), maxMilkingQuantity);
            } else if (maxMilkingQuantity == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("latestMilkingQuantity"), minMilkingQuantity);
            } else {
                return criteriaBuilder.between(root.get("latestMilkingQuantity"), minMilkingQuantity, maxMilkingQuantity);
            }
        };
    }

}