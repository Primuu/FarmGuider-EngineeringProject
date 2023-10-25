package pl.edu.uwm.farmguider.models.blacklistedToken;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "blacklisted_tokens")
@EntityListeners(AuditingEntityListener.class)
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlacklistedToken extends BasicEntity {

    @NonNull
    String token;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime revokeDate;

}
