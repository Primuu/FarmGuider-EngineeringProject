package pl.edu.uwm.farmguider.exceptions;

public record ErrorMessage(String fieldName, String error) {

    @Override
    public String toString() {
        return error;
    }

}

