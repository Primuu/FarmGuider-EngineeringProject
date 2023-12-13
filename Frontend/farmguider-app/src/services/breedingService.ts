import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_BREEDING_URL, DELETE_BREEDING_URL, GET_BREEDINGS_URL, UPDATE_BREEDING_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import BreedingCreateDTO from "@/entities/BreedingCreateDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";

export const getBreedings = async (farmId: number): Promise<BreedingResponseDTO[]> => {
    return await sendHttpRequest<BreedingResponseDTO[]>({
        endpointUrl: GET_BREEDINGS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    });
}

export const createBreeding = async (farmId: number, breedingCreateDTO: BreedingCreateDTO): Promise<BreedingResponseDTO> => {
    return await sendHttpRequest<BreedingResponseDTO>({
        endpointUrl: CREATE_BREEDING_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {farmId},
        body: breedingCreateDTO
    })
}

export const updateBreeding = async (breedingId: number, breedingCreateDTO: BreedingCreateDTO): Promise<BreedingResponseDTO> => {
    return await sendHttpRequest<BreedingResponseDTO>({
        endpointUrl: UPDATE_BREEDING_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {breedingId},
        body: breedingCreateDTO
    })
}

export const deleteBreeding = async (breedingId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_BREEDING_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {breedingId}
    })
}
