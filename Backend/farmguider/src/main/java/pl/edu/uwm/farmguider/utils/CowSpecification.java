package pl.edu.uwm.farmguider.utils;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

public class CowSpecification {

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

}