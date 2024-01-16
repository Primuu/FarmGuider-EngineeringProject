package pl.edu.uwm.farmguider.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.exceptions.lactationPeriod.LactationPeriodConflictException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.repositories.LactationPeriodRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class LactationPeriodServiceTest {

    private static final boolean EXCEPTION_IS_EXPECTED = true;
    private static final boolean EXCEPTION_IS_NOT_EXPECTED = false;
    private static Cow testCow;
    private final static Long cowId = 1L;
    @Mock
    private LactationPeriodRepository lactationPeriodRepository;
    @InjectMocks
    private LactationPeriodService lactationPeriodService;
    private LocalDate startDate;
    private LocalDate endDate;
    private LactationPeriod testLactationPeriod;

    private static Stream<Arguments> provideLactationPeriods() {
        LactationPeriod periodWithBothDates =
                new LactationPeriod(testCow, LocalDate.of(2022, 2, 1), LocalDate.of(2022, 3, 1)
        );
        periodWithBothDates.setId(2L);

        LactationPeriod periodWithoutEndDate =
                new LactationPeriod(testCow, LocalDate.of(2023, 2, 1), null
                );
        periodWithoutEndDate.setId(3L);

        List<LactationPeriod> periodsWithBothDates = List.of(periodWithBothDates);
        List<LactationPeriod> periodsWithoutEndDate = List.of(periodWithoutEndDate);

        return Stream.of(
                // 1. startDate is before another lactation, endDate is on the first day of that other lactation
                Arguments.of(LocalDate.of(2022, 1, 1), LocalDate.of(2022, 2, 1),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 2. startDate is before another lactation, endDate is in that other lactation
                Arguments.of(LocalDate.of(2022, 1, 1), LocalDate.of(2022, 2, 15),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 3. startDate is before another lactation, endDate is on the last day of that other lactation
                Arguments.of(LocalDate.of(2022, 1, 1), LocalDate.of(2022, 3, 1),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 4. startDate is before another lactation, endDate is further than the last day of this other lactation
                Arguments.of(LocalDate.of(2022, 1, 1), LocalDate.of(2022, 3, 2),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 5. startDate is on the first day of another lactation, endDate is in that other lactation
                Arguments.of(LocalDate.of(2022, 2, 1), LocalDate.of(2022, 2, 15),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 6. startDate is on the first day of another lactation, endDate is on the last day of that other lactation
                Arguments.of(LocalDate.of(2022, 2, 1), LocalDate.of(2022, 3, 1),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 7. startDate is on the first day of another lactation, endDate is further than the last day of this other lactation
                Arguments.of(LocalDate.of(2022, 2, 1), LocalDate.of(2022, 3, 2),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 8. startDate and endDate are in that another lactation
                Arguments.of(LocalDate.of(2022, 2, 10), LocalDate.of(2022, 2, 20),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 9. startDate is in the another lactation, endDate is on the last day of that other lactation
                Arguments.of(LocalDate.of(2022, 2, 10), LocalDate.of(2022, 3, 1),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 11. startDate is in the another lactation, endDate is further than the last day of this other lactation
                Arguments.of(LocalDate.of(2022, 2, 10), LocalDate.of(2022, 3, 10),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 12. startDate is on the last day of the another lactation, endDate is further than the last day of this other lactation
                Arguments.of(LocalDate.of(2022, 3, 1), LocalDate.of(2022, 3, 10),
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 13. startDate and endDate doesn't overlap with other lactation
                Arguments.of(LocalDate.of(2022, 3, 2), LocalDate.of(2022, 3, 10),
                        periodsWithBothDates,
                        EXCEPTION_IS_NOT_EXPECTED),

                // 14. startDate is before another lactation, endDate is null
                Arguments.of(LocalDate.of(2022, 1, 1), null,
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 15. startDate is on the first day of another lactation, endDate is null
                Arguments.of(LocalDate.of(2022, 2, 1), null,
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 16. startDate is in the another lactation, endDate is null
                Arguments.of(LocalDate.of(2022, 2, 10), null,
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 17. startDate is on the last day of the another lactation, endDate is null
                Arguments.of(LocalDate.of(2022, 3, 1), null,
                        periodsWithBothDates,
                        EXCEPTION_IS_EXPECTED),

                // 18. startDate doesn't overlap with other lactation, endDate is null
                Arguments.of(LocalDate.of(2022, 3, 2), null,
                        periodsWithBothDates,
                        EXCEPTION_IS_NOT_EXPECTED),

                // 19. startDate is before another lactation(without endDate), endDate is null
                Arguments.of(LocalDate.of(2023, 1, 1), null,
                        periodsWithoutEndDate,
                        EXCEPTION_IS_EXPECTED),

                // 20. startDate is in the another lactation(without endDate), endDate is null
                Arguments.of(LocalDate.of(2023, 2, 10), null,
                        periodsWithoutEndDate,
                        EXCEPTION_IS_EXPECTED),

                // 21. startDate is before another lactation(without endDate), endDate is in that other lactation
                Arguments.of(LocalDate.of(2023, 1, 1), LocalDate.of(2023, 3, 1),
                        periodsWithoutEndDate,
                        EXCEPTION_IS_EXPECTED),

                // 21. startDate and endDate are in that other lactation
                Arguments.of(LocalDate.of(2023, 3, 1), LocalDate.of(2023, 3, 11),
                        periodsWithoutEndDate,
                        EXCEPTION_IS_EXPECTED),

                // 22. startDate and endDate doesn't overlap with other lactation(without endDate)
                Arguments.of(LocalDate.of(2023, 1, 1), LocalDate.of(2023, 1, 11),
                        periodsWithoutEndDate,
                        EXCEPTION_IS_NOT_EXPECTED)
        );
    }

    @BeforeEach
    void setUp() {
        testCow = new Cow();
        testCow.setId(cowId);

        startDate = LocalDate.now();
        endDate = startDate.plusDays(1);
        testLactationPeriod = new LactationPeriod();
    }

    @Test
    void shouldNotThrowExceptionWhenCreateLactationPeriodWithValidDates() {
        when(lactationPeriodRepository.saveAndFlush(any(LactationPeriod.class))).thenReturn(testLactationPeriod);
        assertDoesNotThrow(() -> lactationPeriodService.createLactationPeriod(testCow, startDate, endDate));
    }

    @Test
    void shouldThrowExceptionWhenCreateLactationPeriodWithEndDateBeforeStartDate() {
        when(lactationPeriodRepository.saveAndFlush(any(LactationPeriod.class))).thenReturn(testLactationPeriod);
        assertThrows(InvalidDateException.class, () -> lactationPeriodService.createLactationPeriod(testCow, endDate, startDate));
    }

    @Test
    void shouldThrowExceptionWhenCreateLactationPeriodWithSameStartAndEndDate() {
        when(lactationPeriodRepository.saveAndFlush(any(LactationPeriod.class))).thenReturn(testLactationPeriod);
        assertThrows(InvalidDateException.class, () -> lactationPeriodService.createLactationPeriod(testCow, startDate, startDate));
    }

    @ParameterizedTest
    @MethodSource("provideLactationPeriods")
    void shouldValidateLactationPeriodOverlaps(LocalDate newStart, LocalDate newEnd, List<LactationPeriod> existingPeriods, boolean expectedException) {
        when(lactationPeriodRepository.findAllByCowId(cowId)).thenReturn(existingPeriods);

        if (expectedException) {
            assertThrows(LactationPeriodConflictException.class,
                    () -> lactationPeriodService.createLactationPeriod(testCow, newStart, newEnd));
        } else {
            assertDoesNotThrow(() ->
                    lactationPeriodService.createLactationPeriod(testCow, newStart, newEnd));
        }
    }

}
