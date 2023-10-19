package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.repositories.AddressRepository;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address createEmptyAddress() {
        return addressRepository.saveAndFlush(new Address());
    }

}
