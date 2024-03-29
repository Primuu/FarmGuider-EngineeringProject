package pl.edu.uwm.farmguider.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.edu.uwm.farmguider.exceptions.global.InvalidEnumException;
import pl.edu.uwm.farmguider.exceptions.global.EntityAlreadyExistsException;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;
import pl.edu.uwm.farmguider.exceptions.lactationPeriod.LactationPeriodConflictException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ErrorResponse("ValidationError", errors);
    }

    @ExceptionHandler(value = EntityAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse entityAlreadyExistsException(EntityAlreadyExistsException exception) {
        Map<String, String> errors = Map.of(exception.getEntityName(), exception.getMessage());
        return new ErrorResponse("EntityAlreadyExists", errors);
    }

    @ExceptionHandler(value = EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse entityNotFoundException(EntityNotFoundException exception) {
        Map<String, String> errors = Map.of(exception.getEntityName(), exception.getMessage());
        return new ErrorResponse("EntityNotFoundException", errors);
    }

    @ExceptionHandler(value = UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse unauthorizedException(UnauthorizedException exception) {
        Map<String, String> errors = Map.of(exception.getEntityName(), exception.getMessage());
        return new ErrorResponse("UnauthorizedException", errors);
    }

    @ExceptionHandler(value = InvalidEnumException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse invalidGenderException(InvalidEnumException exception) {
        Map<String, String> errors = Map.of(exception.getEnumName(), exception.getMessage());
        return new ErrorResponse("InvalidGenderException", errors);
    }

    @ExceptionHandler(value = LactationPeriodConflictException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse lactationPeriodConflictException(LactationPeriodConflictException exception) {
        Map<String, String> errors = Map.of(exception.getEntityName(), exception.getMessage());
        return new ErrorResponse("LactationPeriodConflictException", errors);
    }

    @ExceptionHandler(value = InvalidDateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse InvalidDateException(InvalidDateException exception) {
        Map<String, String> errors = Map.of(exception.getEntityName(), exception.getMessage());
        return new ErrorResponse("InvalidDateException", errors);
    }

}
