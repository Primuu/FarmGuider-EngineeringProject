package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
