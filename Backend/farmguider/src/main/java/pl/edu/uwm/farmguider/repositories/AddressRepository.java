package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.address.Address;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("""
            SELECT a
            FROM Address a
            INNER JOIN User u
            ON a.id = u.address.id
            WHERE u.id = :userId
            """)
    Optional<Address> findAddressByUserId(@Param("userId") Long userId);

}
