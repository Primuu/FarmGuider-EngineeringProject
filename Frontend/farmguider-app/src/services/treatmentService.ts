import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_TREATMENT_URL, DELETE_TREATMENT_URL, GET_TREATMENTS_URL, UPDATE_TREATMENT_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import {TreatmentCreateDTO} from "@/entities/TreatmentCreateDTO.ts";
import {TreatmentResponseDTO} from "@/entities/TreatmentResponseDTO.ts";

export const createTreatment = async (cropId: number, treatmentCreateDTO: TreatmentCreateDTO): Promise<TreatmentResponseDTO> => {
    return await sendHttpRequest<TreatmentResponseDTO>({
        endpointUrl: CREATE_TREATMENT_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cropId},
        body: treatmentCreateDTO
    })
}

export const getTreatments = async (cropId: number): Promise<TreatmentResponseDTO[]> => {
    return await sendHttpRequest<TreatmentResponseDTO[]>({
        endpointUrl: GET_TREATMENTS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {cropId}
    })
}

export const updateTreatment = async (treatmentId: number, treatmentCreateDTO: TreatmentCreateDTO): Promise<TreatmentResponseDTO> => {
    return await sendHttpRequest<TreatmentResponseDTO>({
        endpointUrl: UPDATE_TREATMENT_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {treatmentId},
        body: treatmentCreateDTO
    })
}

export const deleteTreatment = async (treatmentId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_TREATMENT_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {treatmentId}
    });
}
