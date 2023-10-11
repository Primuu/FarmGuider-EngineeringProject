package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.address.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
