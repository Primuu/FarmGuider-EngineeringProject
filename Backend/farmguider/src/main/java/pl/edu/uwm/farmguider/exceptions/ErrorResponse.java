package pl.edu.uwm.farmguider.exceptions;

import java.util.Map;

public record ErrorResponse(String type, Map<String, String> errors) {

    @Override
    public String toString() {
        return "Type: " + type + ", Errors: " + errors.toString();
    }

}
