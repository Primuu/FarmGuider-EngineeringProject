package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("""
            SELECT u.idToken
            FROM User u
            WHERE u.email = :email
            """)
    String findIdTokenByEmail(@Param("email") String email);

    @Query("""
            SELECT u.refreshToken
            FROM User u
            WHERE u.email = :email
            """)
    String findRefreshTokenByEmail(@Param("email") String email);

}
