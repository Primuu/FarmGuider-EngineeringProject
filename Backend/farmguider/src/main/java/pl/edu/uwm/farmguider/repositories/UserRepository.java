package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findUserByEmail(String email);

}
