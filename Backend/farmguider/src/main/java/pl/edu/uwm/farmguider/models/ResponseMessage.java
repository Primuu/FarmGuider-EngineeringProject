package pl.edu.uwm.farmguider.models;

import lombok.Builder;

public record ResponseMessage(String message) {

    @Builder
    public ResponseMessage {}

}
