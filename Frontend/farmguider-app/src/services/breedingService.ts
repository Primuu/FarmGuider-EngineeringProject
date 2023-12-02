import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_BREEDING_URL, GET_BREEDINGS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import BreedingCreateDTO from "@/entities/BreedingCreateDTO.ts";

export const fetchBreedings = async (farmId: number): Promise<BreedingResponseDTO[]> => {
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
