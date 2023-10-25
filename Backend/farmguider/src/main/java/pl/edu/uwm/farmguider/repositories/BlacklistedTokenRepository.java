package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.uwm.farmguider.models.blacklistedToken.BlacklistedToken;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long> {

    Optional<BlacklistedToken> findByToken(String token);

    List<BlacklistedToken> findAllByRevokeDateBefore(LocalDateTime date);

}
