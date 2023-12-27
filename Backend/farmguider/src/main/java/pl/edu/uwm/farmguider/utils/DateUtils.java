package pl.edu.uwm.farmguider.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtils {

    public static LocalDate convertMonthDayToDate(String monthDay) throws DateTimeParseException {
        String currentYear = String.valueOf(LocalDate.now().getYear());
        String dateString = currentYear + "-" + monthDay;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(dateString, formatter);
    }

}
