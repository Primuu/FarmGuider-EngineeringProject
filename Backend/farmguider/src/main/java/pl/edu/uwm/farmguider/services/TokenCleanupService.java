package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.blacklistedToken.BlacklistedToken;
import pl.edu.uwm.farmguider.repositories.BlacklistedTokenRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import static pl.edu.uwm.farmguider.security.utils.JWTUtils.ONE_HOUR;

@Service
@RequiredArgsConstructor
public class TokenCleanupService {

    private static final int HALF_HOUR = 1800000;
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    @Scheduled(fixedRate = HALF_HOUR)
    public void removeExpiredTokens() {
        Duration tokenLifeTime = Duration.ofMillis(ONE_HOUR);
        LocalDateTime tokenLifeTimeAgo = LocalDateTime.now().minus(tokenLifeTime);
        List<BlacklistedToken> tokens = blacklistedTokenRepository.findAllByRevokeDateBefore(tokenLifeTimeAgo);
        blacklistedTokenRepository.deleteAll(tokens);
    }

}
