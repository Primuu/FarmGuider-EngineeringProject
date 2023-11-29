package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.repositories.AddressRepository;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address getAddressByUserId(Long userId) {
        return addressRepository.findAddressByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Address", "Address for user with id: " + userId + " not found."));
    }

    public Address createEmptyAddress() {
        return addressRepository.saveAndFlush(new Address());
    }

    public Address updateAddressByUserId(Long userId, String locality, String street, String zipCode, String propertyNumber) {
        Address address = getAddressByUserId(userId);
        address.setLocality(locality);
        address.setStreet(street);
        address.setZipCode(zipCode);
        address.setPropertyNumber(propertyNumber);
        return addressRepository.saveAndFlush(address);
    }

}
